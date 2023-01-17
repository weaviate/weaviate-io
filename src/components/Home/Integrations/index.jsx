import React from 'react';
import styles from './styles.module.scss';

export default function GomepageIntegrations() {
  return (
    <div className="container">
      <div className={styles.box}>
        <div className={styles.left}>
          <div className={styles.inside}>
            <span className={styles.logoAI} />
            <span className={styles.logoH} />
            <span className={styles.logoJ} />
          </div>
          <div className={styles.inside}>
            <span className={styles.logoD} />
            <span className={styles.logoCo} />
            <span className={styles.logoW} />
          </div>
        </div>
        <div className={styles.right}>
          <h2>Integrations</h2>
          <p>
            Besides Weaviate's capabilities to bring your own vectors, you can
            also choose one of Weaviate's modules with out-of-the-box support
            for vectorization. You can also choose one of the integrations with
            one of the well-known neural search frameworks.
          </p>
        </div>
      </div>
    </div>
  );
}
