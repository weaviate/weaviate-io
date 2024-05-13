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
          <h2>Generative Feedback Loops with Weaviate</h2>
          <p>
            While <Link to="/hybrid-search">vector search</Link> and{' '}
            <Link to="/rag">RAG</Link> are popular AI use cases that many of our
            customers are moving to production with, we’re looking ahead to
            what’s next. Generative Feedback Loops take results generated from
            language models, vectorize them, and save them back into the
            database. This interaction between the models and dataset enables
            smarter automation of tasks like data cleaning and content creation.
          </p>
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Build on strong foundations</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Create trustworthy feedback loops using Weaviate-powered vector
                search and RAG under-the-hood
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Clean up your data with less work</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Automate the cleaning and organizing of existing data, such as
                adding tags or labels.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Deliver better user experiences </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Personalize insights and deliver better AI-generated content,
                faster.
              </p>
            </div>
          </div>
        </div>
        <Link to="/blog/hurricane-generative-feedback-loops">
          <div className={styles.serviceBox}>
            <div className={styles.serviceText}>
              <h2>
                Hurricane: Writing Blog Posts with Generative Feedback Loops
              </h2>

              <p>
                Learn how to enhance blog posts, from creating new content to
                editing and analyzing existing material with Generative Feedback
                Loops.
              </p>
            </div>

            <div className={styles.serviceImage}></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
