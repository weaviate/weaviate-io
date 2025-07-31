import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Guides() {
  return (
    <div className={styles.bgCol} id="examples">
      <div className="container">
        <div className={styles.header}>
          <h2>AI Database Examples</h2>
        </div>
        <div className={styles.boxContainer}>
          <div className={`${styles.typeBox} ${styles.big}`}>
            <div className={`${styles.typeText} ${styles.large}`}>
              <p>
                When building AI-driven applications, it’s essential for
                developers to understand the different options available for
                vector data storage and retrieval. Though{' '}
                <Link to="https://weaviate.io/blog/what-is-a-vector-database#:~:text=A%20vector%20database%2C%20on%20the,quickly%20at%20scale%20in%20production.">
                  vector database
                </Link>{' '}
                is becoming a broad category, the nuances between{' '}
                <Link to="https://weaviate.io/">AI-native databases</Link> A
                (like Weaviate), search libraries, and traditional databases
                with added vector stores can make all the difference in the
                performance and success of your application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
