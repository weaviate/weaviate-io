import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function introduction() {
  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoSideA}>
        <h1>
          Learn how to take your AI applications to market faster with Weaviate
        </h1>

        <p>
          See how Weaviate’s AI-native vector database gives AI builders the
          tools needed to move fast—without compromising data privacy,
          performance, or costs.
        </p>

        <p>
          <strong>Sign up for a 1:1 call with our team to see how to:</strong>
        </p>

        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.genIcon}`}></div>
              <p>
                Blend vector and keyword search (with no extra work) for
                accurate, contextual results across every type of data.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.ragIcon}`}></div>
              <p>
                Connect to your LLM of choice and easily switch models for fast,
                flexible RAG development.
              </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <p>
                Reduce resource consumption with techniques like vector
                compression and data offloading.
              </p>
            </div>
          </div>
          <div className={styles.typeQuote}>
            <div className={styles.image}></div>
            <div>
              <p>
                “Through our corpus API connected to Weaviate, users can build
                very powerful, low latency search engines in minutes with little
                to no code.”
              </p>
              <span>Aisis Julian, Senior Software Engineer, Morningstar</span>
            </div>
          </div>
          <div className={styles.bottomBar}>
            <div className={styles.innerBar}>
              <div className={`${styles.customerLogo} ${styles.rakutenLogo}`} />
              <div
                className={`${styles.customerLogo} ${styles.morningstarLogo}`}
              />
              <div className={`${styles.customerLogo} ${styles.shippoLogo}`} />
              <div className={`${styles.customerLogo} ${styles.amdLogo}`} />
              <div className={`${styles.customerLogo} ${styles.bunqLogo}`} />
              <div className={`${styles.customerLogo} ${styles.ciscoLogo}`} />
            </div>

            <div className={`${styles.innerBar} ${styles.secondLine}`}>
              <div className={`${styles.customerLogo} ${styles.writesonic}`} />
              <div
                className={`${styles.customerLogo} ${styles.instabaseLogo}`}
              />
              <div className={`${styles.customerLogo} ${styles.stackLogo}`} />
              <div className={`${styles.customerLogo} ${styles.factsetLogo}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.demoSideB}>
        <div className={styles.signUp}>
          <h2>We’d love to give you a live demo of what Weaviate can do</h2>
          <div className={styles.signUpBox} />
        </div>
      </div>
    </div>
  );
}
