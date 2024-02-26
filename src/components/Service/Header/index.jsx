import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Weaviate Services</h1>
          <div className={styles.headerBox}>
            <p>
              Whether you work at a fast-paced startup or at an enterprise with
              specific deployment needs, we're here to help. Weaviate Cloud
              Services (WCS) is a fully-managed service that can deploy Weaviate
              in a dedicated tenant, an isolated tenant, or even in your own
              cloud environment.
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
