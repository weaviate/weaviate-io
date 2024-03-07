import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingEnterprise() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Enterprise</h3>
      </div>
      <hr></hr>

      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <span>$0.145 per 1M vector dimensions stored per month</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Monitoring - access to dedicated status<br></br> page
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
            Severity 1 - 4h (24/7) <br></br>Severity 2 - 8h (24/7)<br></br>
            Severity 3 - 1bd <br></br>Severity 4 - 2bd
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
