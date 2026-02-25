import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PodcastHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.headText}>Learn</p>

          <div className={styles.headerBox}>
            <h1>
              The <span className={styles.highlight}>Weaviate Podcast</span>
            </h1>

            <p>
              Join Connor Shorten as he interviews Weaviate community users,
              leading machine learning experts, and explores AI database
              innovation from real builders and customers.
            </p>
          </div>

          <div className={styles.buttons}>
            <LinkButton
              color="accent"
              link="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0"
            >
              Subscribe on YouTube
            </LinkButton>

            <LinkButton link="https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7">
              Open in Spotify
            </LinkButton>

            <LinkButton
              color="outlined"
              link="https://podcasts.apple.com/gb/podcast/weaviate-podcast/id1680897946"
            >
              Apple Podcasts
            </LinkButton>

            <LinkButton
              color="outlined"
              link="https://anchor.fm/s/cffc3468/podcast/rss"
            >
              RSS Feed
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
