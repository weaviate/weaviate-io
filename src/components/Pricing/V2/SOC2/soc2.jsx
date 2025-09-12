import React from 'react';
import styles from './styles.module.scss';

/**
 * Props:
 * - theme: 'dark' | 'light' (only affects which Drata logo we show)
 */
export default function SecurityCompliance({ theme = 'dark' }) {
  const drataLogo =
    theme === 'dark'
      ? '/img/site/drata-dark-logo.svg'
      : '/img/site/drata-logo.svg';

  return (
    <section className={styles.section} aria-labelledby="security-heading">
      <div className="container">
        <div className={styles.row}>
          <article className={styles.card}>
            <h2 id="security-heading">SOC 2 Report</h2>
            <p>
              We work with an independent auditor to maintain a SOC 2 report,
              which objectively certifies our controls to ensure the continuous
              security, availability, confidentiality, and integrity of our
              customers&apos; data.
            </p>
          </article>

          <div className={styles.media}>
            <img
              className={styles.logoDrata}
              src={drataLogo}
              alt="Drata"
              loading="lazy"
              decoding="async"
            />
            <img
              className={styles.logoSoc}
              src="/img/site/soc2-logo.svg"
              alt="SOC 2 automated by Drata badge"
              loading="lazy"
              decoding="async"
            />
          </div>

          <article className={styles.card}>
            <h2>HIPAA Compliance</h2>
            <p>
              Our Enterprise Cloud on AWS environments meet HIPAA requirements,
              enabling the secure storage, handling, and processing of Protected
              Health Information (PHI). Support for Azure and GCP deployments is
              actively in development and will be available soon.
            </p>
          </article>

          <div className={styles.media}>
            <img
              className={styles.logoHipaa}
              src="/img/site/HIPAA-logo.png"
              alt="HIPAA Compliant badge"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
