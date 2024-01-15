import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function SystemIntegrators() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>System Integrators</h2>
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
                <span className={styles.innovativePartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.smartCatPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.ml6Partners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.nttDataPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.bigDataPartners} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
