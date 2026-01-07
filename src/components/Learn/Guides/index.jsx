import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Guides() {
  return (
    <div className={styles.bgCol} id="guided-courses">
      <div className="container">
        <div className={styles.header}>
          <h2>Guided Courses</h2>
          <p>Structured learning paths for Weaviate mastery.</p>
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.docs}`}></div>
              <h2>Weaviate Academy</h2>
            </div>

            <div className={`${styles.typeText} ${styles.large}`}>
              <p>End-to-end courses designed by the Weaviate team.</p>

              <div className={styles.featuredList}>
                <ul>
                  <strong>Featured units</strong>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/starter_text_data"
                    >
                      <strong>PY_101T</strong>: Work with text data
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/starter_custom_vectors"
                    >
                      <strong>PY_101V</strong>: Work with your own vectors
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/starter_multimodal_data"
                    >
                      <strong>PY_101M</strong>: Work with multimodal data
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/compression"
                    >
                      <strong>PY_250</strong>: Vector compression
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/multitenancy"
                    >
                      <strong>PY_280</strong>: Multi-tenancy
                    </Link>
                  </li>
                </ul>

                <ul>
                  <strong>Short units / theory</strong>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/standalone/which_search"
                    >
                      Which search is right for me?
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/py/standalone/chunking"
                    >
                      Chunking long texts
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://docs.weaviate.io/academy/deployment/k8s"
                    >
                      Run Weaviate on Kubernetes
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                to="https://docs.weaviate.io/academy"
                className={styles.button}
              >
                Go to <strong>Weaviate Academy</strong>
              </Link>
            </div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>External courses</h2>
              </div>
              <div className={styles.typeText}>
                <p>Courses created in conjunction with partners</p>
                <strong>Featured</strong>
                <ul>
                  <li>
                    <strong>DeepLearning.AI:</strong>{' '}
                    <Link
                      className={styles.external}
                      to="https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/"
                    >
                      Vector Databases: from Embeddings to Applications
                    </Link>
                  </li>
                  <li>
                    <strong>Linkedin Learning:</strong>{' '}
                    <Link
                      className={styles.external}
                      to="https://www.linkedin.com/learning/introduction-to-ai-native-vector-databases"
                    >
                      Introduction to AI Vector Databases
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Workshops & webinars</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Intermediate level workshops, or webinars with industry users
                </p>
                <ul>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://events.weaviate.io/hybrid-search-webinar"
                    >
                      Intro to Hybrid Search:
                    </Link>{' '}
                    Combining the power of keyword and vector search
                  </li>
                  <li>
                    <Link
                      className={`${styles.external} ${styles.bold}`}
                      to="https://events.weaviate.io/js-june-24"
                    >
                      Build AI apps with Weaviate's TypeScript client:
                    </Link>{' '}
                    Vue.js, React.js and Angular.js
                  </li>
                </ul>

                <Link to="/community/events" className={styles.button}>
                  More <strong>workshops & webinars</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <span>Live online workshop</span>
          <h2>Intro to building applications with Weaviate</h2>
          <div className={styles.innerCta}>
            <p>
              Learn why vector databases are great, how to create one with
              Weaviate, and how to use<br></br> it with real data, including a
              demo app and an end-to-end Jupyter notebook example.
            </p>
            <Link
              to="community/events#on-demand-webinars"
              className={styles.button}
            >
              Register for Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
