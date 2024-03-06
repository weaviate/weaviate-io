import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function SafetyTypes() {
  return (
    <div className="container">
      <div className={styles.title}>
        <h2>Highlights</h2>
        <p>All the features of the AI-native vector database, with enhanced:</p>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon01}`}></div>
            <h3 className={styles.cardTextColor}>
              Predictability and simplicity{' '}
            </h3>
            <p className={styles.textCardContent}>
              Reduce the guesswork with pre-scoped dimensions, storage, query,
              and latency parameters.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
            <h3 className={styles.cardTextColor}>Data privacy </h3>
            <p className={styles.textCardContent}>
              Data isolation keeps your data (and your customers’ data) safe,
              and helps with security and compliance.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
            <h3 className={styles.cardTextColor}>Dedicated Success Manager</h3>
            <p className={styles.textCardContent}>
              Help to support and guide your team, and optimize your project's
              success and efficiency.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
            <h3 className={styles.cardTextColor}>Resource optimization</h3>
            <p className={styles.textCardContent}>
              Each package is tailored to provide an optimal balance of
              resources based on your use case.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon05}`}></div>
            <h3 className={styles.cardTextColor}>Enterprise Support</h3>
            <p className={styles.textCardContent}>
              24/7 monitoring and support through email and phone to meet your
              needs.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon06}`}></div>
            <h3 className={styles.cardTextColor}>Onboarding & Education</h3>
            <p className={styles.textCardContent}>
              We offer training courses, resources, and support for teams at any
              skill level and stage of your AI journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
