import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Weaviate picks</h2>
        <p>
          Check out our favorite Weaviate projects! We've hand picked the best
          to showcase AI innovation and creativity.
        </p>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}></div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>Name Project</p>
              <p>Short Description</p>
              <Link to="https://weaviate.io/slack">Build with Weaviate</Link>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3></h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>Name Project</p>
              <p>Short Description</p>
              <Link to="https://weaviate.io/slack">Build with Weaviate</Link>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3></h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>Name Project</p>
              <p>Short Description</p>
              <Link to="https://weaviate.io/slack">Build with Weaviate</Link>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3></h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>Name Project</p>
              <p>Short Description</p>
              <Link to="https://weaviate.io/slack">Build with Weaviate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
