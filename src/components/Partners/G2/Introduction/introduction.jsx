import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function introduction() {
  return (
    <div className={styles.investorsContainer}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.investorBox}>
            <h1>
              Help us <span>spread the word</span>,<br></br> get a free t-shirt!
            </h1>

            <p>
              We’re a small company with big dreams and a large community that
              uses our technology to run the world’s best AI apps.
            </p>
            <p>
              We want to get our vector database into the hands of developers
              across the world, and we need your help to make it happen.
            </p>
            <p>
              Peer review sites like G2 allow you to share what you love about
              Weaviate with people who are looking for a better vector database.
              With your support we can make Weaviate the best it can be, and
              give more developers the AI-native database they deserve.
            </p>
          </div>
          <div className={styles.investorLogos}>
            <div className={styles.g2Diagram}></div>
          </div>
        </div>
      </div>
      <div className={styles.alertBox}>
        <p>
          You have to submit a review and complete the form below to ensure that
          you get your limited edition Weaviate shirt!
        </p>
      </div>
    </div>
  );
}
