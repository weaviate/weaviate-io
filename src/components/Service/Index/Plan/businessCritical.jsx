import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingBusinessCritical() {
  return (
    <div className={styles.boxContainer}>
      <Link className={styles.box} to="#contact-sales">
        <div className={styles.title}>
          <h3>Bring Your Own Cloud</h3>
        </div>
        <div className={styles.price}>
          <p>
            Choose a fully-managed solution or 24/7 support within your VPC.
          </p>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Customer-managed VPC </span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Weaviate-managed control plane</span>
          </li>
          <li>
            <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
            <span>
              Weaviate agent for monitoring, support,<br></br> and
              troubleshooting
            </span>
          </li>
        </div>
        <br />
        <br />
      </Link>
      <div className={`${styles.box} ${styles.smallBox} `}>
        <div className={styles.title}>
          <h3>Best of</h3>
        </div>
        <hr></hr>
        <div className={styles.benefitsBox}>
          <p>
            Building and prototyping with seamless scaling and flexible
            pay-as-you-go pricing.
          </p>
          <Link className={styles.boxLink} to="#contact-sales">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
