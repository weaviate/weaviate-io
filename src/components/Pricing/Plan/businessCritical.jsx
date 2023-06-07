import React from 'react';
import styles from './styles.module.scss';

export default function PricingBusinessCritical() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Business Critical</h3>
      </div>
      <div className={styles.price}>
        <p>from</p>
        <span>
          $ <span className={styles.big}> 450 </span> /mo
        </span>
      </div>
      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            $0.175 per 1M vector dimensions stored <br /> or queried per month
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>AWS, Azure, GCP</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>Monitoring</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Weaviate Internal Slack or Teams / Email</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - max 1h <br /> Severity 2 - max 4h <br /> Severity 3 -
            max 1bd
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>Multi AZ</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>HA optional</span>
        </li>
      </div>
    </div>
  );
}
