import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>The AI-Native, Open Source Vector Database</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Purpose-built open source vector database for a new breed of
              software applications.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="/go/console">
              Start Free
            </Link>
            <Link
              className={styles.buttonOutline}
              to="https://docs.weaviate.io/weaviate"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
