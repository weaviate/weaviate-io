import React from 'react';
import styles from './styles.module.scss';

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
          <i className="fas fa-circle-check"></i>{' '}
          <span>
            $0.050 per 1M vector dimensions stored or queried per month
          </span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>Hibernation after 1 hour</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>Monitoring</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>Public Slack</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>
            Severity 1 - max 1h Severity 2 max 4h Severity 3 Severity 3 max 1bd
          </span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>Multi AZ</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>HA optional</span>
        </li>
      </div>
    </div>
  );
}
