import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Details() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Flexible storage tiers </h2>
        </div>

        <div className={styles.boxesContainer}>
          <Link to="">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
            </div>
          </Link>
          <Link to="">
            <div className={styles.serviceBox}>
              <div className={`${styles.serviceImage} ${styles.warm}`}></div>
            </div>
          </Link>
          <Link to="">
            <div className={styles.serviceBox}>
              <div className={`${styles.serviceImage} ${styles.cold}`}></div>
            </div>
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="/pricing">
            Learn more about Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
