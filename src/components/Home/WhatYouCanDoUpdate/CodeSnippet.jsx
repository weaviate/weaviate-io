import React from 'react';
import Link from '@docusaurus/Link';
import ClipboardJS from 'clipboard';
import styles from './codeStyles.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code, buttonText }) => {
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
      <SyntaxHighlighter language="graphql" style={twilight}>
        {code}
      </SyntaxHighlighter>
      <Link
        className={styles.linkRight}
        to="https://console.weaviate.io/console/query#weaviate_uri=https://demo.dataset.playground.semi.technology&graphql_query=%7B%0A%20%20Get%20%7B%0A%20%20%20%20Publication(%0A%20%20%20%20%20%20nearText%3A%20%7B%0A%20%20%20%20%20%20%20%20concepts%3A%20%5B%22fashion%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20vector%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
      >
        <button
          ref={codeRef}
          data-clipboard-text={code}
          className={styles.copyButton}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default CodeSnippet;
