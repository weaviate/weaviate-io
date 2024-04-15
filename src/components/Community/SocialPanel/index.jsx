import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Heroes are Community Role Models</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.img} ${styles.starImg}`} />
            <h2>Embracing Community Values</h2>
          </div>
          <p>
            A Weaviate Hero acts like a real hero. They exemplify the best
            behavior, lead by example, and also support people to be their best
            selves and adhere to Weaviates{' '}
            <Link to="/service/code-of-ethics-and-professional-conduct">
              Community Code of Conduct
            </Link>
            .
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.img} ${styles.trustImg}`} />
            <h2>Culture first</h2>
          </div>
          <p>
            Our Heroes are kind, open and inclusive. They are approachable and
            support community members to grow by engaging with them on different
            levels.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.img} ${styles.friendImg}`} />
            <h2>Sharing is Caring</h2>
          </div>
          <p>
            Weaviate Heroes learn and share their knowledge and provide feedback
            that can contribute to the development and growth of our Community,
            it's members, the Hero Program, and Weaviate.
          </p>
        </div>
      </div>
    </div>
  );
}
