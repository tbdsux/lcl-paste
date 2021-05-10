import { MutableRefObject, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';

type MonacoEditorProps = {
  codeEditor: MutableRefObject<any>;
  content: string;
  codeLanguage: string;
};

export const MonacoEditor = ({ codeEditor, content, codeLanguage }: MonacoEditorProps) => {
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

  return (
    <Editor
      height="70vh"
      // defaultLanguage="text"
      language={codeLanguage}
      defaultValue={content}
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
  );
};
