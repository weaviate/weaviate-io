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
          <video width="720" height="400" controls title="Company video">
            <source
              src="/img/site/Austria_Video_Public_small.mp4"
              type="video/mp4"
            />
            <source src="/img/site/Austria_Video_Public.ogv" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
