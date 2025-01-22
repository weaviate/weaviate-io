import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Examples() {
  return (
    <div className={styles.bgCol} id="design">
      <div className="container">
        <div className={styles.header}>
          <h2>AI Database Design</h2>
          <p>
            "AI-native vs. AI-enabled database" and "What is an AI-native
            technology stack"
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
                <p>End-to-end code examples for builders.</p>
                <ul>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/recipes"
                    >
                      Python recipes
                    </Link>
                    : Integrations (DSPy, Llamalndex, etc.), Reranking, Search,
                    Multi-tenancy, and more
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/recipes-ts"
                    >
                      JS/TS recipes
                    </Link>
                    : Integrations (LangChain, etc.), Reranking, Search,
                    Multi-tenancy, and more
                  </li>
                </ul>
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
                    <Link
                      className={styles.external}
                      to="https://verba.weaviate.io/"
                    >
                      Verba:
                    </Link>{' '}
                    The Golden RAGtriever
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://healthsearch.weaviate.io/"
                    >
                      Healthsearch:
                    </Link>{' '}
                    Generative AI in Healthcare
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://awesome-moviate.weaviate.io/"
                    >
                      Awesome-moviate:
                    </Link>{' '}
                    A Movie Search Engine
                  </li>
                  <li>
                    <Link className={styles.external} to="/community/demos">
                      See more demos here
                    </Link>
                  </li>
                </ul>
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
              <div className={styles.integrations}>
                <ul>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/weaviate"
                    >
                      weaviate:
                    </Link>{' '}
                    The "core" database & web server
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/weaviate-python-client"
                    >
                      weaviate-python-client:
                    </Link>{' '}
                    Python client library
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/typescript-client"
                    >
                      typescript-client:
                    </Link>{' '}
                    TS/JS client library
                  </li>
                </ul>

                <ul>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/weaviate-go-client"
                    >
                      weaviate-go-client:
                    </Link>{' '}
                    Golang client library
                  </li>
                  <li>
                    <Link
                      className={styles.external}
                      to="https://github.com/weaviate/java-client"
                    >
                      java-client:
                    </Link>{' '}
                    Java client library
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
