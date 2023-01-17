import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PricingHeader() {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1>
          <span className={styles.header}>Weaviate</span> Cloud Services
        </h1>
        <p>
          Start for <span className={styles.header}>free</span> and{' '}
          <span className={styles.header}>pay as you go</span> per{' '}
          <span className={styles.header}>vector dimension</span> stored and
          queried
        </p>
        <p>
          All paid plans deliver unlimited capacity over three different tiers,
          so your DBs may scale seamlessly
        </p>
        <p>
          Starting from <span className={styles.header}>$0.05</span> per{' '}
          <span className={styles.header}>1 million vector dimensions</span>
        </p>
      </div>
      <div className="container">
        <div className={styles.buttons}>
          <Link className={styles.btn} to="#register">
            Register for Private Beta
          </Link>
          <Link
            className={styles.btn}
            to="https://console.weaviate.io"
            target="_blank"
          >
            Create a free sandbox
          </Link>
        </div>
      </div>
    </div>
  );
}
