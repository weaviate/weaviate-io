import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Analytics() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.title}>
          <h2>Maximize your reach with Weaviate</h2>
          <p>
            Leverage Weaviate’s reach and community engagement tactics to
            elevate your project.
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.dataBox}>
            <span>LinkedIn</span>
            <p className={styles.metrics}>190,000+</p>
            <p className={styles.metricsText}>Monthly impressions</p>
          </div>
          <div className={styles.dataBox}>
            <span>Twitter</span>
            <p className={styles.metrics}>300,000+</p>
            <p className={styles.metricsText}>Monthly impressions</p>
          </div>
          <div className={styles.dataBox}>
            <span>Website</span>
            <p className={styles.metrics}>100,000+</p>
            <p className={styles.metricsText}>Monthly visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
