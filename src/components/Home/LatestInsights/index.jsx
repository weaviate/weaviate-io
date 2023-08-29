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
          Learn and explore the latest insights and trends in the AI world.
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
        <Link to="/learn/workshops">
          <div className={styles.latestBox}>
            <div className={`${styles.insideBox} ${styles.blogWorkshop}`}></div>
            <div className={styles.textBox}>
              <h3>Workshop</h3>
              <p>Workshop: Introduction to Weaviate</p>
            </div>
            <div className={styles.bottomBox}>
              <img src="/img/site/avatar_zain.png"></img>
              <p className={styles.smallText}>
                Zain Hasan<br></br>
                Senior Dev Advocate
              </p>
              <span className={styles.smallText}>Sept 14, 2023</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.buttonGradient} to="/blog">
          Go to Blog
        </Link>
        <Link className={styles.buttonOutline} to="/learn/workshop">
          Check the Podcast
        </Link>
      </div>
    </div>
  );
}
