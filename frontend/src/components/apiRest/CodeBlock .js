import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Assurez-vous d'utiliser un style de highlight.js
import './CodeBlockStyles.css'; // Votre CSS personnalisé

const CodeBlock = ({ code }) => {
  const codeRef = React.useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copié dans le presse-papiers !");
    });
  };

  return (
    <div className="code-container">
      <button className="copy-button" onClick={copyToClipboard}>
        Copier le code
      </button>
      <pre>
        <code ref={codeRef}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
