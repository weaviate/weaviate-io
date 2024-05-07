import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function SocialPanel() {
  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.title}>
          <h2>Weaviate projects</h2>
          <p>
            Discover the Latest AI Innovations: Dive into our comprehensive
            database showcasing diverse Community Projects and Show cases
            powered by Weaviate. Explore the forefront projects shaping the
            future landscape of artificial intelligence
          </p>
        </div>
        <div className={styles.box}></div>
      </div>
    </div>
  );
}
