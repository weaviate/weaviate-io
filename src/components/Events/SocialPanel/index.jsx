import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Community Highlights</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <TwitterTweetEmbed
            onLoad={function noRefCheck() {}}
            options={{
              height: 300,
              hideCard: false,
              hideThread: false,
              width: 400,
            }}
            tweetId="933354946111705097"
          />
        </div>

        <div className={styles.card}>
          <TwitterTweetEmbed
            onLoad={function noRefCheck() {}}
            options={{
              height: 300,
              hideCard: false,
              hideThread: false,
              width: 400,
            }}
            tweetId="933354946111705097"
          />
        </div>
        <div className={styles.card}>
          <TwitterTweetEmbed
            onLoad={function noRefCheck() {}}
            options={{
              height: 300,
              hideCard: false,
              hideThread: false,
              width: 400,
            }}
            tweetId="933354946111705097"
          />
        </div>
        <div className={styles.card}>
          <TwitterTweetEmbed
            onLoad={function noRefCheck() {}}
            options={{
              height: 300,
              hideCard: false,
              hideThread: false,
              width: 400,
            }}
            tweetId="933354946111705097"
          />
        </div>

        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="#jobs">
            Join the X Community
          </Link>
        </div>
      </div>
    </div>
  );
}
