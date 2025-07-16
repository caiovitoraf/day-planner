import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

// Este componente servirá como nosso editor de Markdown configurado
function MarkdownEditor({ value, onChange }) {

  return (
    <CodeMirror
      value={value}
      height="100%"
      style={{ height: '100%' }} // Garante que o editor preencha o espaço
      onChange={onChange}
      extensions={[
        // Habilita a linguagem Markdown com realce de sintaxe e mais.
        // O 'codeLanguages' é importante para blocos de código dentro do Markdown (ex: ```js)
        markdown({ base: markdownLanguage, codeLanguages: languages })
      ]}
    />
  );
}

export default MarkdownEditor;