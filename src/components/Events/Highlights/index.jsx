import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function HighlightPanel() {
  return (
    <div className={styles.bottomBar}>
      <p className={styles.topHeader}>
        Join us at conferences, meetups, webinars or workshops
      </p>
      <div className={styles.innerBar}>
        <div className={styles.eventBox}>
          <div className={`${styles.workshopImage} ${styles.daniel}`} />
          <div className={styles.eventText}>
            <p>WEBINAR</p>
            <span>
              Intro to Weaviate for<br></br>JavaScript Developers<br></br> with
              Daniel #01
            </span>
            <p>JAN 9th 2024 13:00-14:00 ET</p>
          </div>
        </div>

        <div className={styles.eventBox}>
          <div className={`${styles.workshopImage} ${styles.jp}`} />
          <div className={styles.eventText}>
            <p>MEETUP</p>
            <span>
              How to build an AI-Native<br></br>foundation for enterprise apps
            </span>
            <p>JAN 9th 2024 13:00-14:00 ET</p>
          </div>
        </div>

        <div className={styles.eventBox}>
          <div className={`${styles.workshopImage} ${styles.zain}`} />
          <div className={styles.eventText}>
            <p>ONLINE WORKSHOP</p>
            <span>
              How to build an AI-Native<br></br>foundation for enterprise apps
            </span>
            <p>JAN 9th 2024 13:00-14:00 ET</p>
          </div>
        </div>
      </div>
    </div>
  );
}
