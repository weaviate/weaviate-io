import React from 'react';
import Link from '@docusaurus/Link';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import ClipboardJS from 'clipboard';
import styles from './codeStyles.module.scss';
import { Prism } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
SyntaxHighlighter.registerLanguage('typsescript', typescript);

const CodeSnippet = ({ language, code }) => {
  const codeRef = React.useRef(null);

  React.useEffect(() => {
    // Initialize Clipboard.js when the component mounts
    new ClipboardJS(codeRef.current);

    return () => {
      // Destroy Clipboard.js instance when the component unmounts
      if (codeRef.current && codeRef.current.destroy) {
        codeRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.codeSnip}>
      <SyntaxHighlighter
        language={language}
        showInlineLineNumbers
        showLineNumbers
        wrapLines={true}
        wrapLongLines={true}
        style={a11yDark}
      >
        {code}
      </SyntaxHighlighter>
      <Link className={styles.linkRight} to="https://console.weaviate.cloud/">
        <button
          ref={codeRef}
          data-clipboard-text={code}
          className={styles.copyButton}
        >
          Try Vector Search
        </button>
      </Link>
    </div>
  );
};

export default CodeSnippet;
