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
        <p>from</p>
        <span>
          $ <span className={styles.big}> 25 </span> /mo
        </span>
      </div>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
          <span>
            $0.095 per 1M embeddings
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
      <div className={styles.buttonBox}>
        <Link className={styles.buttonTry} to="https://console.weaviate.cloud/">
          Try Now
        </Link>
      </div>
    </div>
  );
}
