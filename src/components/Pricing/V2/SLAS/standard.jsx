import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingStandard() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Standard</h3>
      </div>
      <div className={styles.price}>
        <p>
          from $ <span className={styles.big}> 25 </span> /mo
        </p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
          <span>
            $0.095 per 1M vector dimensions
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
            access to regional status pages
          </span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>{' '}
          <span>Email support during business hours</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Severity 1 - 1bd <br /> Severity 2 - 2bd <br /> Severity 3 - 3bd{' '}
            <br /> Severity 4 - 5bd
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
      <br />
    </div>
  );
}
