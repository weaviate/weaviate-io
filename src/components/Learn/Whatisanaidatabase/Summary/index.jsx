import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Summary() {
  return (
    <div className={styles.bgCol} id="summary">
      <div className="container">
        <div className={styles.header}>
          <h2>Capabilities to Look for in an AI Database</h2>
          <p>
            When selecting an AI database, it's important to evaluate
            capabilities that ensure scalability, performance, and integration
            with AI workflows will be suited to your needs. Below are key
            capabilities to consider.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>1. Vector Storage and Retrieval:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Efficient handling of high-dimensional vector embeddings,
                  optimized for large-scale vector storage with minimal query
                  latency.
                </p>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>2. Dynamic Indexing Techniques:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  The ability to choose or customize index types based on data
                  size and application requirements. Ex: HNSW (Hierarchical
                  Navigable Small World) for fast approximate nearest neighbor
                  (ANN) search and Flat Indexes for smaller datasets.
                </p>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>3. Hybrid Search:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Combination of vector-based semantic search and traditional
                  keyword search in a single query. Useful for balancing
                  semantic accuracy and factual precision.
                </p>
              </div>
            </div>

            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>4. Performance and Scalability:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Low-latency query execution even with large datasets and the
                  ability to distribute data and queries across multiple nodes
                  for horizontal scalability.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>5. Integration with AI Models and Ecosystem:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Direct support for popular machine learning frameworks like
                  LangChain, LlamaIndex, and Hugging Face; Compatibility with AI
                  model providers like OpenAI, Cohere, AWS, Azure; and built-in
                  vectorizers to automate the transformation of raw data into
                  embeddings.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>6. Data Flexibility:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Multi-modal capabilities to handle diverse data types such as
                  text, images, and audio.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>7. Data Compression and Optimization:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Techniques like vector quantization to reduce storage size
                  without compromising retrieval speed. Support for various
                  compression algorithms tailored to different datasets and use
                  cases.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>8. Security and Multi-Tenancy:</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Isolation of data across clients or projects through physical
                  or logical separation (multi-tenancy). Enterprise-grade
                  security features, including encryption, role-based access
                  control, and compliance with data residency requirements.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>9. Cost-Performance Optimization: </h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Flexible storage options (e.g., in-memory, on-disk, or cloud
                  storage) to balance performance and cost. Ability to offload
                  less frequently accessed data while maintaining real-time
                  performance for critical queries.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <h2>10. Ecosystem and Community Support: </h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Strong developer ecosystem with other AI database tools,
                  documentation, and community resources. Regular updates to
                  support new AI technologies and maintain compatibility with
                  evolving AI models and workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.header}>
          <p>
            Using an open-source AI database provides flexibility, transparency,
            and cost-effectiveness, allowing developers to customize and
            optimize it for specific use cases without vendor lock-in.
          </p>
        </div>
      </div>
    </div>
  );
}
