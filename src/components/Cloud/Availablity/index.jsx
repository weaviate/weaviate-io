import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function availability() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Available on</h2>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.techList}>
            <Link to="/partners/gcp" className={styles.techBox}>
              <span className={styles.gcp} />
              <span className={styles.techName}>Google Cloud Platform</span>
              <p className={styles.techText}>Available Now {'>'}</p>
            </Link>
            <Link to="/partners/aws" className={styles.techBox}>
              <span className={styles.aws} />
              <span className={styles.techName}>Amazon Web Services</span>
              <p className={styles.techText}>Available Now {'>'}</p>
            </Link>

            <Link to="" className={styles.techBox}>
              <span className={styles.azure} />
              <span className={styles.techName}>Azure</span>
              <p className={styles.techText}>Available Now {'>'}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
