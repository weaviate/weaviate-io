import React from 'react';
import styles from './styles.module.scss';

export default function HomepageLearn() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Learn & get inspired</h2>
        <p>
          The sky is the limit to what you can do with Weaviate. Learn how to
          use Weaviate and see what people are building with it.
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.left}>
          <h3 className={styles.title}>
            Neural Magic
            <br /> in Weaviate
          </h3>
        </div>
        <div className={styles.middle}>
          <div className={styles.smallUp}>
            <h3 className={styles.title}>Vector Library vs Vector Database</h3>
          </div>
          <div className={styles.smallDown}>
            <h3 className={styles.title}>
              Weaviate + Jina AI for image search
            </h3>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.smallUp}>
            <h3 className={styles.title}>Backup and Restore in Weaviate</h3>
          </div>
          <div className={styles.smallDown}>
            <h3 className={styles.title}> What is vector search?</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
