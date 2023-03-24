import React from 'react';
import styles from './styles.module.scss';

export default function PricingSandBox() {
  return (
    <div className={styles.sandbox}>
      <div className={styles.title}>
        <h3 className={styles.color}>Sandbox</h3> Free
      </div>
      <div className={styles.featuresLong}>
        <li>
          <div className={styles.checkIcon}></div>
          <span> Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> 14 days lifetime
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div> Monitoring
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <a href="https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw">
            {' '}
            Public Slack
          </a>
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Community support</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> Single AZ
        </li>
      </div>
    </div>
  );
}
