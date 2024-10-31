import React, { useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

import paths from '/data/paths.json';

export default function Details() {
  const [isCopied, setIsCopied] = useState(false);
  const resoursesSite = paths.siteSearch;
  const resoursesEcommerce = paths.ecommerce;
  const resoursesAutomation = paths.automation;
  const resoursesChatbots = paths.chatbots;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            <h2>👨🏽‍💻 Getting Started</h2>
            <p>1. Install the client</p>
            <div className={styles.codeContainer}>
              <code
                onClick={() => copyToClipboard('npm install weaviate-client')}
              >
                {'> npm install weaviate-client'}
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard('npm install weaviate-client')}
                >
                  {isCopied ? (
                    <i class="fa-solid fa-check"></i>
                  ) : (
                    <i class="fa-regular fa-copy"></i>
                  )}
                </button>
              </code>
            </div>
            <p>2. Search!!</p>
          </div>
          <div className={styles.serviceImage}></div>
        </div>
      </div>
    </div>
  );
}
