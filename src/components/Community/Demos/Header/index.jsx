import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <span>Demos</span>
          <br></br>
          <h1>Weaviate Demos</h1>
          <div className={styles.headerBox}>
            <p>
              In-house Weaviate built projects leveraging Weaviate, AI-Native
              vector database.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
