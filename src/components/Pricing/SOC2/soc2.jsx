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
        </div>
        <div className={`${styles.card} ${styles.longCard}`}>
          <div className={styles.contentDiv}>
            <h3 className={styles.cTextColor}>
              “Weaviate facilitates fast development of generative AI
              applications by our team, removing the need for creating
              boilerplate code, setting up databases, and managing
              infrastructure.”
            </h3>
            <p>Ben Selleslagh, Vectrix</p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud/"
              >
                Start Building with Weaviate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
