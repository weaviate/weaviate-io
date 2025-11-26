import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { ButtonContainer, LinkButton } from '/src/theme/Buttons';

export default function PricingHeader() {
  return (
    <header className={styles.header} role="banner">
      <div className="container">
        <div className={styles.box}>
          <h1 className={styles.title}>
            All the power of a <br />
            AI database, without the overhead
          </h1>

          <p className={styles.subtitle}>
            Flexible deployment options and pricing to meet the needs of every
            use case.
          </p>
        </div>
      </div>
    </header>
  );
}
