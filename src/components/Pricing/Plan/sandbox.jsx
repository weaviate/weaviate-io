import React from 'react';
import styles from './styles.module.scss';

export default function PricingSandbox() {
  return (
    <div className={styles.sandbox}>
      <div className={styles.title}>
        <h3 className={styles.color}>Sandbox</h3> Free
      </div>
      <div className={styles.featuresLong}>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span> Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i> 30 days lifetime
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <i className="fas fa-circle-check"></i> Monitoring
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <a href="https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw">
            {' '}
            Public Slack
          </a>
        </li>
      </div>
      <div className={styles.features}>
        <li>
          {' '}
          <i className="fas fa-circle-check"></i> Community support
        </li>
        <li>
          {' '}
          <i className="fas fa-circle-check"></i> Single AZ
        </li>
      </div>
    </div>
  );
}
