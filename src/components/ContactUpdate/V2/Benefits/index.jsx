import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Benefits() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.bentoBar}>
          <div className={styles.bentoGrid}>
            <div className={styles.topHeader}>
              <span>why build with weaviate</span>
              <h2>
                More than just a vector database —a launchpad for AI innovation
              </h2>
            </div>
            <div className={styles.iconGallery}>
              <div className={styles.iconBox}>
                <div className={styles.title}>
                  <div className={styles.icon}></div>
                  <h3>AI-native developer experience</h3>
                </div>
                <span>
                  Save time building with native hybrid search, multi-tenancy,
                  and AI workflows.
                </span>
              </div>
              <div className={styles.iconBox}>
                <div className={styles.title}>
                  <div className={styles.icon}></div>
                  <h3>Open source with flexible deployment</h3>
                </div>
                <span>
                  Deploy in our cloud, your cloud, or self-host on-prem with
                  enterprise support.
                </span>
              </div>
            </div>
            <div className={styles.iconGallery}>
              <div className={styles.iconBox}>
                <div className={styles.title}>
                  <div className={styles.icon}></div>
                  <h3>Cost-performance optimization</h3>
                </div>
                <span>
                  Tune indexing technique, compression type, and storage tier
                  for your needs.
                </span>
              </div>
              <div className={styles.iconBox}>
                <div className={styles.title}>
                  <div className={styles.icon}></div>
                  <h3>Agents & embeddings</h3>
                </div>
                <span>
                  Leverage cloud services for agentic data tasks and embedding
                  creation.
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bentoGrid}>
            <div className={styles.bento00}>
              <div className={styles.bentoImage}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
