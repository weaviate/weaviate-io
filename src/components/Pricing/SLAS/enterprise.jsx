import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingEnterprise() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Enterprise</h3>
      </div>
      <div className={styles.price}>
        <p>
          from $ <span className={styles.big}> 135 </span> /mo
        </p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
          <span>
            $0.145 per 1M vector dimensions
            <br /> stored per month
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>∞ lifetime (until terminated)</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>{' '}
          <span>
            Monitoring -<br />
            access to dedicated status page
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Email support during business hours,
            <br /> phone escalation
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - 4h (24/7) <br /> Severity 2 - 8h (24/7) <br /> Severity
            3 - 1bd <br /> Severity 4 - 2bd
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>Multi AZ</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div> <span>HA optional</span>
        </li>
      </div>
      <br />
    </div>
  );
}
