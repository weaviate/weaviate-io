import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <header className={styles.headerSecurity}>
      <div className={styles.container}>
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
          <div className={styles.bento04}>
            <div className={styles.bentoText}>
              <div className={styles.bentoImage}></div>
              <h3>
                Using Weaviate to Build the Foundation for AI-First App
                Development
              </h3>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/case-studies/neople"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento05}>
            <div className={styles.bentoText}>
              <div className={styles.bentoImage}></div>
              <div className={styles.innerText}>
                <h3>
                  “Through our Corpus API connected to Weaviate, users can build
                  very powerful, low latency search engines in minutes with
                  little to no code.”
                </h3>
                <p>Aisis Julian</p>
                <span>Senior Software Engineer, Morningstar</span>
              </div>
            </div>
            <div className={styles.buttons}>
              <Link
                to="/case-studies/morningstar"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bento06}>
            <div className={styles.bentoText}>
              <div className={styles.innerText}>
                <h3>Start building with Weaviate for free</h3>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link
                to="https://console.weaviate.cloud"
                className={styles.buttonDark}
              >
                Get Started
              </Link>
              <Link to="/#contact-us" className={styles.buttonLight}>
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
