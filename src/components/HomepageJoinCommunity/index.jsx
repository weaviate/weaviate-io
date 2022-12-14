import React from 'react';
import styles from './styles.module.scss';

export default function HomepageJoinCommunity() {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h2>Join the global community</h2>
          <p>Ask questions, get inspired, or just say Hi.</p>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.socialBox}>
            <div className={styles.slack} />
            <p className={styles.text}>Slack</p>
          </div>
          <div className={styles.socialBox}>
            <div className={styles.github} />
            <p className={styles.text}>GitHub</p>
          </div>
          <div className={styles.socialBox}>
            <div className={styles.twitter} />
            <p className={styles.text}>Twitter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
