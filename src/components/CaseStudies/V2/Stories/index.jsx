import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <div className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>
            Thousands of companies rely on Weaviate to power their businesses
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bento01}>
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Turning Unstructured Data into Insights</h3>
              <p>How Instabase delivers enterprise-ready AI with Weaviate</p>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/case-studies/instabase"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento02}>
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Transforming Customer Service with Generative AI</h3>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/case-studies/neople"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento03}>
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Building an AI-Powered Shopping Copilot with Weaviate</h3>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/case-studies/neople"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
