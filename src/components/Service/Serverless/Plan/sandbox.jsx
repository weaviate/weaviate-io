import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingSandBox() {
  return (
    <div className={styles.sandbox}>
      <div className={`${styles.title} ${styles.sandboxTitle}`}>
        <h3 className={styles.color}>Free Sandbox</h3>
      </div>
      <div className={`${styles.features} ${styles.featuresTitle}`}>
        <span>
          Get free access for learning and prototyping. Only pay when you go
          into production.
        </span>
      </div>
      <div className={styles.features}>
        <li>14 days lifetime</li>
        <li>Monitoring</li>
        <li>Public Slack</li>
      </div>
      <div className={styles.features}>
        <li>Community support</li>
        <li>Single AZ</li>
      </div>
      <div className={styles.features}>
        <div className={styles.buttonsSales}>
          <Link
            className={styles.buttonOutlineSales}
            to="https://console.weaviate.cloud/"
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
}
