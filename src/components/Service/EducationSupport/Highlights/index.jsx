import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function SafetyTypes() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.title}>
          <h2>Partner with our experts to bring AI to your organisation</h2>
          <p>Packages tailored to meet your needs, including:</p>
        </div>
        <div className={styles.box}>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon01}`}></div>
              <p className={styles.textCardContent}>
                Community knowledge hub, training<br></br> courses, workshops,
                and guides
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
              <p className={styles.textCardContent}>
                Curated onboarding<br></br> plan
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
              <p className={styles.textCardContent}>
                Production readiness<br></br> assessment
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
              <p className={styles.textCardContent}>
                Architecture design<br></br> workshop
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon05}`}></div>
              <p className={styles.textCardContent}>
                Regular office<br></br> hours
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon06}`}></div>
              <p className={styles.textCardContent}>
                Technical Success<br></br> Manager
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon07}`}></div>
              <p className={styles.textCardContent}>
                24/7 support via email and<br></br> phone escalation hotline
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <div className={`${styles.cardIcon} ${styles.icon08}`}></div>
              <p className={styles.textCardContent}>
                Enterprise or Business<br></br> Critical SLAs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
