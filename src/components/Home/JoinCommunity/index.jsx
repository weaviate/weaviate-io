import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function HomepageJoinCommunity() {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <h2>
            Join the global <br /> community
          </h2>
          <p>Ask questions, get inspired, or just say Hi.</p>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.socialBox}>
            <Link to="https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw">
              <div className={styles.slack} />
              <p className={styles.text}>Slack</p>
            </Link>
          </div>
          <div className={styles.socialBox}>
            <Link to="https://github.com/weaviate/weaviate">
              <div className={styles.github} />
              <p className={styles.text}>GitHub</p>
            </Link>
          </div>
          <div className={styles.socialBox}>
            <Link to="https://twitter.com/weaviate_io">
              <div className={styles.twitter} />
              <p className={styles.text}>Twitter</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
