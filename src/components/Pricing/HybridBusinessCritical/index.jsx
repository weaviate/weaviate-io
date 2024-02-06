import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '../Calculator';

export default function HybridBusinessCritical() {
  return (
    <div className={styles.bgColor}>
      <Calculator />
      <div className="container">
        <div className={styles.marketTitle}>
          <h2 className={styles.marketText}>
            Find Weaviate in leading Marketplaces:
          </h2>
        </div>
        <div className={styles.buttons}>
          <div className={styles.marketBox}>
            <div className={styles.logos}>
              <span className={styles.google} />
            </div>
            <p>Google Cloud Platform</p>
            <Link to="https://console.cloud.google.com/marketplace/product/mp-container-public/weaviate-gcp-k8s">
              {'Go to Marketplace >'}
            </Link>
          </div>
          <div className={styles.awsBox}>
            <div className={styles.logos}>
              <span className={styles.aws} />
            </div>
            <p>Amazon Web Services</p>
            <Link to="https://aws.amazon.com/marketplace/pp/prodview-cicacyv63r43i">
              {'Go to Marketplace >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <div className={styles.logos}>
              <span className={styles.azure} />
            </div>
            <p>Microsoft Azure</p>
            <Link to="#contact-sales">{'Contact us for more info >'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
