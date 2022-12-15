import React from 'react';
import podcasts from '../../../static/data/podcasts.json';
import styles from './styles.module.scss';

export default function PodcastCard() {
  return (
    <div className="container">
      <div className={styles.boxWrapper}>
        {podcasts.map((podcast) => {
          if (!podcast) return null;
          return (
            <div key={podcast.date} className={styles.box}>
              <div className={styles.left}>image</div>
              <div className={styles.right}>
                <h6>{podcast.title}</h6>
                <p>{podcast.description}</p>
                <div>{podcast.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
