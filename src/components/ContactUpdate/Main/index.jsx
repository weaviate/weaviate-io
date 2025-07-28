import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>
            Innovative companies of all sizes power AI experiences with Weaviate
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
                target="_blank"
                rel="noopener noreferrer"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento03}>
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Building an AI-Powered Shopping Copilot</h3>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/blog/moonsift-story"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento04}>
            <div className={styles.bentoText}>
              <div className={styles.bentoImage}></div>
              <h3>Building Foundations for AI-First App Development</h3>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/blog/unbody-weaviate"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
