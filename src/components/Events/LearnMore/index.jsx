import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function LearnMore() {
  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.box}>
          <h2>Learn more</h2>
          <p>
            Connect with the Weaviate Team and hundreds of developers and data
            engineers! Our community is here to help you with your projects and
            provide expert advice. Share how you build your apps with Weaviate.
          </p>
        </div>
        <div className={styles.parent}>
          <div className={styles.div1}>
            <Link to="/podcast">
              <div className={styles.sectionL}>
                <h3 className={styles.cardHeader}>Podcasts</h3>
                <p className={styles.pressText}>
                  Join Connor Shorten as he interviews Weaviate community users,
                  leading machine learning experts, and explores Weaviate use
                  cases from users and customers.
                </p>
              </div>
            </Link>
          </div>
          <div className={styles.div2}>
            <Link to="/blog">
              <div className={styles.sectionR}>
                <h3 className={styles.cardHeader}>Blog</h3>
                <p className={styles.pressText}>
                  Stay up to date with the latest Weaviate trends and insights.
                </p>
                <p className={styles.date}>Go to Blog</p>
              </div>
            </Link>
          </div>
          <div className={styles.div3}>
            <Link to="/developers/weaviate">
              <div className={styles.sectionB}>
                <h3 className={styles.cardHeader}>Documentation</h3>
                <h3 className={styles.cardSub}>How to start with Weaviate</h3>
                <p className={styles.pressText}>
                  Weaviate’ search engine opens up new ways to query your data
                </p>
                <p>
                  This page is an introduction to Weaviate. We present a very
                  high-level overview of Weaviate here, so that you have some
                  context before moving on to any other sections.
                </p>
                <p className={styles.date}>Go to DOCS</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
