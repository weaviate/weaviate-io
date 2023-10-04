import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className="container">
      <div className={styles.box}>
        <h1>We are hiring</h1>
        <h3>Join us and be part of the future of search</h3>
        <p>
          At Weaviate we are committed to our values - the foundation of <br />
          our company. They guide our decisions in ways that are <br />
          better for our people, our business, and the future.
        </p>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonGradient} to="#jobs">
          View Openings
        </Link>
        <Link className={styles.buttonOutline} to="#interview-process">
          Check our Hiring Process
        </Link>
      </div>
    </div>
  );
}
