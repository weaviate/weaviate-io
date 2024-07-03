import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Examples() {
  return (
    <div className={styles.bgCol} id="code-examples">
      <div className="container">
        <div className={styles.header}>
          <h2>Code Examples</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels.<br></br> We’re with you on your AI journey.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Recipes</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Self-contained, end-to-end code examples for builders (PY & JS
                  only)
                </p>
                <ul>
                  <li>
                    Python: Integrations (DSPy, Llamalndex, ...), Reranking,
                    Search, Multi-tenancy, ...
                  </li>
                  <li>
                    JavaScript: Integrations (Llamalndex, ...), Reranking,
                    Search, Multi-tenancy, ...
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
                <div className={`${styles.homeIcon} ${styles.demos}`}></div>
                <h2>Demos</h2>
              </div>
              <div className={styles.typeText}>
                <p>Example projects and demo apps powered by Weaviate</p>
                <ul>
                  <li>Verba:</li>
                  <li>Project A:</li>
                  <li>Project B:</li>
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

          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.repos}`}></div>
              <h2>Weaviate repositories</h2>
            </div>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>We are proudly open source! Here are our key repositories</p>
              <div className={styles.intergrations}>
                <ul>
                  <li>weaviate: The "core" database & web server</li>
                  <li>weaviate-python-client: Python SDK</li>
                  <li>typescript-client: TS/JS SDK</li>
                </ul>
                <ul>
                  <li>weaviate-go-client: Go(lang) SDK</li>
                  <li>java-client: Java SDK</li>
                </ul>
              </div>
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
  );
}
