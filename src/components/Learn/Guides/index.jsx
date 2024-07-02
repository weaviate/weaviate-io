import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Guides() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Guided Courses</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels. We’re with you on your AI journey.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.docs}`}></div>
              <h2>Weaviate Academy</h2>
            </div>

            <div className={`${styles.typeText} ${styles.large}`}>
              <p>
                End-to-end courses designed to accelerate your Weaviate learning
                journey
              </p>

              <ul>
                <p>Featured</p>
                <li>PY_101T: Work with text data</li>
                <li>PY_101V: Work with your own vectors</li>
                <li>PY_101M: Work with multimodal data</li>
                <li>PY_250: Vector compression</li>
              </ul>

              <ul>
                <p>Latest</p>
                <li>D_200: Run Weaviate on Kubernetes</li>
                <li>PY_220: Named vectors</li>
                <li>PY_250: Vector compression</li>
                <li>PY_920: Chunking long texts</li>
              </ul>

              <Link
                to="/docs/getting-started/quickstart"
                className={styles.button}
              >
                Learn More
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
                <ul>
                  <p>Featured</p>
                  <li>DeepLearning.ai: Course 1, Course 2</li>
                  <li>Linkedin Learning: Course 1, Course 2</li>
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
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Workshops & webinars</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Intermediate level workshops, or webinars with industry users
                </p>
                <ul>
                  <li>
                    Python: Integrations (DSPy, LlamaIndex, ...), Reranking,
                    Search, Multi-tenancy, ...
                  </li>
                  <li>
                    JavaScript: Integrations (LlamaIndex, ...), Reranking,
                    Search
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

        <div className={styles.ctaContainer}>
          <span>Free crash course</span>
          <h2>Intro to building applications with Weaviate</h2>
          <div className={styles.innerCta}>
            <p>
              Learn why vector databases are great, how to create one with
              Weaviate, and how to use<br></br> it with real data, including a
              demo app and an end-to-end Jupyter notebook example.
            </p>
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
  );
}
