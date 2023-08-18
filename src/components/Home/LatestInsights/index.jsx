import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function HomepageLatestInsights() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Insights</h2>
        <p className={styles.subtitle}>
          Blog, podcast and more.<br></br>
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.latestModule}>
        <Link to="/blog/distance-metrics-in-vector-search">
          <div className={styles.latestBox}>
            <div
              className={`${styles.insideBox} ${styles.blogImageDistance}`}
            ></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>Distance Metrics in Vector Search</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_erika.png"></img>
              <p className={styles.smallText}>
                Erika Cardena<br></br>
                Developer Advocate
              </p>
              <span className={styles.smallText}>Aug 15, 2023</span>
            </div>
          </div>
        </Link>
        <Link to="/blog/what-is-a-vector-database">
          <div className={styles.latestBox}>
            <div
              className={`${styles.insideBox} ${styles.blogImageVector}`}
            ></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>A Gentle Introduction to Vector Databases</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_leonie.png"></img>
              <p className={styles.smallText}>
                Leonie Monigatti<br></br>
                Developer Advocate
              </p>
              <span className={styles.smallText}>Aug 01, 2023</span>
            </div>
          </div>
        </Link>
        <Link to="/blog/healthsearch-demo">
          <div className={styles.latestBox}>
            <div
              className={`${styles.insideBox} ${styles.blogImageHealth}`}
            ></div>
            <div className={styles.textBox}>
              <h3>Blog</h3>
              <p>
                Discover Healthsearch Unlocking Health with Semantic Search ✨
              </p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_edward.png"></img>
              <p className={styles.smallText}>
                Edward Schmuhl<br></br>
                Machine Learning Engineer
              </p>
              <span className={styles.smallText}>Jul 26, 2023</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
