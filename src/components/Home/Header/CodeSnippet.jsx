import React from 'react';
import Link from '@docusaurus/Link';
import ClipboardJS from 'clipboard';
import styles from './codeStyles.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code }) => {
  return (
    <div className={styles.codeSnip}>
      <SyntaxHighlighter showLineNumbers language="graphql" style={twilight}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
