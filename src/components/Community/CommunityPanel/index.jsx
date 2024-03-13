import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Weaviate Hero Framework</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              CONTRIBUTIONS &<br></br>ENGAGEMENT
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>
                Community Members can contribute and engage across various
                channels and activities, like:
              </p>

              <ul>
                <li>Slack & Discourse Community</li>
                <li>GitHub </li>
                <li>In Person Events</li>
                <li>Livestreams & Podcasts</li>
                <li>Social Media</li>
                <li>Blogposts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.heroGraphic}></div>
          <div className={styles.cardHeader}>
            <h3>
              COLLABORATION &<br></br> CULTURE
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>
                Weaviate Heroes are role models for other community members.
                They build valuable relationships and collaborate across the
                community and play an integral part to grow and nurture
                Weaviate’s Community.
              </p>
              <p>
                They help make our Community a great and safe place for
                everyone.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              BENEFITS &<br></br>REWARDS
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>
                Weaviate Heroes can redeem awesome benefits and rewards, for
                example
              </p>

              <ul>
                <li>12 month hero membership</li>
                <li>Cool Merch, Books & Credits</li>
                <li>Dedicated channels</li>
                <li>Participation in Weaviate hosted and sponsored events</li>
                <li>Meet & greets</li>
                <li>And much more…</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              EDUCATION &<br></br>ELEVATION
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <div className={styles.textCardContent}>
              <p>
                We embrace Weaviate Heroes to accelerate and grow their skills
                and learning journey with dedicated educational material,
                activities and more :
              </p>
              <ul>
                <li>Special education workshops</li>
                <li>Internal roundtables with Weaviators</li>
                <li>Access to dedicated content & material</li>
                <li>Feature previews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link
          className={styles.buttonGradient}
          to="/blog/weaviate-community-hero"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
