import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PodcastHeader() {
  return (
    <div className="container">
      <h1>
        Weaviate <span className={styles.header}>Podcast</span>
      </h1>
      <p>
        Join Connor Shorten as he interviews Weaviate community users, leading
        machine learning experts, and explores Weaviate use cases from users and
        customers.
      </p>
      <div className={styles.buttons}>
        <Link
          className={styles.youtube}
          to="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0"
          target="_blank"
        >
          Subscribe to the YouTube channel <i className="fab fa-youtube"></i>
        </Link>
        <Link
          className={styles.spotify}
          to="https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7"
          target="_blank"
        >
          Open in Spotify <i className="fab fa-spotify"></i>
        </Link>
      </div>
    </div>
  );
}
