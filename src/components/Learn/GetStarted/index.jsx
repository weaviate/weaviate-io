import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GetStarted() {
  return (
    <div className={styles.bgCol} id="get-started">
      <div className="container">
        <div className={styles.header}>
          <h2>Get Started</h2>
          <p>
            See what you can do with Weaviate through demos and hands-on guides.
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
                <p>Essential concepts demonstrated (20-30 minutes).</p>
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
                <p>Introductory workshops with an instructor (60 minutes).</p>
                <Link to="/community/events" className={styles.button}>
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
              <p>Roadmaps for important topics.</p>
              <ul>
                <li>Connect to Weaviate</li>
                <li>Generative search (RAG)</li>
                <li>Which Weaviate is right for me?</li>
                <li>Collection definitions & data schema</li>
                <li>Managing resources (hot, warm & cold)</li>
              </ul>
              <Link
                to="/developers/weaviate/starter-guides"
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
