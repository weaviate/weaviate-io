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
            <span>AGENTIC WORKFLOWS</span>
            <h1>Give AI agents the real-time context they need.</h1>
            <p>
              Build and scale reliable AI agents and agentic workflows with
              contextual knowledge that informs actions.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Start for Free
              </Link>
              <Link className={styles.buttonOutline} to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
  );
}
