import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Details() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>RAG with Weaviate</h2>
          <p>
            Retrieval Augmented Generation (RAG) enhances traditional search by
            using a Large Language Model (LLM) for summarizing answers, allowing
            users to retrieve relevant sources and receive responses in natural
            language. Vector databases like Weaviate, with features like vector
            or hybrid search, facilitate quick document retrieval and
            integration with LLMs, ensuring accurate and fast searches crucial
            for effective RAG applications.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Confidently reduce hallucinations</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Use proprietary data without sacrificing privacy - with
                citations to the source.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Build, experiment, and iterate faster</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Easily plug in different ML frameworks and models to find what
                suits your use case.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Power the AI apps of today and tomorrow</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Scale with a reliable, flexible, open source platform that
                adapts to your needs.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            {/*  <div className={styles.serviceIcon}></div> */}

            <h2>Verba: building an open source modular RAG</h2>

            <p>
              Simplifying RAG adoption - personalize, customize, and optimize
              with ease
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://verba.weaviate.io/"
              >
                Try Now
              </Link>
              <Link
                className={styles.buttonOutline}
                to="/blog/verba-open-source-rag-app"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.serviceImage}></div>
        </div>
      </div>
    </div>
  );
}
