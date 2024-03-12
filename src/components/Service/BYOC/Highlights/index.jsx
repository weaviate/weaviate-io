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
            <h3 className={styles.cardTextColor}>Container security</h3>
            <p className={styles.textCardContent}>
              Images are scanned against known vulnerability databases before
              deployment.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon02}`}></div>
            <h3 className={styles.cardTextColor}>Infrastructure as Code</h3>
            <p className={styles.textCardContent}>
              We codify infrastructure to ensure a repeatable and
              version-controlled infrastructure deployment
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon03}`}></div>
            <h3 className={styles.cardTextColor}>
              Networking and data protection
            </h3>
            <p className={styles.textCardContent}>
              Data encryption using TLS for data in transit. Private, isolated
              networks with strict ingress and egress rules.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon04}`}></div>
            <h3 className={styles.cardTextColor}>
              Compliance with CIS Benchmark
            </h3>
            <p className={styles.textCardContent}>
              Regular audits and automated compliance checks to ensure real-time
              adherence.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.contentDiv}>
            <div className={`${styles.cardIcon} ${styles.icon05}`}></div>
            <h3 className={styles.cardTextColor}>Dedicated Success Manager</h3>
            <p className={styles.textCardContent}>
              Help to support and guide your team, and optimize your project's
              success and efficiency.
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
