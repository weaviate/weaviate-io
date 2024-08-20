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
          <h2>A database to support all of your AI initiatives</h2>
          <p>
            AI use cases have diverse needs for usage patterns, data privacy,
            and performance. Weaviate’s flexible architecture adapts to various
            use cases, supporting more development teams across the AI journey.
          </p>
        </div>
        <div className={styles.topBoxContainer}>
          <div className={styles.topBoxes}>
            <h3>Real-time data access</h3>
            <p>
              Serve the fastest results for low-latency applications. Store and
              retrieve billions of objects with millisecond response times.{' '}
            </p>
          </div>
          <div className={styles.topBoxes}>
            <h3 className={styles.resource}>Efficient resource consumption</h3>
            <p>
              Scale vertically and horizontally while managing costs. Reduce
              memory footprint and adapt resource consumption to the needs of
              your application.
            </p>
          </div>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.dynamic}`}></div>
              <h2>Dynamic indexing</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Leverage HNSW or flat indexing techniques based on speed and
                scale needs.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Advanced filtering</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Apply complex filters for precise results without comprising
                speed.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.vector}`}></div>
              <h2>Vector compression</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Leverage Product, Binary, and Scalar Quantization to improve
                memory footprint and performance.
              </p>
            </div>
          </div>

          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.native}`}></div>
              <h2>Native multi-tenancy</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Isolate and secure customer data and make database operations
                more efficient.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Flexible storage tiers </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Choose between hot, warm, and cold storage to align consumption
                with the needs of your use case.
              </p>
            </div>
          </div>

          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.tenant}`}></div>
              <h2>Tenant management</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Offload tenants to cold storage to reduce costs. Warm them up
                quickly when they become active.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteBox}>
            <em>
              “If the results aren’t accurate or take too long to surface, a
              human needs to get involved, and the cost savings are greatly
              reduced. So accuracy and speed are critical for us.”
            </em>
            <p>
              {' '}
              -- Shaunak Godbole, Head of Infrastructure Engineering at
              Instabase
            </p>
          </div>
          <div className={styles.quoteBox}>
            <em>
              "Weaviate’s scalable multi-tenant architecture has been crucial in
              maintaining fast and reliable AI-driven customer service and
              engagement experiences for our thousands of users on Botsonic,"
            </em>
            <p> -- Samanyou Garg, CEO of Writesonic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
