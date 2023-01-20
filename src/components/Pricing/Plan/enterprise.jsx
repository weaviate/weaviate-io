import React from 'react';
import styles from './styles.module.scss';

export default function PricingEnterprise() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Enterprise</h3>
      </div>
      <div className={styles.price}>
        <p>from</p>
        <span>
          $ <span className={styles.big}> 135 </span> /mo
        </span>
      </div>
      <div className={styles.features}>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>
            $0.100 per 1M vector dimensions stored or queried per month
          </span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>AWS, Azure, GCP</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>Hibernation after 8 hours</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>
          <span>Monitoring</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>Weaviate Internal Slack or Teams / Email</span>
        </li>
        <li>
          <i className="fas fa-circle-check"></i>{' '}
          <span>
            Severity 1 - max 1h <br />
            Severity 2 - max 4h <br />
            Severity 3 - max 1bd
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
