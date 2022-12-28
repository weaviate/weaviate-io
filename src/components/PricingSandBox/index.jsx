import React from 'react';
import styles from './styles.module.scss';

export default function PricingSandBox() {
  return (
    <div className="container">
      <div className={styles.sandbox}>
        <div className={styles.title}>
          <h3 className={styles.color}>Sandbox</h3> Free
        </div>
        <div className={styles.features}>
          <li>Round robin region: AWS, Azure, GCP</li>
          <li>30 days lifetime</li>
        </div>
        <div className={styles.features}>
          <li>Monitoring</li>
          <li>
            <a href="https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw">
              Public Slack
            </a>
          </li>
        </div>
        <div className={styles.features}>
          <li>Community support</li>
          <li>Single AZ</li>
        </div>
      </div>
    </div>
  );
}
