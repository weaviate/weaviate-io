import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, LinkButtonAccent, ButtonContainer } from '/src/theme/Buttons';

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
      <ButtonContainer position="left">
        <LinkButtonAccent
          link="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0"
        >
          Subscribe to the YouTube channel <i className="fab fa-youtube"></i>
        </LinkButtonAccent>
        <LinkButton
          link="https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7"
        >
          Open in Spotify <i className="fab fa-spotify"></i>
        </LinkButton>
      </ButtonContainer>
    </div>
  );
}
