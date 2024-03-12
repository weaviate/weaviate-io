import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingStandard() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Standard</h3>
      </div>
      <hr></hr>

      <div className={styles.features}>
        <li>
          <div className={styles.checkIcon}></div>
          <span>$0.095 per 1M vector dimensions stored per month</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Monitoring - access to regional status pages</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Email support during business hours</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - 1bd <br></br>Severity 2 - 2bd <br></br>Severity 3 - 3bd{' '}
            <br></br>Severity 4 - 5bd
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
