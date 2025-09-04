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
          <p>
            With over 20M monthly downloads, our open source vector database is
            a core piece of the AI-native stack for developers and enterprises
            alike.
          </p>
        </div>
        <div className={styles.bentoBar}>
          <div className={styles.bentoGrid}>
            <div className={styles.bento01}>
              <div className={styles.bentoText}>
                <div className={styles.bentoLogo}></div>
                <h3>
                  How Morningstar built a trustworthy, AI-driven financial data
                  platform{' '}
                </h3>
              </div>
              <div className={styles.buttons}>
                <Link
                  to="/case-studies/morningstar"
                  className={`${styles.arrowButton} ${styles.darkArrow}`}
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
            <div className={styles.bento04}>
              <div className={styles.bentoText}>
                <div className={styles.bentoLogo}></div>
                <h3>Building Foundations for AI-First App Development</h3>
                <div className={styles.bentoImage}></div>
              </div>
              <div className={styles.buttons}>
                <Link
                  to="/blog/unbody-weaviate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.arrowButton} ${styles.darkArrow}`}
                ></Link>
              </div>
            </div>
          </div>

          <div className={styles.bentoGrid}>
            <div className={`${styles.bento04} ${styles.bentoKapa}`}>
              <div className={styles.bentoText}>
                <div className={styles.bentoLogo}></div>
                <h3>
                  How Kapa takes the pain out of finding technical answers
                </h3>
                <div className={styles.bentoImage}></div>
              </div>
              <div className={styles.buttons}>
                <Link
                  to="/case-studies/kapa"
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
            <div className={`${styles.bento01} ${styles.bentoInstabase}`}>
              <div className={styles.bentoText}>
                <div className={styles.bentoLogo}></div>
                <h3>Turning Unstructured Data into Insights</h3>
              </div>
              <div className={styles.buttons}>
                <Link
                  to="/case-studies/instabase"
                  className={styles.arrowButton}
                ></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
