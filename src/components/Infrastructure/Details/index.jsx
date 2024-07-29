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
          <h2>Infrastructure optimization with Weaviate</h2>
          <p>
            The ability to efficiently process and store large volumes of data
            is crucial for developing and deploying AI applications. But the
            compute resources required can get expensive fast. Optimize the cost
            of running AI-native workloads at scale. Build and operate more
            efficiently with a single vector database for all of your AI use
            cases.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Manage customer data securely</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Keep customer data private and improve operations. Isolate
                account or user-specific data to its own tenant.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Control infrastructure costs</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Allocate the right type of storage for the right data. Offload
                tenants to warm or cold storage and quickly access them as
                they’re needed. 
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Speed up data access</h2>
            </div>
            <div className={styles.typeText}>
              <p>Improve performance at any scale…. </p>
            </div>
          </div>
        </div>
        <div className={styles.boxesContainer}>
          <Link to="https://events.weaviate.io/hybrid-search-webinar">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceText}>
                <h2>Hot</h2>
                <p>Used for data accessed frequently.</p>
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
          <Link to="https://events.weaviate.io/hybrid-search-webinar">
            <div className={styles.serviceBox}>
              <div className={styles.serviceImage}></div>
              <div className={styles.serviceText}>
                <h2>Frozen</h2>
                <p>Used for data not needed at the time, slower to activate.</p>
                <ul>
                  <li> Not actively queryable or editable </li>
                  <li>Stored externally </li>
                  <li>
                    Ready to warm up / heat up – slower to restore (depending on
                    the external storage and data size){' '}
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
