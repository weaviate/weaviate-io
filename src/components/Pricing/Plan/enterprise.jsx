import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingEnterprise() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Enterprise Dedicated</h3>
      </div>
      <div className={styles.price}>
        <p>
          We manage everything for you in a single tenant in the Weaviate Cloud.
        </p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
          <span>Single tenant SaaS deployment</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Cluster based pricing based upon scope</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>High Availability architecture</span>
        </li>

        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Annual contract <br></br>
            (12, 24, or 36 month)
          </span>
        </li>

        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Three SLA tier options:
            <ul>
              <li>
                <div className={styles.checkIconWhite}></div>Standard
              </li>
              <li>
                <div className={styles.checkIconWhite}></div>Enterprise
              </li>
              <li>
                <div className={styles.checkIconWhite}></div>Business Critical
              </li>
            </ul>
          </span>
        </li>
      </div>
      <br />
      <br />
      <div className={styles.buttonBox}>
        <Link
          className={styles.buttonTryOutline}
          to="https://console.weaviate.cloud/"
        >
          Try Now
        </Link>
      </div>
    </div>
  );
}
