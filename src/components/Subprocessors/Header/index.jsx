import React from 'react';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header>
      <div className={styles.box}>
        <h1>List of Subprocessors</h1>
        <div className={styles.headerBox}>
          <p className="text-center">
            This page lists the subprocessors that we use to provide our
            services. Subprocessors are third-party data processors that we use
            to provide our services.
          </p>
        </div>
      </div>
    </header>
  );
}
