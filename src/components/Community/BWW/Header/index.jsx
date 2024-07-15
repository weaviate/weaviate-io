import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <span>Showcases</span>
          <br></br>
          <h1>Build with Weaviate</h1>
          <div className={styles.headerBox}>
            <p>
              Did you built something cool with Weaviate?<br></br>Share it with
              us and let your work get noticed!
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonOutline}
              to="/community/share-the-weaviate-love"
            >
              Submit your project
            </Link>
          </div>
        </div>
      </div>
      {/*  <div className={styles.bottomBar}>
        <div className={styles.innerBar}>
          <Link
            to="https://weaviate.io/slack"
            className={styles.mobileSocialBox}
          >
            <div className={styles.socialBox}>
              <div className={styles.slack} />
              <p className={styles.text}>Slack</p>
            </div>
          </Link>

          <Link
            to="https://github.com/weaviate/weaviate"
            className={styles.mobileSocialBox}
          >
            <div className={styles.socialBox}>
              <div className={styles.github} />
              <p className={styles.text}>GitHub</p>
            </div>
          </Link>
          <Link
            to="https://twitter.com/weaviate_io"
            className={styles.mobileSocialBox}
          >
            <div className={styles.socialBox}>
              <div className={styles.twitter} />
              <p className={styles.text}>Twitter</p>
            </div>
          </Link>
          <Link
            to="https://forum.weaviate.io/"
            className={styles.mobileSocialBox}
          >
            <div className={styles.socialBox}>
              <div className={styles.forum} />
              <p className={styles.text}>Community Forum</p>
            </div>
          </Link>
        </div>
      </div> */}
    </header>
  );
}
