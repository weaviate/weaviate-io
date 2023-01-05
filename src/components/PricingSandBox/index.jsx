import React from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function PricingSandBox() {
  return (
    <div className={styles.sandbox}>
      <div className={styles.title}>
        <h3 className={styles.color}>Sandbox</h3> Free
      </div>
      <div className={styles.featuresLong}>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span> Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> 30 days lifetime
        </li>
      </div>
      <div className={styles.features}>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> Monitoring
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />
          <a href="https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw">
            {' '}
            Public Slack
          </a>
        </li>
      </div>
      <div className={styles.features}>
        <li>
          {' '}
          <FontAwesomeIcon icon={faCircleCheck} /> Community support
        </li>
        <li>
          {' '}
          <FontAwesomeIcon icon={faCircleCheck} /> Single AZ
        </li>
      </div>
    </div>
  );
}
