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
        <p>Choose a fully managed solution or 24/7 support within your VPC.</p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={styles.doubleIcon}></div>
          <span>We manage Weaviate in your VPC</span>
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
      <div className={`${styles.buttonBox} ${styles.byocButton}`}>
        <Link className={styles.buttonTryOutline} to="#contact-sales">
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
