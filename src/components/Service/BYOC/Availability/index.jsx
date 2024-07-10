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
            <div className={styles.techBox}>
              <Link to="/partners/aws">
                <span className={styles.aws} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="/partners/gcp">
                <span className={styles.gcp} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="">
                <span className={styles.azure} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="/partners/snowflake">
                <span className={styles.snowflake} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
