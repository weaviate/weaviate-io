import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function Soc2(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>SOC 2 Report</h2>

              <p>
                We work with an independent auditor to maintain a SOC 2 report,
                which objectively certifies our controls to ensure the
                continuous security, availability, confidentiality, and
                integrity of our customers' data.
              </p>
            </div>

            <div className={styles.drataLogo}></div>
            <div className={styles.soc2Logo}></div>
          </div>

          <div className={`${styles.box} ${styles.secondBox}`}>
            <div className={styles.soc2Box}>
              <h2>HIPAA Compliance</h2>
              <p>
                Our Enterprise Cloud on AWS environments meet HIPAA
                requirements, enabling the secure storage, handling, and
                processing of Protected Health Information (PHI). Support for
                Azure and GCP deployments is actively in development and will be
                available soon.
              </p>
            </div>

            <div className={styles.hipaaBox}>
              <div className={styles.hipaaLogo}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
