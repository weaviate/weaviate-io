import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Header() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <span>COST-PERFORMANCE optimization</span>
            <h1>AI infrastructure tailored to your use case</h1>
            <p>
              From real-time results to data isolation and cost management,
              optimize for what you need.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.buttonGradient} to="/pricing">
                View Pricing
              </Link>
            </div>
          </div>
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
  );
}
