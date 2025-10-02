import React from 'react';
import styles from './styles.module.scss';

export default function SecurityCompliance({ theme = 'dark' }) {
  const drataLogo =
    theme === 'dark'
      ? '/img/site/drata-dark-logo.svg'
      : '/img/site/drata-logo.svg';

  return (
    <section className={styles.section} aria-labelledby="soc2-hipaa-heading">
      <div className="container">
        <div className={styles.groups}>
          {/* SOC 2 + Drata */}
          <div className={styles.group}>
            <article className={styles.copy}>
              <h2 id="soc2-hipaa-heading">SOC 2 Report</h2>
              <p>
                We work with an independent auditor to maintain a SOC 2 report,
                which objectively certifies our controls to ensure the
                continuous security, availability, confidentiality, and
                integrity of our customers&apos; data.
              </p>
            </article>

            <aside className={`${styles.mediaPane} ${styles.mediaSoc}`}>
              <img
                className={styles.logoSoc}
                src="/img/site/soc2-logo.svg"
                alt="SOC 2 automated by Drata badge"
                loading="lazy"
                decoding="async"
              />
              <img
                className={styles.logoDrata}
                src={drataLogo}
                alt="Drata"
                loading="lazy"
                decoding="async"
              />
            </aside>
          </div>

          {/* HIPAA */}
          <div className={styles.group}>
            <article className={styles.copy}>
              <h2>HIPAA Compliance</h2>
              <p>
                Our Enterprise Cloud on AWS environments meet HIPAA
                requirements, enabling the secure storage, handling, and
                processing of Protected Health Information (PHI). Support for
                Azure and GCP deployments is actively in development and will be
                available soon.
              </p>
            </article>

            <aside className={`${styles.mediaPane} ${styles.mediaHipaa}`}>
              <img
                className={styles.logoHipaa}
                src="/img/site/HIPAA-logo.png"
                alt="HIPAA Compliant badge"
                loading="lazy"
                decoding="async"
              />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
