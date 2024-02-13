import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.resourceBg}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>More Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest from Weaviate across the web.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="https://medium.com/snowflake/running-weaviate-vector-db-in-snowflake-using-snowpark-container-services-490b1c391795">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource1}`}></div>
              <div className={styles.textBox}>
                <h3>Blog</h3>
                <p>
                  Running Weaviate Vector DB in Snowflake using Snowpark
                  Container Services
                </p>
              </div>
            </div>
          </Link>

          <Link to="https://www.snowflake.com/blog/fast-easy-secure-llm-app-development-snowflake-cortex/">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource2}`}></div>
              <div className={styles.textBox}>
                <h3>Blog</h3>
                <p>
                  Fast, Easy and Secure LLM App Development With Snowflake
                  Cortex
                </p>
              </div>
            </div>
          </Link>
          <Link to="https://github.com/Snowflake-Labs/sfguide-getting-started-weaviate-on-spcs">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource3}`}></div>
              <div className={styles.textBox}>
                <h3>Guide</h3>
                <p>Guide: Weaviate on SPCS</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
