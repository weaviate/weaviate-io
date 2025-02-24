import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <h1>Products</h1>
            <p>
              Our AI-native vector database ecosystem was designed to simplify
              development for AI builders
            </p>
            <div className={styles.buttons}>
              <Link className={styles.buttonGradient} to="#contact-sales">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
