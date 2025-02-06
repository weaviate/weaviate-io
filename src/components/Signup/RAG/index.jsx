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
          formId: '93643aca-5ec0-4043-a2cd-9cdead9d1239',
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
              <span>GUIDE</span>
              <h1 classname={styles.headerTag}>Advanced RAG Techniques</h1>
              <span className={styles.subTitle}>
                A guide to help improve the performance of your
                Retrieval-Augmented Generation applications.
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
        <div>
          <h3>About the guide</h3>
          <p>
            The advanced Retrieval-Augmented Generation (RAG) techniques e-book
            provides an overview of different techniques to improve the
            performance of your RAG application. It covers techniques along all
            stages of the RAG pipeline, including:
          </p>
          <br></br>
          <ul>
            <li>
              Indexing optimization techniques (data pre-processing, chunking
              strategies)
            </li>
            <li>
              Pre-retrieval optimization techniques (query transformation, query
              decomposition, query routing)
            </li>
            <li>
              Retrieval optimization techniques (metadata filtering, excluding
              vector search outlier, hybrid search, embedding model fine-tuning)
            </li>
            <li>
              Post-retrieval optimization techniques (re-ranking, context
              post-processing, prompt engineering, LLM fine-tuning)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
