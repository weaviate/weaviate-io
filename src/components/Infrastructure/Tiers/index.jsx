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
          <Link to="https://events.weaviate.io/hybrid-search-webinar">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceText}>
                <h2>Hot</h2>
                <p>Used for data accessed frequently.</p>
                <span className={styles.tierIcon}>Memory</span>
                <hr></hr>
                <ul>
                  <li>High QPS (query per second)</li>
                  <li>Fast queries</li>
                  <li>Capable of many updates – without affecting QPS</li>
                </ul>
              </div>
            </div>
          </Link>
          <Link to="https://events.weaviate.io/hybrid-search-webinar">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceText}>
                <h2>Warm</h2>
                <p>Used for data accessed less-frequently.</p>
                <span className={`${styles.warmTier} ${styles.tierIcon}`}>
                  SSD Drives
                </span>
                <hr></hr>
                <ul>
                  <li>Moderate QPS</li>
                  <li>Moderate query speed</li>
                  <li>
                    Moderate no of updates – too many updates might affect QPS
                  </li>
                </ul>
              </div>
            </div>
          </Link>
          <Link to="https://events.weaviate.io/hybrid-search-webinar">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceText}>
                <h2>Cold</h2>
                <p>
                  Used for data not needed at the time, but fast to activate.
                </p>
                <span className={`${styles.cloudTier} ${styles.tierIcon}`}>
                  {' '}
                  Cloud
                </span>

                <hr></hr>
                <ul>
                  <li> Not actively queryable or editable</li>
                  <li>
                    Ready to warm up / heat up – relatively fast/moderate
                    (depending on the size)
                  </li>
                  <li>Stored locally</li>
                </ul>
              </div>
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
