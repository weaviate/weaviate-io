import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingBusinessCritical() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h3>Bring Your Own Cloud</h3>
      </div>
      <div className={styles.price}>
        <p>We manage the data plane inside your virtual private cloud.</p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={styles.doubleIcon}></div>
          <span>Customer-managed VPC with Weaviate-managed Data Plane</span>
        </li>
        <li>
          <div className={styles.doubleIcon}></div>
          <span>Pricing based upon CPU + RAM utilization</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>Highly secure</span>
        </li>
        <li>
          <div className={styles.checkIcon}></div>
          <span>
            Weaviate agent for monitoring, support, and troubleshooting
          </span>
        </li>

        <li>
          <div className={styles.checkIcon}></div>
          <span>Annual contract</span>
        </li>

        <li>
          <div className={styles.checkIcon}></div>
          <span>Business Critical SLA tier</span>
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
