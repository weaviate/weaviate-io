import React, { useState, useEffect } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Details() {
  return (
    <div className={styles.headerContent}>
      <div className={styles.typeContainer}>
        <div className={styles.typeBox}>
          <div className={styles.typeIcon}>
            <div className={styles.homeIcon}></div>
            <h2>Push the limits of search across large-scale data</h2>
          </div>
          <div className={styles.typeText}>
            <p>
              Combine the best of keyword and vector search in a single database
              for the most intuitive, efficient search. Scale up to 1B data
              objects.
            </p>
            <Link to="/hybrid-search">Learn more</Link>
          </div>
        </div>
        <div className={styles.typeBox}>
          <div className={styles.typeIcon}>
            <div className={styles.homeIcon}></div>
            <h2>Build AI applications with less hassle</h2>
          </div>
          <div className={styles.typeText}>
            <p>
              Simplify the development of chatbots, agents, and other generative
              AI applications with pluggable modules for vectorization and LLMs.
            </p>
            <Link to="/rag">Learn more</Link>
          </div>
        </div>
        <div className={styles.typeBox}>
          <div className={styles.typeIcon}>
            <div className={styles.homeIcon}></div>
            <h2>Focus on innovating, not managing</h2>
          </div>
          <div className={styles.typeText}>
            <p>
              Confidently deploy enterprise-ready applications with an
              extensible, fully-managed platform that can adapt to your needs.
            </p>
            <Link to="/gen-feedback-loops">Learn more</Link>
          </div>
        </div>
      </div>
      <div className={styles.serviceBox}>
        <div className={styles.serviceText}>
          <h2>Create your first cluster for free</h2>

          <p>
            The easiest way to get started with Weaviate Cloud - create an
            account, deploy and manage Weaviate instances effortlessly without
            worrying about infrastructure.
          </p>
          <p>
            <strong>Need help?</strong>
          </p>
          <p>
            Check{' '}
            <Link to="">
              our training courses, resources, and support options
            </Link>{' '}
            for builders of all levels. We're with you on your AI journey.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud"
            >
              Sign up
            </Link>
            <Link className={styles.buttonOutline} to="/services">
              Learn More
            </Link>
          </div>
        </div>

        <div className={styles.serviceImage}></div>
      </div>
    </div>
  );
}
