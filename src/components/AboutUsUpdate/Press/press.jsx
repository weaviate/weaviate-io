import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Press() {
  return (
    <div className={styles.teamBG}>
      <div className="container">
        <div className={styles.box}>
          <h2>Press</h2>
          <p className="text-center">
            Latest news, updates, and press releases.
          </p>
        </div>
        <div className={styles.parent}>
          <div className={styles.div1}>
            <Link to="https://www.prnewswire.com/news-releases/weaviate-strengthens-global-collaboration-with-aws-to-accelerate-generative-ai-initiatives-302460419.html">
              <div className={styles.sectionL}>
                <h3>Press release</h3>
                <p className={styles.pressText}>
                  Weaviate Strengthens Global Collaboration with AWS to
                  Accelerate Generative AI Initiatives
                </p>
                <p className={styles.date}>20 May, 2025</p>
              </div>
            </Link>
          </div>
          <div className={styles.div2}>
            <Link to="https://www.prnewswire.com/news-releases/weaviate-partners-with-snowflake-to-bring-secure-genai-to-snowpark-container-services-302057430.html">
              <div className={styles.sectionR}>
                <h3>Press release</h3>
                <p className={styles.pressText}>
                  Weaviate partners with Snowflake to bring secure GenAI to
                  Snowpark Container Services
                </p>
                <p className={styles.date}>8 Feb, 2024</p>
              </div>
            </Link>
          </div>
          <div className={styles.div3}>
            <Link to="https://weaviate.reportablenews.com/pr/weaviate-advances-vector-database-technology-to-power-fast-growing-ai-engineering-stacks">
              <div className={styles.sectionB}>
                <h3>Press release</h3>
                <p className={styles.pressText}>
                  Weaviate Advances Vector Database Technology to Power
                  Fast-Growing AI Engineering Stacks
                </p>
                <p className={styles.date}>18 Nov, 2026</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
