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
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>
                By leveraging an AI-native stack, with an AI database at its
                core, organizations can create custom AI database management
                systems that reduce development complexity, improve application
                speeds, and optimize resource utilization. This architecture is
                particularly advantageous for applications requiring large-scale
                real-time AI operations, such as recommendation systems,
                intelligent search platforms, and{' '}
                <Link to="https://weaviate.io/blog/what-is-agentic-rag">
                  agentic AI
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
