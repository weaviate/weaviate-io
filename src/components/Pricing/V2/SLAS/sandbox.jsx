import React from 'react';
import styles from './styles.module.scss';

export default function PricingSandBox() {
  return (
    <div className={styles.sandbox}>
      <div className={`${styles.title} ${styles.sandboxTitle}`}>
        <h3 className={styles.color}>Sandbox</h3> Free
      </div>
      <div className={styles.featuresLong}>
        <li>
          <div className={styles.checkIcon}></div> 21 days lifetime
        </li>
        <li>
          <div className={styles.checkIcon}></div> Monitoring
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <a href="https://weaviate.io/slack"> Public Slack</a>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Community support</span>
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div> Single AZ
        </li>
      </div>
    </div>
  );
}
