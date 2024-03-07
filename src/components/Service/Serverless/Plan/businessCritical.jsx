import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingBusinessCritical() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Business Critical</h3>
      </div>
      <hr></hr>

      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <span>$0.175 per 1M vector dimensions stored per month</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Monitoring - access to dedicated status<br></br> page, access to
            monitoring metrics
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Email support during business hours,<br></br> phone escalation
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - 1h (24/7) <br></br>Severity 2 - 4h (24/7)<br></br>
            Severity 3 - 8h (24/7) <br></br>Severity 4 - 1bd
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Multiple availability zone</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>High availability optional</span>
        </li>
      </div>
    </div>
  );
}
