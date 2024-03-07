import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PricingStandard() {
  return (
    <div className={styles.boxContainer}>
      <Link className={styles.box} to="services/serverless">
        <div className={styles.title}>
          <h3>Serverless</h3>
        </div>
        <div className={styles.price}>
          <p>We manage everything for you in the Weaviate Cloud.</p>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Serverless SaaS deployment</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Based on # vectors and objects stored</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Pay-as-you-go, on consumption</span>
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
            Building and prototyping with seamless scaling and flexible
            pay-as-you-go pricing.
          </p>
          <Link className={styles.boxLink} to="services/serverless">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
