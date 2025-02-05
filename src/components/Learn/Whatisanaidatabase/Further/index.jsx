import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GoFurther() {
  return (
    <div className={styles.bgCol} id="go-further">
      <div className="container">
        <div className={styles.header}>
          <h2>Summary of AI Databases</h2>
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>
                <Link to="https://weaviate.io/blog/vector-embeddings-explained">
                  Vector embeddings
                </Link>{' '}
                have become the core data type driving applications powered by
                LLMs and machine learning algorithms. Traditional databases,
                though evolving with vector extensions, are not optimized to
                handle the complexity of modern AI workloads. This has led to
                the rise of AI-native vector databases, such as Weaviate, which
                provide purpose-built AI database solutions for large-scale
                vector storage, efficient retrieval, and hybrid search
                capabilities.
              </p>
              <p>
                Selecting the right AI database ultimately depends on your
                application’s scale, infrastructure, and performance needs. For
                enterprises prioritizing scalability and reliability, AI-native
                solutions like Weaviate provide a future-proof foundation to
                support evolving AI workflows.
              </p>
              <p>
                To learn more, read our ebook:{' '}
                <Link to="https://weaviate.io/ebooks/choosing-the-right-database-for-ai">
                  Choosing the Right Database for AI
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
