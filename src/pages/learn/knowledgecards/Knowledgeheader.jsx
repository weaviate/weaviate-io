import Link from '@docusaurus/Link';
import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function KnowledgeHeader() {
  return (
    <div className={styles.knowledgeHeader}>
      <div className="container">
        <div className={styles.boxGrid}>
          <h1>Weaviate Knowledge Cards</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Unlock the power of vector search. Our guides will help you
              conquer vector embeddings and build better AI applications.
            </p>
            <div className={styles.buttons}>
              <Link
                to="/learn/knowledgecards"
                className={styles.buttonGradient}
              >
                Back to Knowledge Cards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
