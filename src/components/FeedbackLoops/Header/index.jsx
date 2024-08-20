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
            <span>Generative Feedback Loops</span>
            <h1>Improve your dataset with generated content</h1>
            <p>
              Use data produced by generative models to enhance user experiences
              and automate manual tasks.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Start Free
              </Link>
              <Link className={styles.buttonOutline} to="/platform">
                Learn More
              </Link>
            </div>
          </div>
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
  );
}
