import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HybridBusinessCritical() {
  return (
    <div className={styles.bgColor}>
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
            <Link to="https://console.cloud.google.com/marketplace/product/weaviate-gcp-mktplace/weaviate?hl=en&project=clean-pen-427907-c5&invt=AbnfrQ&utm_source=website&utm_medium=button&utm_campaign=GCPMarketplace">
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
