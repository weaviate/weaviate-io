import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function HomepageReady() {
  return (
    <div className="container">
      <p className={styles.logo} />
      <h2 className={styles.title}>Ready to get started?</h2>
      <div className={styles.links}>
        <p>
          Follow the {' '}
          <Link to="/developers/weaviate/quickstart">
            Quickstart tutorial {'>'}{' '}
          </Link>
        </p>
        <p>
          or request access to the{' '}
          <Link className={styles.color} to="https://console.weaviate.cloud">
            Weaviate Cloud {'>'}{' '}
          </Link>
        </p>
      </div>
    </div>
  );
}
