import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.headerImage}>
            <div className={styles.headerImage1}></div>
            <div className={styles.headerImage2}></div>
          </div>
          <br></br>
          <h1>Community starts with YOU!</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              We are an open-source purpose-built AI database for secure,
              stateful, explainable generative AI applications.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonOutline}
              to="https://newsletter.weaviate.io/"
            >
              Subscribe for news
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
