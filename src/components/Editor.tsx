import { useState, useRef, ChangeEvent, useCallback } from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import Router from 'next/router';
import Error from 'next/error';

import { useUser } from '@auth0/nextjs-auth0';

import { nanoid } from 'nanoid';
import _ from 'lodash';

import Editor from '@monaco-editor/react';
import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import { getSubId } from '@utils/funcs';

import * as languages from '@lib/languages';

type EditorProps = { title: string; update?: boolean; refid?: string; data?: Paste };

export default function MainEditor({ title, update, refid, data }: EditorProps) {
  // user
  const { user } = useUser();

  const codeEditor = useRef(null);

  const codeFilename = useRef<HTMLInputElement>(null);
  const codePrivate = useRef<HTMLInputElement>(null);
  const codeDescription = useRef<HTMLInputElement>(null);
  const [codeLanguage, setCodeLanguage] = useState<string>(update ? data.codeLanguage : 'text'); // text is initial language
  const [isCode, setIsCode] = useState<boolean>(update ? data.isCode : false);

  const handleEditorBeforeMount = useCallback((monaco) => {
    // definee custom theme
    monaco.editor.defineTheme('lcl-theme', {
      base: 'vs',
      inherit: true,
      rules: [{ foreground: '#52525b' }],
      colors: {
        'editor.foreground': '#52525b',
        'editorLineNumber.foreground': '#d4d4d8',
        'editor.lineHighlightBackground': '#00000000',
        'editor.lineHighlightBorder': '#00000000'
      }
    });
  }, []);

  const handleCreatePaste = () => {
    let pasteData: Paste | UpdatePaste = {};

    let pasteId: string;

    const content: string = codeEditor.current.getValue();
    const filename: string = codeFilename.current.value;
    const description: string = codeDescription.current.value;
    const isPrivate: boolean = codePrivate.current.checked;

    if (update) {
      pasteData.updated = true;
      pasteData.updatedDate = new Date().toISOString();

      // update only specific fields (if changed)
      if (isCode != data.isCode) {
        pasteData.isCode = isCode;
      }
      if (codeLanguage != data.codeLanguage) {
        pasteData.codeLanguage = codeLanguage;
      }
      if (content != data.content) {
        pasteData.content = content;
      }
      if (filename != data.filename) {
        pasteData.filename = filename;
      }
      if (description != data.description) {
        pasteData.description = description;
      }
      if (isPrivate != data.isPrivate) {
        pasteData.isPrivate = isPrivate;
      }
      // end update only specific fields
    } else {
      // generate id
      pasteId = nanoid(60);

      // get all fields
      pasteData = {
        createdDate: new Date().toISOString(),
        content: content,
        filename: filename,
        description: description,
        isPrivate: isPrivate,
        isCode: isCode,
        codeLanguage: codeLanguage,
        pasteId: pasteId,
        isOwnedByUser: user ? true : false,
        ownedByUsername: user ? user.name : '',
        willExpire: false,
        expiryDate: null
      };
    }

    // contact api
    fetch(`${update ? `/api/pastes/update/${refid}` : '/api/pastes/create'}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pasteData)
    })
      .then((res) => res.json())
      .then(() => {
        Router.push(`/p/${update ? data.pasteId : pasteId}`);
      })
      .catch(() => {
        console.error('problem');
      });
  };

  const handleGetFileExt = (e: ChangeEvent<HTMLInputElement>) => {
    const filename = e.target.value;
    const file_split = filename.split('.', -1);

    const lang = languages[file_split[file_split.length - 1]];
    if (lang) {
      // set file language
      setCodeLanguage(lang.name);
      // determine if code
      lang.type == 'programming' ? setIsCode(true) : null;
    }
  };

  return (
    <Layout title={title}>
      <Navigation />

      <hr />

      <div className="w-5/6 mx-auto my-8">
        {/* paste options */}
        <div className="mb-3">
          <div className="flex items-center justify-between py-2">
            <div className="inline-flex flex-col">
              <label htmlFor="code-filename" className="text-sm text-secondary-600 lowercase">
                Filename
              </label>
              <input
                ref={codeFilename}
                onChange={_.debounce(handleGetFileExt, 500)}
                type="text"
                placeholder="filename.txt"
                defaultValue={data?.filename}
                className="border border-secondary-300 rounded-md focus:outline-none focus:border-primary-400 py-2 px-3 tracking-wide w-full"
              />
            </div>

            <div>
              <input type="checkbox" className="h-4 w-4" ref={codePrivate} defaultChecked={data?.isPrivate} />
              <span className="ml-2 text-secondary-600 lowercase" title="Your paste will not be shown in latest.">
                Make Private
              </span>
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="code-desc" className="text-sm text-secondary-600 lowercase">
              Short Description
            </label>
            <input
              type="text"
              ref={codeDescription}
              className="py-2 px-4 border tracking-wide rounded-md border-secondary-300 focus:outline-none focus:border-primary-400"
              placeholder="Enter some short description for your paste..."
              defaultValue={data?.description}
            />
          </div>
        </div>

        <div>
          <label htmlFor="code-content" className="text-sm text-secondary-600 lowercase">
            Paste
          </label>
          <Editor
            height="70vh"
            // defaultLanguage="text"
            language={data ? data.codeLanguage : codeLanguage}
            defaultValue={data ? data.content : '// enter something in here'}
            beforeMount={handleEditorBeforeMount}
            onMount={(editor, monaco) => {
              // pass ref
              codeEditor.current = editor;
            }}
            wrapperClassName="border border-secondary-200 py-3 rounded-md"
            options={{
              minimap: {
                enabled: false
              }
            }}
            theme="lcl-theme"
          />
        </div>

        <div className="flex items-center justify-end py-2">
          <button
            onClick={handleCreatePaste}
            className="py-2 px-8 rounded-full bg-primary-500 opacity-80 hover:opacity-100 text-white"
          >
            {update ? 'Update' : 'Create'} Paste
          </button>
        </div>
      </div>
    </Layout>
  );
}
