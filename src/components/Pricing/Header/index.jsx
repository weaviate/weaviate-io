import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PricingHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.topText}>Pricing</p>
          <h1>
            All the power of the AI-native vector<br></br> database, without the
            overhead
          </h1>
          <div className={styles.headerBox}>
            <p>
              Flexible deployment options and pricing to meet the needs of every
              use case.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/"
            >
              Try Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
