import { useState, useRef } from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';
import Router from 'next/router';

import { useUser } from '@auth0/nextjs-auth0';

import { nanoid } from 'nanoid';

import Editor from '@monaco-editor/react';
import { Paste } from '@utils/interfaces/paste';
import { stringify } from 'postcss';

export default function Home() {
  // user
  const { user, error: userError, isLoading } = useUser();

  const codeEditor = useRef(null);

  const codeFilename = useRef<HTMLInputElement>(null);
  const codePrivate = useRef<HTMLInputElement>(null);
  const codeDescription = useRef<HTMLInputElement>(null);

  const handleEditorBeforeMount = (monaco) => {
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
  };

  const handleCreatePaste = () => {
    const pasteData: Paste = {
      content: codeEditor.current.getValue(),
      filename: codeFilename.current.value,
      description: codeDescription.current.value,
      isPrivate: codePrivate.current.checked,
      isCode: false,
      codeLanguage: null,
      pasteId: nanoid(60),
      isOwnedByUser: user ? true : false,
      user: user ? user.email : null,
      willExpire: false,
      expiryDate: null,
      createdDate: new Date().toUTCString()
    };

    // contact api
    fetch('/api/pastes/create', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pasteData)
    })
      .then((res) => res.json())
      .then(() => {
        Router.push(`/p/${pasteData.pasteId}`);
      })
      .catch(() => {
        console.error('problem');
      });
  };

  return (
    <Layout title="Welcome">
      <Navigation user={user} />

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
                type="text"
                placeholder="filename.txt"
                className="border border-secondary-300 rounded-md focus:outline-none focus:border-primary-400 py-2 px-3 tracking-wide w-full"
              />
            </div>

            <div>
              <input type="checkbox" className="h-4 w-4" ref={codePrivate} />
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
            />
          </div>
        </div>

        <div>
          <label htmlFor="code-content" className="text-sm text-secondary-600 lowercase">
            Paste
          </label>
          <Editor
            height="70vh"
            defaultLanguage="text"
            defaultValue="// enter something in here"
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
            Create Paste
          </button>
        </div>
      </div>
    </Layout>
  );
}
