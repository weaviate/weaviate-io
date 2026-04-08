import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <span>Showcases</span>
          <br></br>
          <h1>Build with Weaviate</h1>
          <div className={styles.headerBox}>
            <p>
              Build something cool with Weaviate?<br></br> Let us know so we can
              help spread the word.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonOutline}
              to="/community/share-the-weaviate-love"
            >
              Submit your project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
