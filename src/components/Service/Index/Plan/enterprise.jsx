import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingEnterprise() {
  return (
    <div className={styles.boxContainer}>
      <Link className={styles.box} to="services/enterprise-dedicated">
        <div className={styles.title}>
          <h3>Enterprise Dedicated</h3>
        </div>
        <div className={styles.price}>
          <p>
            We manage everything for you in a dedicated instance in Weaviate
            Cloud Services (WCS).
          </p>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Dedicated resources for customer isolation</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Built for high-performance at large scale</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Customized to your requirements </span>
          </li>
        </div>
        <br />
        <br />
      </Link>
      <div className={`${styles.box} ${styles.smallBox} `}>
        <div className={styles.title}>
          <h3>Best for</h3>
        </div>
        <hr></hr>
        <div className={styles.benefitsBox}>
          <p>
            Deploying large-scale production use cases without the complexities
            of self-management.
          </p>
          <Link className={styles.boxLink} to="services/enterprise-dedicated">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
