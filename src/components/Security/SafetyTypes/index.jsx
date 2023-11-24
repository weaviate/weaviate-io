import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function SafetyTypes() {
  return (
    <>
      <div className="container">
        <div className={styles.title}>
          <h2>We keep your data safe (and available)</h2>
          <p>
            Weaviate Cloud Services was built to offload the burden of managing
            a vector database and give development teams peace of mind. Whether
            you’re running Weaviate as a Serverless, Enterprise Dedicated, or
            Bring Your Own Cloud solution– our top priority is keeping your data
            safe and available. Read more about our SLAs here. 
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>Secure Deployment</h3>
              <p className={styles.textCardContent}>
                Run in a dedicated tenant or in your own VPC. 
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>End-to-end Encryption</h3>
              <p className={styles.textCardContent}>
                Data is fully encrypted in transit and at rest.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>User Authentication</h3>
              <p className={styles.textCardContent}>
                Connect to your identity provider to rely on built-in
                mechanisms.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>Native Multi Tenancy</h3>
              <p className={styles.textCardContent}>
                Isolate data with industry-leading tenant management.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>
                Advanced Firewall Protection
              </h3>
              <p className={styles.textCardContent}>
                Take extra precaution against malicious threats.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>Active Monitoring</h3>
              <p className={styles.textCardContent}>
                We proactively monitor our systems and are on standby 24/7 for
                incidents. 
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>Multi Availability Zones</h3>
              <p className={styles.textCardContent}>
                High availability and resilience across 3 zones.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cardTextColor}>Automated Backups</h3>
              <p className={styles.textCardContent}>
                Rest easy with daily backups and snapshots.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.longCard}`}>
            <div className={styles.contentDiv}>
              <h3 className={styles.cTextColor}>
                “We're building AI-powered research and intelligence tools for
                the highly-regulated pharma industry. Weaviate has been integral
                to ensuring we fetch relevant information.”
              </h3>
              <p>Vamsidhar Reddy, Cedience</p>
              <div className={styles.buttons}>
                <Link
                  className={styles.buttonGradient}
                  to="https://console.weaviate.cloud/"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.safetyTypeBottom} />
    </>
  );
}
