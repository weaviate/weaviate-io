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
              MLOps) all over the world.
            </p>
            <p>
              We are a company backed by <Link to="">Index Ventures</Link>,
              <Link to="">Battery Ventures</Link>,{' '}
              <Link to="">New Enterprise Associates</Link>,{' '}
              <Link to="">Cortical Ventures</Link>,
              <Link to="">Zetta Venture Partners</Link>,{' '}
              <Link to="">ING Ventures</Link>, <Link to="">GTM-fund</Link>,{' '}
              <Link to="">Scale Asia Ventures</Link>, and{' '}
              <Link to="">Alex van Leeuwen</Link>.
            </p>
            <p>
              <strong>Find more information about us:</strong>
            </p>
            <div className={styles.investorButton}>
              <Link
                className={styles.pricingButton}
                to="https://console.weaviate.cloud/"
              >
                Crunchbase
              </Link>
              <Link
                className={styles.boardButton}
                to="https://console.weaviate.cloud/"
              >
                Board & Advisors
              </Link>
            </div>
          </div>
          <div className={styles.investorLogos}>
            <div className={styles.investorDiagram}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
