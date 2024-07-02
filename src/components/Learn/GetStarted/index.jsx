import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GetStarted() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Get Started</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels. We’re with you on your AI journey.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Quickstart guide</h2>
              </div>
              <div className={styles.typeText}>
                <p>See what you can do with Weaviate, in 20-30 minutes</p>
                <Link
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Live Online Workshops</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Live, <strong>introductory</strong> workshops for Weaviate
                  with code & key concepts
                </p>
                <Link
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.docs}`}></div>
              <h2>Docs: Starter guides</h2>
            </div>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>Short guides for common task types</p>
              <ul>
                <li>Connect to Weaviate</li>
                <li>Generative search (RAG)</li>
                <li>Which Weaviate is right for me?</li>
                <li>Schema (collection definitions)</li>
              </ul>
              <Link
                to="/docs/getting-started/quickstart"
                className={styles.button}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
