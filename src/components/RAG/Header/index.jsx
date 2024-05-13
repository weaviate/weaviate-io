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
            <span>Retrieval Augmented Generation</span>
            <h1>Build secure, explainable generative AI applications</h1>
            <p>
              Reduce hallucination and make conversational applications more
              reliable, without compromising data privacy.
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
