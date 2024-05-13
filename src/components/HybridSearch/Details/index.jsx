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
          <h2>Hybrid Search with Weaviate</h2>
          <p>
            While vector search is fundamental for AI-powered applications,
            traditional keyword search is still important for use cases where
            precision matters. Hybrid search in Weaviate combines keyword (BM25)
            and vector search to leverage both exact term matching and semantic
            context. By merging results within the same system, developers can
            build intuitive search applications faster.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Search across all of your data</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Extract value from any data modality, including documents,
                images, audio files, and videos.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Simplify the development process</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Build and iterate faster with built-in vectorizer, multimodal,
                and multilingual models.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Manage embeddings efficiently</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Optimize performance and costs with filtering, multi-tenancy,
                and vector compression.
              </p>
            </div>
          </div>
        </div>
        <Link to="https://events.weaviate.io/hybrid-search-webinar">
          <div className={styles.serviceBox}>
            <div className={styles.serviceText}>
              {/*  <div className={styles.serviceIcon}></div> */}
              <span>Webinar</span>
              <h2>
                Beyond Vector Search: Taking a hybrid approach for better
                results
              </h2>

              <p>
                Discover the benefits of combining keyword and vector searches
                and implement hybrid search in your application.
              </p>
            </div>

            <div className={styles.serviceImage}></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
