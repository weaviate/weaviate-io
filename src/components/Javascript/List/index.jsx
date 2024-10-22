import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function List() {
  return (
    <div className="container">
      <div className={styles.title}>
        <h2>Whats next?</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon01}`}></div>
            <h3 className={styles.cardTextColor}>Weaviate Stacks</h3>
            <p className={styles.textCardContent}>
              Weave through the noise, quick battle tested stacks to build AI
              Apps.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
            <h3 className={styles.cardTextColor}>AI Concepts</h3>
            <p className={styles.textCardContent}>
              Learn all the jargon, step into your AI era.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
            <h3 className={styles.cardTextColor}>Documentation</h3>
            <p className={styles.textCardContent}>
              Find references for how to use Weaviate.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
            <h3 className={styles.cardTextColor}>Academy</h3>
            <p className={styles.textCardContent}>
              Get guided courses on various topics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
