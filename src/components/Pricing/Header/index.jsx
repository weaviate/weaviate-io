import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PricingHeader({ selectedType, handleSelected }) {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1><span className={styles.textGradient}>Weaviate</span> Cloud Services</h1>
        <h3>The power of the open-source vector database, fully managed</h3>
        <p>
          Start for free and only pay for the vector dimensions you store and
          query. Upgrade to one of our unlimited capacity plans starting at
          $0.05 per 1 million vector dimensions and scale seamlessly as your
          needs grow.
        </p>
      </div>
      <div className="container">
        <div className={styles.buttons}>
          <div
            className={`${styles.border} ${
              selectedType === 'saas' ? styles.outline : null
            }`}
          >
            <div className={styles.btn} onClick={() => handleSelected('saas')}>
              <div className={styles.saasPng} />
              <h1 className={styles.test}>SaaS</h1>
              <p>We manage everything in the​</p>
              <p>Weaviate Cloud</p>
              <div className={styles.logos}>
                <span className={styles.google} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.border} ${
              selectedType === 'hybrid' ? styles.outline : null
            }`}
          >
            <div
              className={styles.btn}
              onClick={() => handleSelected('hybrid')}
            >
              <div className={styles.hybridPng} />
              <h1 className={styles.test}>Hybrid SaaS</h1>
              <p>We manage the data plane</p>
              <p>inside your customer-managed VPC</p>
              <div className={styles.logos}>
                <span className={styles.google} />
                <span className={styles.aws} />
                <span className={styles.azure} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
