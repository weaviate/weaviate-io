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
            Retrieval Augmented Generation (RAG) incorporates external knowledge
            into a Large Language Model (LLM) to improve the accuracy of
            AI-generated content. Weaviate's design caters specifically to the
            demands of vector data, enabling unparalleled scalability and
            performance. This scalability is key in RAG applications, where the
            volume of data and the need for rapid retrieval is significant.
            Weaviate maintains high performance at scale, ensuring that the LLMs
            are always fed with the most relevant and timely data.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Keep data safe within your own environment</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Weaviate can be self-hosted, or we can host and manage it for
                you within your own VPC environment.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Quickly integrate and test different LLMs</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Connect to different LLMs with a single line of code. Iterate
                quickly as you find what suits your use case.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Serve the best answers to your users </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Deliver accurate and contextual answers with powerful hybrid
                search under the hood.
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
                Give it a spin
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
