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
          Install <Link to="#">Weaviate open source {'>'} </Link>
        </p>
        <p>
          or request access to the{' '}
          <Link className={styles.blue} to="#">
            Weaviate Cloud Services {'>'}{' '}
          </Link>
        </p>
      </div>
    </div>
  );
}
