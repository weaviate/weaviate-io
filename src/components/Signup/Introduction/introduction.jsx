import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function introduction() {
  return (
    <div className={styles.investorsContainer}>
      <div className={styles.box}>
        <div className={styles.investorBox}>
          <div className={styles.logoBox}>
            <div className={styles.logo} />
            <span>Weaviate Cloud</span>
          </div>
          <h1>Fully managed, AI-native vector database</h1>

          <p>
            All the power of our open-source vector database, without the burden
            of self-hosting.{' '}
          </p>

          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Take search to new heights</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Use built-in vector and keyword search for contextual, precise
                  results across any type of data—at scale.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.ragIcon}`}></div>
                <h2>Accelerate RAG and Gen AI projects</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Easily create vector embeddings and connect to ML models and
                  frameworks of choice as your AI stack evolves.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.genIcon}`}></div>
                <h2>Deploy quickly, securely, and confidently</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Run in our Serverless Cloud environment, or in a dedicated
                  tenant with our Enterprise Cloud offering.
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
                    className={`${styles.customerLogo} ${styles.mulinyLogo}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.shippoLogo}`}
                  />
                </div>
              </div>

              <div className={`${styles.innerBar} ${styles.secondLine}`}>
                <div className={styles.logoSection}>
                  <div className={`${styles.customerLogo} ${styles.redbull}`} />
                  <div
                    className={`${styles.customerLogo} ${styles.writesonic}`}
                  />
                  <div
                    className={`${styles.customerLogo} ${styles.netappLogo}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.investorLogos}>
          <div className={styles.signUp}>
            <h2>The AI-native database for a new generation of software</h2>
            <p>Get started for free</p>
            <Link
              to="https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs-frontend&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fconsole.weaviate.cloud%2Fapi%2Fauth%2Fcallback%2Fkeycloak"
              className={styles.button}
            >
              Try Now
            </Link>
            <span>
              Have questions about pricing? <br></br>
              <Link to="/#contact-us">Contact us</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
