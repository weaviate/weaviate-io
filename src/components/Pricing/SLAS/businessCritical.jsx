import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingBusinessCritical() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Business Critical</h3>
      </div>
      <div className={styles.price}>
        <p>
          from $ <span className={styles.big}> 450 </span> /mo
        </p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
          <span>
            $0.175 per 1M vector dimensions
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
            access to dedicated status page,
            <br /> access to monitoring metrics
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
            Severity 1 - 1h (24/7)
            <br /> Severity 2 - 4h (24/7) <br /> Severity 3 - 8h (24/7) <br />
            Severity 4 - 1bd
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
