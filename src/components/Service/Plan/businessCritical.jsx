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
        <p>We manage everything for you in the Weaviate Cloud.</p>
      </div>
      <hr></hr>
      <div className={styles.features}>
        <li>
          <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
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
    </div>
  );
}
