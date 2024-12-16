import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { css } from 'styled-components';

export default function Introduction() {
  useEffect(() => {
    // Load the external HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: '870eca82-9147-4753-a021-856a4cd6883e',
          target: '#hs-form',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className={styles.demoContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.demoTitle}>
            <div className={styles.demoLogo}></div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentSideA}>
              <div className={styles.reportImage}></div>
            </div>
            <div className={styles.contentSideB}>
              <span>ANALYST REPORT</span>
              <h1 classname={styles.headerTag}>
                GigaOm Sonar Report for Vector Databases
              </h1>
              <span className={styles.subTitle}>
                Weaviate named a Leader and Fast-Mover{' '}
              </span>
              <div className={styles.signUp}>
                <div className={styles.signUpBox}>
                  <div className={styles.formWrapper}>
                    <div id="hs-form" className={styles.ebookForm}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <div className={styles.quoteContainer}>
          <span>
            “[Weaviate] is in the Leader circle because of cost-saving
            techniques that include storage tiering, its use of language models
            for summarization and NLQ, and a modular approach to accessing
            models for embedding content and ranking search results.”
          </span>
          <p className={styles.quote}>
            Gigaom Sonar Report for Vector Databases by Andrew Brust and Jelani
            Harper, December 11. 2024
          </p>
        </div>
        <div>
          <h3>About the report</h3>
          <p>
            The GigaOm Sonar Report for Vector Databases provides a thorough
            examination of the rapidly evolving vector database market. In its
            second edition, the report equips IT decision-makers with detailed
            insights into vendor offerings and evaluation criteria, including:
          </p>
          <br></br>
          <ul>
            <li>Cost-Saving Constructs</li>
            <li>Indexing Utility</li>
            <li>Multimodality</li>
            <li>Use of Language Models</li>
            <li>Embedding Flexibility</li>
            <li>Search Versatility</li>
            <li>Real-Time Applicability</li>
          </ul>
        </div>
      </div>
    </>
  );
}
