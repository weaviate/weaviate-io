import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed';

export default function HomepageLovedByDevelopers() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Loved by Developers</h2>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{' '}
          <br></br> eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className={styles.module}>
        <TwitterTweetEmbed
          options={{
            cards: 'hidden',
            hideCard: true,
            hideThread: false,
            maxWidth: 800,
            theme: 'dark',
            width: 300,
            conversation: 'none',
          }}
          tweetId={'1624058429584322560'}
        />

        <TwitterTweetEmbed
          options={{
            cards: 'hidden',
            hideCard: true,
            hideThread: false,
            maxWidth: 800,
            theme: 'dark',
            width: 300,
            conversation: 'none',
          }}
          tweetId={'1631317445326643201'}
        />
        <TwitterTweetEmbed
          options={{
            cards: 'hidden',
            hideCard: true,
            hideThread: false,
            maxWidth: 800,
            theme: 'dark',
            width: 300,
            conversation: 'none',
          }}
          tweetId={'1629383824395366402'}
        />
      </div>
    </div>
  );
}
