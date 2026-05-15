import React from 'react';
import HowItWorks from '../HowItWorks';
import Requirements from '../Requirements';
import styles from './styles.module.scss';

export default function StartupDealIntroSection() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <HowItWorks />
          </div>
          <div className={styles.right}>
            <Requirements />
          </div>
        </div>
      </div>
    </section>
  );
}
