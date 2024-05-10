import React from 'react';
import Link from '@docusaurus/Link';
import ClipboardJS from 'clipboard';
import styles from './styles.module.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code }) => {
  return (
    <SyntaxHighlighter showLineNumbers language="graphql" style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
