import { useState, useRef, ChangeEvent, useCallback } from 'react';
import Router from 'next/router';

import { toast, ToastContainer } from 'react-toastify';
import { mutate } from 'swr';
import _ from 'lodash';

import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import { getCodeLanguage } from '@lib/code';

import { ApiCreatePasteResponse } from 'pages/api/pastes/create';
import { ApiUpdatePasteResponse } from 'pages/api/pastes/update/[refid]';

import 'react-toastify/dist/ReactToastify.css';
import { MonacoEditor } from './editor/monaco';

type EditorProps = { update?: boolean; refid?: string; data?: Paste };

const MainEditor = ({ update, refid, data }: EditorProps) => {
  const btnCreateUpdateRef = useRef<HTMLButtonElement>(null);

  const codeEditor = useRef(null);

  const codeFilename = useRef<HTMLInputElement>(null);
  const codePrivate = useRef<HTMLInputElement>(null);
  const codeDescription = useRef<HTMLInputElement>(null);
  const codeExpiration = useRef<HTMLInputElement>();
  const [codeLanguage, setCodeLanguage] = useState<string>(update ? data.codeLanguage : 'text'); // text is initial language
  // const [isCode, setIsCode] = useState<boolean>(update ? data.isCode : false);

  const resetButtonRef = () => {
    btnCreateUpdateRef.current.innerText = `${update ? 'Update' : 'Create'} Paste`;
    btnCreateUpdateRef.current.disabled = false;
  };

  const handleCreatePaste = () => {
    let pasteData: Paste | UpdatePaste = {};
    const content: string = codeEditor.current.getValue();
    const filename: string = codeFilename.current.value;
    const description: string = codeDescription.current.value;
    const isPrivate: boolean = codePrivate.current.checked;
    const expiryDate: string = codeExpiration.current.value
      ? new Date(codeExpiration.current.value).toISOString()
      : null;

    if (update) {
      if (filename != data.filename) {
        pasteData.filename = filename;
      }
      if (content != data.content) {
        pasteData.content = content;
      }
      if (description != data.description) {
        pasteData.description = description;
      }
      if (isPrivate != data.isPrivate) {
        pasteData.isPrivate = isPrivate;
      }
      if (expiryDate != data.expiryDate) {
        pasteData.expiryDate = expiryDate;
      }
      // end update only specific fields
    } else {
      // get all fields
      pasteData = {
        content: content,
        filename: filename,
        description: description,
        isPrivate: isPrivate,
        expiryDate: expiryDate
      };
    }

    // notify
    onCreateNotify(update ? 'Updating paste...' : 'Creating paste...');

    // contact api
    fetch(`${update ? `/api/pastes/update/${refid}` : '/api/pastes/create'}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pasteData)
    })
      .then((res) => res.json())
      .then((r: ApiCreatePasteResponse | ApiUpdatePasteResponse) => {
        if (r.error) {
          onErrorNotify(r.description);
          // reset buttons
          resetButtonRef();
        } else {
          const pid = update ? data.pasteId : r.data.pasteId;
          if (update && !r.description) {
            mutate(`/api/pastes/get/ref/${refid}`);
            mutate(`/api/pastes/get/${pid}`);
          }
          mutate('/api/pastes/latest');
          Router.push(`/p/${pid}`);
        }
      })
      .catch((e) => {
        resetButtonRef();
        onErrorNotify(); // show notif
        console.error(e);
      });
  };

  const convertDateForInput = (date: string) => {
    if (date) {
      const d = new Date(date);
      const dd = date.split('T')[0];
      return `${dd}T${d.getHours()}:${d.getMinutes()}`;
    }
  };

  const handleGetFileExt = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filename = e.target.value;
    setCodeLanguage(getCodeLanguage(filename));
  }, []);

  // react toastify
  const onErrorNotify = (message = 'There was a problem...') => toast.error(message); // custom message
  const onCreateNotify = (message: string) => toast.info(message);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />

      <div className="w-11/12 xl:w-5/6 mx-auto p-8 shadow-lg my-8 border rounded-lg border-primary-300">
        {/* paste options */}
        <div className="mb-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2">
            <div className="inline-flex flex-col">
              <label htmlFor="code-filename" className="text-sm text-secondary-600 lowercase">
                Filename
              </label>
              <input
                id="paste-filename"
                ref={codeFilename}
                onChange={_.debounce(handleGetFileExt, 500)}
                type="text"
                placeholder="filename.txt"
                defaultValue={data?.filename}
                className="border border-secondary-300 rounded-md focus:outline-none focus:border-primary-400 py-2 px-3 tracking-wide w-full"
              />
            </div>

            <div className="my-2 md:my-0 inline-flex items-start">
              <input
                id="paste-privacy"
                type="checkbox"
                className="h-4 w-4"
                ref={codePrivate}
                defaultChecked={data?.isPrivate}
              />
              <span
                className="ml-2 text-secondary-600 lowercase text-sm"
                title="Your paste will not be shown in latest."
              >
                Make Private
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2">
            <div className="flex flex-col w-full">
              <label htmlFor="code-desc" className="text-sm text-secondary-600 lowercase">
                Short Description
              </label>
              <input
                id="paste-description"
                type="text"
                ref={codeDescription}
                className="py-2 px-4 border tracking-wide rounded-md text-sm border-secondary-300 focus:outline-none focus:border-primary-400"
                placeholder="Enter some short description for your paste..."
                defaultValue={data?.description}
              />
            </div>
            <div className="flex flex-col w-56 lg:w-auto md:ml-4 py-2">
              <div className="flex items-center justify-between">
                <label htmlFor="paste-expiration" className="text-sm text-secondary-600 lowercase">
                  Set Expiration
                </label>
                <button
                  title="Remove expiration date"
                  className="text-xs text-secondary-500 hover:underline"
                  onClick={() => (codeExpiration.current.value = '')}
                >
                  clear
                </button>
              </div>
              <input
                id="paste-expiration"
                type="datetime-local"
                ref={codeExpiration}
                defaultValue={convertDateForInput(data?.expiryDate)}
                className="py-2 px-4 border tracking-wide rounded-md text-sm border-secondary-300 text-secondary-600 focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="code-content" className="text-sm text-secondary-600 lowercase">
            Paste
          </label>
          <MonacoEditor codeEditor={codeEditor} codeLanguage={codeLanguage} content={data ? data.content : null} />
        </div>

        <div className="flex items-center justify-end py-2">
          <button
            id="create-update-btn"
            ref={btnCreateUpdateRef}
            onClick={() => {
              // change button text and disable
              btnCreateUpdateRef.current.innerText = `${update ? 'Updating' : 'Creating'} Paste...`;
              btnCreateUpdateRef.current.disabled = true;

              handleCreatePaste();
            }}
            className="py-2 px-8 rounded-full bg-primary-500 opacity-80 hover:opacity-100 text-white disabled:opacity-60"
          >
            {update ? 'Update' : 'Create'} Paste
          </button>
        </div>
      </div>
    </>
  );
};

export default MainEditor;
