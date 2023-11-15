import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function RewardProcess() {
  return (
    <div id="interview-process" className="container">
      <div className={styles.title}>
        <h2>
          Here’s how you can help us spread the word<br></br>(and get a FREE
          Weaviate t-shirt 💚)
        </h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 1 <h3>Leave a review</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Visit G2 by clicking the button below and leave a review on our
              profile. Please be thorough – your experience is invaluable to
              folks looking to learn about Weaviate!{' '}
              <strong>Make sure to take a screenshot of your review.</strong>
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://www.g2.com/products/weaviate/take_survey"
            >
              Leave a Review
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderRight}>
              <h3 className={styles.cardTextColor}>
                Step 2 <h3>Submit your t-shirt size</h3>
              </h3>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Fill out the form below and upload your review screenshot. You
              have until 11:59pm PT November 21st to submit a review and
              complete the form below to ensure that you get your limited
              edition Weaviate shirt!
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#Form">
              T-Shirt Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
