import React from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function PricingStandard() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Standard</h3>
      </div>
      <div className={styles.price}>
        <p>from</p>
        <span>
          $ <span className={styles.big}> 25 </span> /mo
        </span>
      </div>
      <div className={styles.features}>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span>
            $0.050 per 1M vector dimensions stored or queried per month
          </span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span>Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span>Hibernation after 1 hour</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> <span>Monitoring</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> <span>Public Slack</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} />{' '}
          <span>
            Severity 1 - max 1h Severity 2 max 4h Severity 3 Severity 3 max 1bd
          </span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> <span>Multi AZ</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleCheck} /> <span>HA optional</span>
        </li>
      </div>
    </div>
  );
}
