import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Documentation() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Documentation</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels. We’re with you on your AI journey.
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
                <p>How Weaviate integrates with various Al model providers</p>
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
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.starter}`}></div>
                <h2>Docs: Starter guides</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Intermediate level workshops, or webinars with industry users
                </p>
                <ul>
                  <li>
                    <strong>Connect to Weaviate:</strong> Different ways to
                    connect to Weaviate
                  </li>
                  <li>
                    <strong>Generative search (RAG):</strong> A basic guide to
                    retrieval augmented generation
                  </li>
                </ul>

                <Link
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
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
                  Intermediate level workshops, or webinars with industry users
                </p>
                <ul>
                  <li>
                    <strong>Manage data:</strong> Manage collections, create
                    objects, read objects, migrate data, ...
                  </li>
                  <li>
                    <strong>Search:</strong> Basics, similarity, hybrid, image,
                    generative, reranking, filters, ...
                  </li>
                </ul>

                <Link
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
                </Link>
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
                  Intermediate level workshops, or webinars with industry users
                </p>
                <ul>
                  <li>
                    <strong> API references:</strong> Manage collections, create
                    objects, read objects, migrate data, ...
                  </li>
                  <li>
                    <strong>Configuration:</strong> ..
                  </li>
                </ul>

                <Link
                  to="/docs/getting-started/quickstart"
                  className={styles.button}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
