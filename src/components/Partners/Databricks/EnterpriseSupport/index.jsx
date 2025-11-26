import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function enterpriseSupport() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <div className={styles.header}>
          <h2>Build intuitive AI applications </h2>
          <p>
            Weaviate is an open source AI database that's used to power modern
            AI use cases like semantic and multimodal search and retrieval
            augmented generation (RAG). Integration with Databricks’ platform
            helps enterprises leverage the power of GenAI while ensuring data
            privacy.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>
              Embedding Models for Semantic Search
            </h4>

            <p className={styles.subTitle}>
              Perform semantic and hybrid search operations without the need for
              additional preprocessing or data transformation steps.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}> </div>
            <h4 className={styles.title}>Generative AI Models for RAG </h4>

            <p className={styles.subTitle}>
              Use Weaviate's efficient storage and fast retrieval capabilities
              with Databricks’ generative AI models to offer personalized and
              context-aware responses.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon3}> </div>
            <h4 className={styles.title}>
              Build end-to-end applications faster
            </h4>

            <p className={styles.subTitle}>
              With these integrations, you can speed up your development process
              and focus on creating new AI-driven features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
