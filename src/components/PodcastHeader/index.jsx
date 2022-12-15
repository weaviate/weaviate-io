import React from 'react';
import styles from './styles.module.scss';

export default function PodcastHeader() {
  return (
    <div className="container">
      <h1>
        Weaviate <span className={styles.header}>Podcast</span>
      </h1>
      <p>
        Join Connor Shorten when he interviews Weaviate community users, leading
        machine learning experts, and explores Weaviate use cases from users and
        customers.
      </p>
    </div>
  );
}
