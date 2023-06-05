import React from 'react';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PodcastHeader() {
  return (
    <div className="container">
      <h1 className="page-title">
        Weaviate <span className="highlight">Podcast</span>
      </h1>
      <p>
        Join Connor Shorten as he interviews Weaviate community users, leading
        machine learning experts, and explores Weaviate use cases from users and
        customers.
      </p>
      <ButtonContainer position="left">
        <LinkButton
          color="accent"
          link="https://www.youtube.com/playlist?list=PLTL2JUbrY6tW-KOQfOek8dtUmPgGQj3F0"
        >
          Subscribe to the YouTube Channel <i className="fab fa-youtube"></i>
        </LinkButton>
        <LinkButton link="https://open.spotify.com/show/4TlG6dnrWYdgN2YHpoSnM7">
          Open in Spotify <i className="fab fa-spotify"></i>
        </LinkButton>
        <LinkButton
          color="outlined"
          link="https://podcasts.apple.com/gb/podcast/weaviate-podcast/id1680897946"
        >
          Apple Podcasts <i class="fa-solid fa-podcast"></i>
        </LinkButton>
        <LinkButton
          color="outlined"
          link="https://anchor.fm/s/cffc3468/podcast/rss"
        >
          Weaviate RSS feed <i className="fa-solid fa-square-rss"></i>
        </LinkButton>
      </ButtonContainer>
    </div>
  );
}
