import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const featuredTags = [
  'concepts',
  'engineering',
  'integrations',
  'how-to',
  'release',
  'research',
  'search',
];

export default function FeaturedBlogTags() {
  return (
    <div className={styles.featuredTags}>
      <h3 className={styles.label}>Featured Tags:</h3>
      <div className={styles.tags}>
        {featuredTags.map((tag) => (
          <div className={styles.tag}>
            <a href={`/blog/tags/${tag}`}>
              {tag} <div className={`${styles.dot} ${styles[tag]}`}></div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
