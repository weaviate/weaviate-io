import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function PriceList() {
  return (
    <div className={styles.priceBox}>
      <div className={`${styles.title} ${styles.supportTitle}`}>
        <div className={styles.titleBox}>
          <h3>Get the full pricing list for Enterprise Cloud</h3>
        </div>
        <p>
          Questions about pricing? Download the full Pricing list or{' '}
          <Link className={styles.underline} to="#contact-sales">
            contact our team
          </Link>{' '}
          for more info.
        </p>
      </div>

      <div className={styles.features}>
        <Link
          className={styles.supportLink}
          to="http://events.weaviate.io/pricing-download"
        >
          Request the Pricing List
        </Link>
      </div>
    </div>
  );
}
