import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HybridBusinessCritical() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Weaviate Cloud Services Hybrid Saas</h2>
        <p>
          Our pricing is designed to give you all the capabilities to build and
          test your applications for free. <br /> When you are ready to move to
          production, simply pick a plan that best suits your needs.
        </p>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>Business Critical</h3>
        </div>
        <div className={styles.grid}>
          <div className={styles.features}>
            <li>
              <div className={styles.checkIcon}></div>
              <span>custom pricing</span>
            </li>
            <li>
              <div className={styles.checkIcon}></div>{' '}
              <span>AWS, Azure, GCP</span>
            </li>
            <li>
              <div className={styles.checkIcon}></div>
              <span>∞ lifetime (until terminated)</span>
            </li>
          </div>
          <div className={styles.features}>
            <li>
              <div className={styles.checkIcon}></div>
              <span>
                Severity 1 - max 1h <br /> Severity 2 - max 4h <br /> Severity 3
                - max 1bd
              </span>
            </li>
            <li>
              <div className={styles.checkIcon}></div> <span>Monitoring</span>
            </li>
            <li>
              <div className={styles.checkIcon}></div> <span>Always on</span>
            </li>
          </div>
          <div className={styles.features}>
            <li>
              <div className={styles.checkIcon}></div>
              <span>Weaviate Internal Slack or Teams / Email</span>
            </li>
            <li>
              <div className={styles.checkIcon}></div> <span>Multi AZ</span>
            </li>
            <li>
              <div className={styles.checkIcon}></div> <span>HA optional</span>
            </li>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonGradient} to="#contact-sales">
          Register for Hybrid SaaS
        </Link>
      </div>
    </div>
  );
}
