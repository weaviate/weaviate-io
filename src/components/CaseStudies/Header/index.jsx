import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <span>Case Study</span>
            <h1>
              How Morningstar built a trustworthy, AI-driven financial data
              platform with Weaviate
            </h1>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link
                  to="/case-studies/morningstar"
                  className={styles.buttonDark}
                >
                  Read the story
                </Link>
                <Link to="/#contact-us" className={styles.buttonLight}>
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.image}></div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}></div>
          <div className={`${styles.logo} ${styles.logo1}`}></div>
          <div className={`${styles.logo} ${styles.logo2}`}></div>
          <div className={`${styles.logo} ${styles.logo3}`}></div>
          <div className={`${styles.logo} ${styles.logo4}`}></div>
          <div className={`${styles.logo} ${styles.logo5}`}></div>
          <div className={`${styles.logo} ${styles.logo6}`}></div>
          <div className={`${styles.logo} ${styles.logo7}`}></div>
        </div>
      </div>
    </header>
  );
}
