import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function StrategicPartners() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Strategic Partners</h2>
          <p>
            If you have a complementary technology or product, we want to
            collaborate with you.<br></br> Integrate Weaviate's powerful AI
            capabilities into your solutions to provide enhanced value<br></br>{' '}
            to your customers.
          </p>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.techList}>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.aws} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.gcp} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.azure} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.snowflake} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.databricks} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
