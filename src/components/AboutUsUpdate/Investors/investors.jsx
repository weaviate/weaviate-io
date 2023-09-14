import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Investors({ selectedType, handleSelected }) {
  return (
    <div className={styles.investorsContainer}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.investorBox}>
            <h2>Our investors</h2>

            <p>
              Thanks for your interest in our journey to bring AI Native vector
              database infrastructure to developers and operators (DevOps /
              MLOps) all over the world. We are a company backed by Index
              Ventures, Battery Ventures, New Enterprise Associates, Cortical
              Ventures, Zetta Venture Partners, ING Ventures, GTM-fund, Scale
              Asia Ventures, and Alex van Leeuwen.
            </p>
            <div className={styles.investorButton}>
              <Link
                className={styles.pricingButton}
                to="https://console.weaviate.cloud/"
              >
                Login to the Weaviate Cloud console
              </Link>
            </div>
          </div>
          <div className={styles.investorLogos}>
            <Link
              className={styles.pricingButton}
              to="https://console.weaviate.cloud/"
            >
              Login to the Weaviate Cloud console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
