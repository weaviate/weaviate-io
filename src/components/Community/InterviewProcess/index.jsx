import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function InterviewProcess() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Join our Online Communities on Slack and Discourse</h2>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.chatImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h2 className={styles.cardTextColor}>Ask the community</h2>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Ask anything related to Flyte and receive responses within a few
              hours.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.chatImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h2 className={styles.cardTextColor}>Ask the community</h2>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Ask anything related to Flyte and receive responses within a few
              hours.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.chatImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h2 className={styles.cardTextColor}>Ask the community</h2>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Ask anything related to Flyte and receive responses within a few
              hours.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <div className={`${styles.img} ${styles.chatImg}`} />
            </div>
            <div className={styles.cardHeaderRight}>
              <h2 className={styles.cardTextColor}>Ask the community</h2>
            </div>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              Ask anything related to Flyte and receive responses within a few
              hours.
            </p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="#jobs">
            Join the Community
          </Link>
          <Link className={styles.buttonOutline} to="#interview-process">
            Join the Community
          </Link>
        </div>
      </div>
    </div>
  );
}
