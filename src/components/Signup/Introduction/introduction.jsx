import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function introduction() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'df09b2ec-ecbb-48ee-8c1e-f307049fc0bf',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <div className={styles.investorsContainer}>
      <div className={styles.box}>
        <div className={styles.investorBox}>
          <div className={styles.logoBox}>
            <div className={styles.logo} />
            <span>Weaviate Cloud</span>
          </div>
          <h1>Start building with Weaviate Cloud for free</h1>

          <p>Fully managed, AI-native vector database</p>

          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Push the limits of search across large-scale data</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Combine the best of keyword and vector search in a single
                  database for the most intuitive, efficient search. Scale up to
                  1B data objects.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Build AI applications with less hassle</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Simplify the development of chatbots, agents, and other
                  generative AI applications with pluggable modules for
                  vectorization and LLMs.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Focus on innovating, not managing</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Confidently deploy enterprise-ready applications with an
                  extensible, fully-managed platform that can adapt to your
                  needs.
                </p>
              </div>
            </div>
            <div className={styles.bottomBar}>
              <div className={styles.innerBar}>
                <div className={styles.logoSection}>
                  <div
                    className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.instabaseLogo}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.redhatLogo}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.netappLogo}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.shippoLogo}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.investorLogos}>
          <div className={styles.signUp}>
            <h2>Sign up to Weaviate Cloud</h2>
            <p>
              Create an account and get access to Weaviate Cloud console, apps,
              tools and more.
            </p>
            <Link to="/signup" className={styles.button}>
              Create Account
            </Link>
            <span>
              Already have an account? <Link to="">Log in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
