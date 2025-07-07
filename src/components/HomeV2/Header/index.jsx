import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerBG}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <h1>
              FOR AI ENGINEERS<br></br>
              <span>WHO THINK BIG</span>
            </h1>
            <p>
              Start fast, scale to billions with a feature-rich vector database
              trusted by AI innovators{' '}
            </p>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link
                  to="https://console.weaviate.cloud/"
                  className={styles.buttonLight}
                >
                  Get Started
                </Link>
                <Link
                  to="/blog/building-core-of-ai-native-stack"
                  className={styles.buttonDark}
                >
                  How we empower<br></br> AI-native builders →
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
          <div className={`${styles.logo} ${styles.logo0}`}></div>
          <div className={`${styles.logo} ${styles.logo1}`}></div>
          <div className={`${styles.logo} ${styles.logo2}`}></div>
          <div className={`${styles.logo} ${styles.logo3}`}></div>
          <div className={`${styles.logo} ${styles.logo4}`}></div>
          <div className={`${styles.logo} ${styles.logo5}`}></div>
          <div className={`${styles.logo} ${styles.logo7}`}></div>
          <div className={`${styles.logo} ${styles.logo8}`}></div>
          <div className={`${styles.logo} ${styles.logo9}`}></div>

          <div className={`${styles.logo} ${styles.logo11}`}></div>
          <div className={`${styles.logo} ${styles.logo12}`}></div>
          <div className={`${styles.logo} ${styles.logo13}`}></div>
          <div className={`${styles.logo} ${styles.logo14}`}></div>
          <div className={`${styles.logo} ${styles.logo15}`}></div>
          <div className={`${styles.logo} ${styles.logo16}`}></div>
          <div className={`${styles.logo} ${styles.logo17}`}></div>
          <div className={`${styles.logo} ${styles.logo18}`}></div>
          <div className={`${styles.logo} ${styles.logo19}`}></div>
          <div className={`${styles.logo} ${styles.logo21}`}></div>
          <div className={`${styles.logo} ${styles.logo22}`}></div>
          <div className={`${styles.logo} ${styles.logo23}`}></div>

          <div className={`${styles.logo} ${styles.logo0}`}></div>
          <div className={`${styles.logo} ${styles.logo1}`}></div>
          <div className={`${styles.logo} ${styles.logo2}`}></div>
          <div className={`${styles.logo} ${styles.logo3}`}></div>
          <div className={`${styles.logo} ${styles.logo4}`}></div>
          <div className={`${styles.logo} ${styles.logo5}`}></div>
          <div className={`${styles.logo} ${styles.logo7}`}></div>
          <div className={`${styles.logo} ${styles.logo8}`}></div>
          <div className={`${styles.logo} ${styles.logo9}`}></div>
          <div className={`${styles.logo} ${styles.logo11}`}></div>
          <div className={`${styles.logo} ${styles.logo12}`}></div>
          <div className={`${styles.logo} ${styles.logo13}`}></div>
          <div className={`${styles.logo} ${styles.logo14}`}></div>
          <div className={`${styles.logo} ${styles.logo15}`}></div>
          <div className={`${styles.logo} ${styles.logo16}`}></div>
          <div className={`${styles.logo} ${styles.logo17}`}></div>
          <div className={`${styles.logo} ${styles.logo18}`}></div>
          <div className={`${styles.logo} ${styles.logo19}`}></div>
          <div className={`${styles.logo} ${styles.logo21}`}></div>
          <div className={`${styles.logo} ${styles.logo22}`}></div>
          <div className={`${styles.logo} ${styles.logo23}`}></div>
        </div>
      </div>
    </header>
  );
}
