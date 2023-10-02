import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HybridBusinessCritical() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Bring Your Own Cloud</h2>
          <p>
            Our pricing is designed to give you all the capabilities to build
            and test your applications for free. <br /> When you are ready to
            move to production, simply pick a plan that best suits your needs.
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.title}>
            <h3>Unit Type</h3>
            <h3>Cost / Unit</h3>
          </div>
          <div className={styles.grid}>
            <div className={styles.features}>
              <p>CPU charge is based on the number of CPUs provisioned.</p>
              <hr className={styles.featuresLine}></hr>
            </div>
            <div className={`${styles.features} ${styles.priceCost}`}>
              <p>$0.003</p>
            </div>
            <div className={styles.features}>
              <p>Memory charge is based on total amount of GB provisioned.</p>
            </div>
            <div className={`${styles.features} ${styles.priceCost}`}>
              <p>$0.006</p>
            </div>
          </div>
        </div>
        <div className={styles.marketTitle}>
          <h2 className={styles.marketText}>
            Find Weaviate on leading Marketplaces:
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
<Link className={styles.buttonGradient} to="#contact-sales">
  Register for Hybrid SaaS
</Link>;
