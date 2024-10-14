import React from 'react';
import styles from './styles.module.scss';

export default function Video() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Our Company</h2>
          <p>
            Check out our video to learn more about Weaviate and our mission
            through the fantastic work we do for our customers, partners, and
            people.
          </p>
        </div>
        <div className={styles.techContainer}>
          <br></br>

          <iframe
            width="720"
            height="400"
            src="https://www.youtube.com/embed/NObCyVszHdo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; controls"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
