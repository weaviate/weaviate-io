import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <header className={styles.headerSecurity}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>
            Thousands of companies rely on Weaviate to power their businesses
          </h2>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bento01}></div>
          <div className={styles.bento02}></div>
          <div className={styles.bento03}></div>
          <div className={styles.bento04}></div>
          <div className={styles.bento05}></div>
          <div className={styles.bento06}></div>
        </div>
      </div>
    </header>
  );
}
