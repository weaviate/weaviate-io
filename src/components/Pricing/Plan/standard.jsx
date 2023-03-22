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
          <div className={styles.checkIcon}></div>
          <span>
            $0.050 per 1M vector dimensions <br /> stored or queried per month
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Round robin region: AWS, Azure, GCP</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Hibernation after 1 hour</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>Monitoring</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>Public Slack</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - max 1h Severity <br /> 2 max 4h Severity <br /> 3 Severity 3 max 1bd
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
