import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function HomepageJoinCommunity() {
  return (
    <div className={styles.communityWrapper}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.rightSide}>
            <div className={styles.socialBox}>
              <Link
                to="https://weaviate.io/slack"
                className={styles.mobileSocialBox}
              >
                <div className={styles.slack} />
                <p className={styles.text}>Slack</p>
              </Link>
            </div>
            <div className={styles.socialBox}>
              <Link
                to="https://github.com/weaviate/weaviate"
                className={styles.mobileSocialBox}
              >
                <div className={styles.github} />
                <p className={styles.text}>GitHub</p>
              </Link>
            </div>
            <div className={styles.socialBox}>
              <Link
                to="https://twitter.com/weaviate_io"
                className={styles.mobileSocialBox}
              >
                <div className={styles.twitter} />
                <p className={styles.text}>Twitter</p>
              </Link>
            </div>
            <div className={styles.socialBox}>
              <Link
                to="https://forum.weaviate.io/"
                className={styles.mobileSocialBox}
              >
                <div className={styles.forum} />
                <p className={styles.text}>Forum</p>
              </Link>
            </div>
          </div>
          <div className={styles.leftSide}>
            <h2>Join the global community</h2>
            <span className={styles.rightText}>
              Connect with the Weaviate Team and hundreds of developers and data
              engineers! Our community is here to help you with your projects
              and provide expert advice. Share how you build your apps with
              Weaviate.
            </span>

            <span className={styles.rightText}>
              Stay updated and subscribe to our newsletter
            </span>

            <div className={styles.communityForm}>
              <iframe
                src="https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true"
                data-test-id="beehiiv-embed"
                frameBorder="0"
                scrolling="no"
                style={{
                  margin: 0,
                  borderRadius: '0px',
                  buttonColour: '#61BD73',
                  backgroundColor: 'transparent',
                  width: '100%',
                  important: false,
                }}
              ></iframe>
              <span className={styles.formFooter}>
                By submitting, I agree to the{' '}
                <Link href="/service">Terms of Service </Link>and{' '}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
