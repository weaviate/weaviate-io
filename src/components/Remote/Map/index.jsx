import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Map() {
  return (
    <div className={styles.mapsContainer}>
      <div className={styles.box}>
        <div className={styles.mapLogos}>
          <div className={styles.mapDiagram}></div>
        </div>
        <div className={styles.mapBox}>
          <h2>Weaviate around the world</h2>

          <p>
            As a remote company with distributed teams, we embrace the
            flexibility that comes from allowing our employees to live wherever
            they choose around the globe. Have a look where our people are
            living.
          </p>
        </div>
      </div>
    </div>
  );
}
