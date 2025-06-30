import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Jobs() {
  useEffect(() => {
    const scriptId = 'ashby-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src =
        'https://jobs.ashbyhq.com/weaviate/embed?css=https://weaviate.io/css/ashby-custom.css';

      script.async = true;
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
            <div id="ashby_embed"></div>
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
