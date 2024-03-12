import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Serverless</h1>
          <div className={styles.headerBox}>
            <p>
              The easiest way to get started with Weaviate. All the power of our
              AI-native vector database, as a fully-managed SaaS offering. Best
              for nimble teams at all stages of building.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/"
            >
              Try Free
            </Link>
            <Link className={styles.buttonOutline} to="#plan">
              Compare Packages
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
