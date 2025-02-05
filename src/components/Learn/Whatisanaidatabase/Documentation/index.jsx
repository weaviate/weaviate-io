import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Documentation() {
  return (
    <div className={styles.bgCol} id="tools">
      <div className="container">
        <div className={styles.header}>
          <h2>AI Database Tools</h2>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>AI-native: Purpose-built vector databases</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  AI-native vector databases are purpose-built to handle
                  large-scale AI workloads efficiently. These databases offer
                  high-performance indexing (e.g., HNSW),{' '}
                  <Link to="https://weaviate.io/blog/hybrid-search-explained">
                    hybrid search
                  </Link>
                  , and seamless integration with machine learning models,
                  making them ideal for scalable and mission-critical AI
                  applications.
                </p>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>AI-enabled: Search libraries</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  On the other hand, search libraries like FAISS, Annoy, and
                  ScaNN provide vector search capabilities but lack persistence,
                  distributed infrastructure, and data management, often
                  requiring significant engineering to scale.
                </p>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>
                  AI-enabled: Traditional databases with vector extensions{' '}
                </h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Plugins and extensions for traditional databases allow
                  organizations to add vector functionality to existing systems.
                  While this integration of AI and databases can be convenient,
                  they can face performance limitations at scale. In addition,
                  some data warehouses provide AI-friendly analytics
                  capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
