import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function Integration() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Weaviate and Databricks integration</h2>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.diagram}></div>
        </div>
      </div>
    </div>
  );
}
