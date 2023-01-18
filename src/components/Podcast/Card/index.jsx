import React from 'react';
import podcasts from '/data/podcasts.json';
import styles from './styles.module.scss';

export default function PodcastCard() {
  return (
    <div className="container">
      <div className={styles.boxWrapper}>
        {podcasts.map((podcast) => {
          if (!podcast) return null;
          return (
            <a
              key={podcast.date}
              className={styles.box}
              href={`https://www.youtube.com/watch?v=${podcast.youtube}`}
            >
              <div className={styles.left}>
                <img src={podcast.cover_image} alt="" />
              </div>
              <div className={styles.right}>
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                <div>{podcast.date}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
