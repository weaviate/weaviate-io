import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PricingHeader({ selectedType, handleSelected }) {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1 className={styles.pricingHeader}>Weaviate Cloud</h1>
        <h3>The power of the open-source vector database, fully managed</h3>
        <p>
          Regardless of whether you are a startup wanting to get started with
          Weaviate in minutes (Serverless) or an enterprise user with specific
          deployment needs (BYOC), we are here to help with pricing models
          tailored to your needs.
        </p>
        {/* <div className={styles.buttons}>
          <Link
            className={styles.pricingButton}
            to="https://console.weaviate.cloud/"
          >
            Login to the Weaviate Cloud console
          </Link>
        </div> */}
      </div>
      <div className="container">
        <div className={styles.buttons}>
          <div
            className={`${styles.border} ${
              selectedType === 'serverless' ? styles.outline : null
            }`}
          >
            <div
              className={styles.btn}
              onClick={() => handleSelected('serverless')}
            >
              <div className={styles.saasPng} />
              <h1 className={styles.test}>Serverless</h1>
              <p className={styles.btnText}>
                We manage everything in the Weaviate Cloud
              </p>
              <div className={styles.logos}>
                <span className={styles.weaviate} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.border} ${
              selectedType === 'byoc' ? styles.outline : null
            }`}
          >
            <div className={styles.btn} onClick={() => handleSelected('byoc')}>
              <div className={styles.hybridPng} />
              <h1 className={styles.test}>Bring Your Own Cloud</h1>
              <p>We manage the data plane inside your customer-managed VPC</p>
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
