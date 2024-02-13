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
          <h2>Build intuitive AI applications with less risk</h2>
          <p>
            Weaviate is an open source vector database that's used to power
            modern AI use cases like semantic and multimodal search and
            retrieval augmented generation (RAG). Integration with Snowflake’s
            platform helps enterprises leverage the power of GenAI while
            ensuring data privacy.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>
              Run Weaviate in Snowpark Container Services (SPCS)
            </h4>

            <p className={styles.subTitle}>
              Ensure all data operations, including embeddings and vector
              searches, remain within your secure environment.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}> </div>
            <h4 className={styles.title}>Connect your data with LLMs safely</h4>

            <p className={styles.subTitle}>
              Augment Large Language Models (LLMs) with your own data. Deliver
              reliable answers using built-in modules for Cohere, OpenAI, and
              more.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon3}> </div>
            <h4 className={styles.title}>
              Build end-to-end applications faster
            </h4>

            <p className={styles.subTitle}>
              Develop Python apps faster by integrating Weaviate and Streamlit.
              Create interactive interfaces using your data and ML models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
