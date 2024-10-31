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
                to="/case-studies/neople"
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
                to="/case-studies/neople"
                className={styles.arrowButton}
              ></Link>
            </div>
          </div>
          <div className={styles.bentoSmall}>
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Ask Astro: An open source LLM Application</h3>
            </div>
          </div>
          <div className={styles.bentoSmall}>
            <div className={styles.bentoText}>
              <div className={`${styles.bentoLogo} ${styles.logo02}`}></div>
              <h3>Transforming Risk Management with Generative AI</h3>
            </div>
          </div>
          <div className={styles.bentoSmall}>
            <div className={styles.bentoText}>
              <div className={`${styles.bentoLogo} ${styles.logo03}`}></div>
              <h3>Solving Operational Challenges with Weaviate</h3>
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
