import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.headText}>Serverless Cloud</p>
          <div className={styles.headerBox}>
            <h1>Fully-managed Serverless Vector Database.</h1>
            <p>
              The easiest way to get started with Weaviate. All the power of our
              AI-native vector database, as a vector database as a service. Best
              for nimble teams at all stages of building.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/signin?callbackUrl=https%3A%2F%2Fconsole.weaviate.cloud%2F"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
