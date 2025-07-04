import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function List() {
  return (
    <div className="container">
      <div className={styles.title}>
        <h2>What's next?</h2>
      </div>
      <div className={styles.box}>
        {/* coming soon <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon01}`}></div>
            <h3 className={styles.cardTextColor}>Weaviate Stacks</h3>
            <p className={styles.textCardContent}>
              Weave through the noise, quick battle tested stacks to build AI
              Apps.
            </p>
            <Link to="https://docs.weaviate.io/weaviate/roadmap#backlog">Learn More</Link>
          </div>
        </div> */}
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
            <h3 className={styles.cardTextColor}>AI Concepts</h3>
            <p className={styles.textCardContent}>
              Learn all the jargon, step into your AI era.
            </p>
            <Link to="/learn/knowledgecards">Learn More</Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
            <h3 className={styles.cardTextColor}>Documentation</h3>
            <p className={styles.textCardContent}>
              Find references for how to use Weaviate.
            </p>
            <Link to="https://docs.weaviate.io/weaviate">Learn More</Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
            <h3 className={styles.cardTextColor}>Academy</h3>
            <p className={styles.textCardContent}>
              Get guided courses on various topics.
            </p>
            <Link to="https://docs.weaviate.io/academy">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
