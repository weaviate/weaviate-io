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
          <p>Go straight to the source and view these examples.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Recipes</h2>
              </div>
              <div className={styles.typeText}>
                <p>End-to-end code examples for builders.</p>
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
                  Weaviate recipes on GitHub
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
                  <li>
                    <Link to="https://verba.weaviate.io/">Verba:</Link> The
                    Golden RAGtriever
                  </li>
                  <li>
                    <Link to="https://healthsearch.weaviate.io/">
                      Healthsearch:
                    </Link>{' '}
                    Generative AI in Healthcare
                  </li>
                  <li>
                    <Link to="https://awesome-moviate.weaviate.io/">
                      Awesome-moviate:
                    </Link>{' '}
                    A Movie Search Engine
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

          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.repos}`}></div>
              <h2>Weaviate repositories</h2>
            </div>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>We are proudly open source! Here are our key repositories</p>
              <div className={styles.intergrations}>
                <ul>
                  <li>
                    <strong>weaviate:</strong> The "core" database & web server
                  </li>
                  <li>
                    <strong>weaviate-python-client:</strong> Python SDK
                  </li>
                  <li>
                    <strong>typescript-client:</strong> TS/JS SDK
                  </li>
                </ul>
                <ul>
                  <li>
                    <strong>weaviate-go-client:</strong> Go(lang) SDK
                  </li>
                  <li>
                    <strong>java-client:</strong> Java SDK
                  </li>
                </ul>
              </div>
              <Link to="https://github.com/weaviate" className={styles.button}>
                Weaviate repositories on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
