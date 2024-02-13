import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.headerImage}></div>
          <br></br>
          <h1>Community starts with YOU!</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              Purpose-built platform for a new breed of software applications.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud/"
            >
              Join us
            </Link>
            <Link className={styles.buttonOutline} to="/developers/weaviate">
              Subscribe for news
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
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
      </div>
    </header>
  );
}
