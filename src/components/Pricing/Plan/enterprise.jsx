import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingEnterprise() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Weaviate Enterprise Cloud</h3>
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
          <span>Annual contract</span>
        </li>

        <li>
          <div className={styles.checkIcon}></div>
          <span>
            SLA tiers:
            <ul>
              <li>
                <div className={styles.checkIconWhite}></div>Professional
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
      <br />
      <div className={`${styles.buttonBox} ${styles.enterpriseButton}`}>
        <Link className={styles.buttonTryOutline} to="#contact-sales">
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
