import { useState, useRef } from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Nav';

import _ from 'lodash';

import Editor from '@monaco-editor/react';

export default function Home() {
  const codeEditor = useRef(null);

  const codeFilename = useRef<HTMLInputElement>(null);
  const [privateCode, setPrivateCode] = useState<boolean>(false);

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

  return (
    <Layout title="Welcome">
      <Navigation />

      <hr />

      <div className="w-5/6 mx-auto my-8">
        {/* paste options */}
        <div className="flex items-center justify-between py-2">
          <input
            ref={codeFilename}
            type="text"
            placeholder="filename.ext"
            className="border-b-2 border-secondary-300 focus:outline-none focus:border-primary-400 py-2 px-3 tracking-wide w-1/3"
          />
          <div>
            <input
              type="checkbox"
              className="h-4 w-4"
              onChange={() => {
                setPrivateCode(true);
              }}
            />
            <span className="ml-2 text-secondary-600" title="Your paste will not be shown in latest.">
              Make Private
            </span>
          </div>
        </div>

        <div>
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
          <button className="py-2 px-8 rounded-full bg-primary-500 opacity-80 hover:opacity-100 text-white">
            Create Paste
          </button>
        </div>
      </div>
    </Layout>
  );
}
