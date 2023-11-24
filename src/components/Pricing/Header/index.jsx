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
            <p className="text-center">
              Sign up now and start building with your 21-day free trial.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/"
            >
              Start Free
            </Link>
            <Link className={styles.buttonOutline} to="#contact-sales">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
