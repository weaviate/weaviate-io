import React from 'react';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/LinkButton';

export default function HomepageIntegrations() {
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
            Besides Weaviate's capabilities to bring your own vectors, you can also choose one of Weaviate's modules with out-of-the-box support for vectorization. You can also pick from a wide variety of well-known neural search frameworks with Weaviate integrations.
          </p>
          <LinkButton link="/developers/weaviate/modules" newTab={false}>Learn about Weaviate modules</LinkButton>
        </div>
      </div>
    </div>
  );
}
