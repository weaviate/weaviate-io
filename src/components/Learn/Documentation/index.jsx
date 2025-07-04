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
          <p>How-tos, concepts, guides, and technical references.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <Link
              className={styles.linkBox}
              to="https://docs.weaviate.io/weaviate/model-providers"
            >
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={styles.homeIcon}></div>
                  <h2>Model provider integrations</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>
                      With AWS, Cohere, Google, Hugging Face, OpenAI & more
                    </small>
                  </p>
                </div>
              </div>
            </Link>
            <Link
              className={styles.linkBox}
              to="https://docs.weaviate.io/weaviate/configuration"
            >
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.blog}`}></div>
                  <h2>How-to: Configure</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>
                      Configure Weaviate to suit your specific needs
                    </small>
                  </p>
                </div>
              </div>
            </Link>
            <Link className={styles.linkBox} to="https://docs.weaviate.io/weaviate/search">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.blog}`}></div>
                  <h2>How-to: Search</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>
                      Perform the right queries to find the data you want
                    </small>
                  </p>
                </div>
              </div>
            </Link>
            <Link
              className={styles.linkBox}
              to="https://docs.weaviate.io/weaviate/manage-data"
            >
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.blog}`}></div>
                  <h2>How-to: Manage data</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>Manage collections & data</small>
                  </p>
                </div>
              </div>
            </Link>
            <Link className={styles.linkBox} to="https://docs.weaviate.io/weaviate/concepts">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.starter}`}></div>
                  <h2>Docs: Concepts</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>Key features and ideas explained</small>
                  </p>
                </div>
              </div>
            </Link>
            <Link className={styles.linkBox} to="https://docs.weaviate.io/weaviate/api">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div
                    className={`${styles.homeIcon} ${styles.references}`}
                  ></div>
                  <h2>Docs: API References</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>REST, GraphQL and gRPC API details</small>
                  </p>
                </div>
              </div>
            </Link>
            <Link
              className={styles.linkBox}
              to="https://docs.weaviate.io/weaviate/client-libraries"
            >
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div
                    className={`${styles.homeIcon} ${styles.references}`}
                  ></div>
                  <h2>Docs: Client libraries</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    <small>
                      Client-specific information (Python, TS/JS, Go, Java)
                    </small>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
