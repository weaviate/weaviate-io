import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <header>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.leftGrid}>
            <p className={styles.title}>
              The AI Native <br /> Vector Database
            </p>
            <p className={styles.text}>
              Weaviate is an open-source vector database. It allows you to store
              data objects and vector embeddings from your favorite ML-models,
              and scale seamlessly into billions of data objects.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Start Free
              </Link>
              <Link
                className={styles.buttonOutline}
                to="https://weaviate.io/developers/weaviate"
              >
                Documentation
              </Link>
            </div>
          </div>
          <div className={styles.rightGrid}>
            <div className={styles.img} />
          </div>
        </div>
      </div>
      <Link href="/partners/aws/awsreinvent">
        <div className={styles.awsBanner}></div>
      </Link>
      {/*    <div className={styles.bottomBar}>
        <div className={styles.innerBar}>
          <p className={styles.text}>
            Community of users <br></br> and customers
          </p>
          <div className={styles.logoSection}>
            <div className={`${styles.customerLogo} ${styles.redhatLogo}`} />
            <div
              className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
            />
            <div className={`${styles.customerLogo} ${styles.youLogo}`} />
            <div className={`${styles.customerLogo} ${styles.ericssonLogo}`} />
            <div className={`${styles.customerLogo} ${styles.instabaseLogo}`} />
          </div>
        </div>
      </div>
      <div className={styles.bottomBars}>
        <div className={styles.barText}>
          2,500,000+<br></br>
          <span>Downloads</span>
        </div>
        <div className={styles.barText}>
          7,000+<br></br>
          <span>GitHub stars</span>
        </div>
        <div className={styles.barText}>
          8,000+<br></br>
          <span>Twitter followers</span>
        </div>
        <div className={styles.barText}>
          4,000+<br></br>
          <span>Community members</span>
        </div>
      </div>*/}
    </header>
  );
}
