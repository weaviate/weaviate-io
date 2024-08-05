import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Start building with Weaviate Cloud for free</h1>
          <div className={styles.headerBox}>
            <p>
              All the power of our AI-native vector database, as a fully-managed
              SaaS.
            </p>
            <div className={styles.buttons}>
              <Link to="/cloud/signup" className={styles.buttonGradient}>
                Create an account
              </Link>
              <Link to="/cloud/signup" className={styles.buttonOutline}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
