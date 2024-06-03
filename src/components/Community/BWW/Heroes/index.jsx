import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Heroes() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.title}>
          <h2>Grow with Weaviate</h2>
          <p>
            Struggling to gain visibility for your AI project? Let us help you
            in boosting your projects and campaigns. Whether you're a project
            owner looking to maximize visibility or a showcase client aiming to
            make an impact on social media, our program equips you with the
            tools and support necessary for success.
          </p>
        </div>
        <div className={styles.box}>
          <Link to="https://x.com/tricalt/status/1769797227310948609">
            <div className={`${styles.growExample} ${styles.example2}`}></div>
          </Link>
          <Link to="https://www.linkedin.com/posts/amirhouieh_building-ai-starts-with-data-but-ours-is-activity-7168194941628719104-jyjZ?utm_source=share&utm_medium=member_desktop">
            <div className={styles.growExample}></div>
          </Link>
          <Link to="https://x.com/weaviate_io/status/1707032573698797741">
            <div className={`${styles.growExample} ${styles.example3}`}></div>
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonOutline} to="/community/bww/heroes">
            Get in contact
          </Link>
        </div>
      </div>
    </div>
  );
}
