import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>The AI-Native Vector Database</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Purpose-built platform for a new breed of software applications.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/"
            >
              Start Free
            </Link>
            <Link className={styles.buttonOutline} to="/developers/weaviate">
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
