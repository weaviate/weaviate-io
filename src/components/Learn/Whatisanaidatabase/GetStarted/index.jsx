import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GetStarted() {
  return (
    <div className={styles.bgCol} id="what-is-an-ai-database">
      <div className="container">
        <div className={styles.header}>
          <h2>What is an AI Database?</h2>
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>
                In the age of AI, vector embeddings have become the de facto
                data type, and a new class of AI databases has emerged to
                support them. An AI database is a specialized data management
                system built to handle the unique demands of AI applications,
                large language models (LLMs), and machine learning (ML)
                algorithms. Traditional databases are not optimized to store and
                retrieve vector embeddings or simplify the development of modern
                AI applications, though some have added vector-based storage.
                We’ll explain the difference between “AI-native” and
                “AI-enabled” options below.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
