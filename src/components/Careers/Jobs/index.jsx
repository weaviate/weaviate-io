import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Jobs() {
  useEffect(() => {
    const scriptId = 'teamtailor-widget';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://scripts.teamtailor-cdn.com/widgets/eu-pink/jobs.js';
      script.async = true;
      script.charset = 'utf-8';
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.jobBoard}>
      <div className="container" id="jobs">
        <div className={styles.title}>
          <h2>Let’s work together</h2>
          <p>
            All positions at Weaviate are fully remote. However, certain
            positions are located in specific regions.
          </p>
        </div>

        <div className={styles.fakeWidth}>
          <div className={styles.jobBox}>
            <div
              className="teamtailor-jobs-widget"
              data-teamtailor-api-key="627t2m5j5DXEp2PzGXXIlsf_NTyBj_OATYIOkRYN"
              data-teamtailor-limit="20"
            />
          </div>
        </div>

        <div className={styles.titleFooter}></div>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonOutline}
            to="mailto:careers@weaviate.io"
          >
            Let’s have a chat
          </Link>
        </div>
      </div>
    </div>
  );
}
