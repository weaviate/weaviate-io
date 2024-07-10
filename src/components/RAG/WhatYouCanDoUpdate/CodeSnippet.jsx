import React from 'react';
import Link from '@docusaurus/Link';
import ClipboardJS from 'clipboard';
import styles from './codeStyles.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code, buttonText, outLink, buttonClass }) => {
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
      <SyntaxHighlighter language="graphql" showLineNumbers style={atomDark}>
        {code}
      </SyntaxHighlighter>
      <Link className={styles.linkRight} to={outLink}>
        <button
          ref={codeRef}
          data-clipboard-text={code}
          className={buttonClass}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default CodeSnippet;
