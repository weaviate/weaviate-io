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
          formId: '62e704b7-b857-421e-a30d-46ac0a3f5d81',
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
            <span>ANALYST REPORT</span>
            <h1 classname={styles.headerTag}>
              GigaOm Sonar Report for Vector Databases
            </h1>
            <span className={styles.subTitle}>
              Weaviate named a Leader and Fast-Mover{' '}
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.contentSideA}>
              <div className={styles.reportImage}></div>
            </div>
            <div className={styles.contentSideB}>
              <div className={styles.signUp}>
                <div className={styles.signUpBox}>
                  <div className={styles.formWrapper}>
                    <div id="hs-form" className={styles.ebookForm}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentBottom}>
            <span>
              “[Weaviate] is in the Leader circle because of cost-saving
              techniques that include storage tiering, its use of language
              models for summarization and NLQ, and a modular approach to
              accessing models for embedding content and ranking search
              results.”
            </span>
            <span className={styles.quote}>
              Gigaom Sonar Report for Vector Databases by Andrew Brust and
              Jelani Harper, December 11. 2024
            </span>
            <h3>About the report</h3>
            <p>
              The GigaOm Sonar Report for Vector Databases provides a thorough
              examination of the rapidly evolving vector database market. In its
              second edition, the report equips IT decision-makers with detailed
              insights into vendor offerings and evaluation criteria, including:
            </p>

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
      </div>
      <div className={styles.footer}>
        <span>Weaviate, 2024</span>
        <div className={styles.footerLinks}>
          <div className={styles.footerIcon}>
            <Link to="https://x.com/weaviate_io">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
          <div className={styles.footerIcon}>
            <Link to="https://instagram.com/weaviate.io">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
          <div className={styles.footerIcon}>
            <Link to="https://www.linkedin.com/company/weaviate-io">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
          <div className={styles.footerIcon}>
            <Link to="https://youtube.com/@Weaviate">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
