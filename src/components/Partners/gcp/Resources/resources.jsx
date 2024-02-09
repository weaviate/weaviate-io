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
          <p className={styles.subtitle}></p>
        </div>
        <div className={styles.latestModule}>
          <Link to="https://www.prnewswire.com/news-releases/build-with-google-gemini-using-weaviates-native-integration-302014138.html">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource3}`}></div>
              <div className={styles.textBox}>
                <h3>Press Release</h3>
                <p>
                  Build with Google Gemini using Weaviate's native integration
                </p>
              </div>
            </div>
          </Link>
          <Link to="https://weaviate.io/developers/weaviate/installation/gc-marketplace">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource2}`}></div>
              <div className={styles.textBox}>
                <h3>Docs</h3>
                <p>
                  How to use Google Cloud Marketplace to launch a Weaviate
                  cluster
                </p>
              </div>
            </div>
          </Link>
          <Link to="https://weaviate.io/blog/announcing-palm-modules">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource1}`}></div>
              <div className={styles.textBox}>
                <h3>Blog post</h3>
                <p>Try Google's newly announced PaLM API with Weaviate </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
