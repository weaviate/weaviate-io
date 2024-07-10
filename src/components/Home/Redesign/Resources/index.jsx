import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgContain}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Developer Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest insights and trends in the AI world.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="/blog">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource1}`}
              ></div>
              <h3>Blog</h3>
              <p>Concepts, releases, research, how-tos and more.</p>
            </div>
          </Link>
          <Link to="/developers/academy">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource2}`}
              ></div>
              <h3>Weaviate Academy</h3>
              <p>
                End-to-end courses designed to accelerate your Weaviate learning
                journey.
              </p>
            </div>
          </Link>
          <Link to="/developers/weaviate">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource3}`}
              ></div>
              <h3>Documentation</h3>
              <p>
                Get started with Weaviate and learn how to get the most out of
                its features.
              </p>
            </div>
          </Link>
        </div>
        <div className={styles.latestModule}>
          <Link to="/developers/weaviate/quickstart">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource4}`}
              ></div>
              <h3>Quickstart guide</h3>
              <p>See what you can do with Weaviate, in 20-30 minutes.</p>
            </div>
          </Link>
          <Link to="/community/events">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource5}`}
              ></div>
              <h3>Events & Webinars</h3>
              <p>Learn from the experts, we'll meet you where you are!</p>
            </div>
          </Link>
          <Link to="/community">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource6}`}
              ></div>
              <h3>Community</h3>
              <p>
                Connect with the Weaviate Team and hundreds of developers and
                data engineers.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
