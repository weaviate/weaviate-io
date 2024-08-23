import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Documentation() {
  return (
    <div className={styles.bgCol} id="documentation">
      <div className="container">
        <div className={styles.header}>
          <h2>Documentation</h2>
          <p>
            How-tos, concepts, guides, and technical references
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Docs: Integration guides</h2>
              </div>
              <div className={styles.typeText}>
                <p>How to use Weaviate with various Al model providers</p>
                <div className={styles.integrations}>
                  <p>AWS</p>
                  <p>Cohere</p>
                  <p>Google</p>
                  <p>Hugging Face</p>
                  <p>OpenAl</p>
                  <p>Mistral</p>
                  <p>Anyscale</p>
                  <p>VoyageAl</p>
                </div>
                <Link
                  to="/developers/weaviate/model-providers"
                  className={styles.button}
                >
                  Model provider integrations pages
                </Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.starter}`}></div>
                <h2>Docs: Concepts</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  In-depth explanations of key features and ideas that power Weaviate
                </p>
                <ul>
                  <li>
                    <strong>Data structures</strong> explained for
                    collections and tenants
                  </li>
                  <li>
                    <strong>Vector indexing</strong> helps perform
                    fast and effective searches
                  </li>
                  <li>
                    <strong>Compression</strong> reduces resource usage with
                    minimal loss of search quality
                  </li>
                </ul>

                <Link
                  to="/developers/weaviate/concepts"
                  className={styles.button}
                >
                  All concepts pages
                </Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.howtos}`}></div>
                <h2>Docs: How-Tos</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Concise snippets to help you perform specific tasks
                </p>
                <ul>
                  <li>
                    <strong>Install:</strong> with Docker, Kubernetes, ...
                  </li>
                  <li>
                    <strong>Connect:</strong> to Weaviate
                  </li>
                  <li>
                    <strong>Manage data:</strong> Manage collections & data
                  </li>
                  <li>
                    <strong>Search:</strong> find the data you want
                  </li>
                  <li>
                    <strong>Configure:</strong> Weaviate and its features
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div
                  className={`${styles.homeIcon} ${styles.references}`}
                ></div>
                <h2>Docs: References</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Detailed feature and API information
                </p>
                <ul>
                  <li>
                    <strong> API references:</strong> REST, GraphQL, gRPC
                  </li>
                  <li>
                    <strong>Configuration:</strong> Collection definitions, data types, environment variables, ...
                  </li>
                  <li>
                    <strong> Client libraries:</strong> Python, TypeScript / JavaScript, Go, Java
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
