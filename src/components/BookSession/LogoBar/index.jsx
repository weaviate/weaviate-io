import React from 'react';
import styles from './styles.module.scss';

export default function LogosBar() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className={styles.kicker}>
          Trusted by engineers at leading companies:
        </p>
        <div className={styles.grid}>
          <div
            className={`${styles.logo} ${styles.logoAkamai}`}
            aria-label="Akamai"
          />
          <div
            className={`${styles.logo} ${styles.logoAMD}`}
            aria-label="AMD"
          />
          <div
            className={`${styles.logo} ${styles.logoBumble}`}
            aria-label="Bumble"
          />
          <div
            className={`${styles.logo} ${styles.logoCisco}`}
            aria-label="Cisco"
          />
          <div
            className={`${styles.logo} ${styles.logoFactset}`}
            aria-label="Factset"
          />
          <div
            className={`${styles.logo} ${styles.logoVW}`}
            aria-label="Volkswagen"
          />
          <div
            className={`${styles.logo} ${styles.logoMore}`}
            aria-label="and many more…"
          />
        </div>
      </div>
    </section>
  );
}
