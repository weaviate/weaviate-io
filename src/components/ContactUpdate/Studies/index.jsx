import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Studies() {
  return (
    <div className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.bentoGrid}>
          <Link
            to="https://www.astronomer.io/blog/ask-astro-open-source-llm-application-apache-airflow/"
            className={styles.bentoSmall}
          >
            <div className={styles.bentoText}>
              <div className={styles.bentoLogo}></div>
              <h3>Ask Astro: An open source LLM Application</h3>
            </div>
          </Link>
          <Link
            to="https://innovativesol.com/success-stories/preverity/"
            className={styles.bentoSmall}
          >
            <div className={styles.bentoText}>
              <div className={`${styles.bentoLogo} ${styles.logo02}`}></div>
              <h3>Transforming Risk Management with Generative AI</h3>
            </div>
          </Link>
          <Link
            to="https://innovativesol.com/success-stories/humach/"
            className={styles.bentoSmall}
          >
            <div className={styles.bentoText}>
              <div className={`${styles.bentoLogo} ${styles.logo03}`}></div>
              <h3>Solving Operational Challenges with Weaviate</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
