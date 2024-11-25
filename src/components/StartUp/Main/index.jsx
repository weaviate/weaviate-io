import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h2>Build the future of AI with Weaviate</h2>
          <p>
            Partner with us to get your AI products to market faster and tap
            into resources to help grow your business.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bento01}>
            <div className={styles.bentoText}>
              <div className={styles.bentoTitle}>
                <div className={styles.bentoLogo}></div>
                <h3>Benefits</h3>
              </div>
              <ul>
                <li>Weaviate credits to support building</li>
                <li>Co-marketing opportunities</li>
                <li>24/7 support and advisory sessions</li>
                <li>
                  Networking opportunities with founders, executives, and
                  advisors
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.bento02}>
            <div className={styles.bentoText}>
              <div className={styles.bentoTitle}>
                <div
                  className={`${styles.bentoLogo} ${styles.requirement}`}
                ></div>
                <h3>Requirements</h3>
              </div>
              <ul>
                <li>Pre-seed, Seed, or Series A stage</li>
                <li>Have less than $10M annual revenue</li>
                <li>Have raised less than $50M</li>
              </ul>
            </div>
          </div>
          <div className={styles.bento03}>
            <div className={styles.bentoText}></div>
          </div>
          <div className={styles.bento06}>
            <div className={styles.bentoText}>
              <div className={styles.innerText}>
                <h3>Start building with Weaviate for free</h3>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link to="/#contact-us" className={styles.buttonLight}>
                Get Started
              </Link>
              <Link
                to="https://console.weaviate.cloud"
                className={styles.buttonDark}
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
