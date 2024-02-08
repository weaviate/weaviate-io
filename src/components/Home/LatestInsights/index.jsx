import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';
import posts from '/data/blogposts.json';
import BlogItem from './blogItem';

export default function HomepageLatestInsights() {
  const option2Data = posts.blog;
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Insights</h2>
        <p className={styles.subtitle}>
          Learn and explore the latest insights and trends in the AI world.
        </p>
      </div>
      <div className={styles.latestModule}>
        {option2Data.map((post) => {
          return <BlogItem key={post.tagline} details={post} />;
        })}
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonGradient} to="/blog">
          Go to Blog
        </Link>
        <Link className={styles.buttonOutline} to="/community/events">
          Go to Workshops
        </Link>
      </div>
    </div>
  );
}
