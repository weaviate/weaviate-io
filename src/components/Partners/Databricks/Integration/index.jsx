import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function Integration() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Weaviate and Databricks integration</h2>
          <p>
            Weaviate is an open source vector database that's used to power
            modern AI use cases like semantic and multimodal search and
            retrieval augmented generation (RAG). Integration with Databricks’
            platform helps enterprises leverage the power of GenAI while
            ensuring data privacy.
          </p>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.diagram}></div>
        </div>
      </div>
    </div>
  );
}
