import React from 'react';
import styles from './styles.module.scss';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>What you can do with Weaviate</h2>
        <p className={styles.subtitle}>
          Beyond search, Weaviate's next-gen vector search engine can power a
          wide range of innovative apps.
        </p>
      </div>
      <div className={styles.module}>
        <div className={styles.info}>
          <div className={styles.leftBorder}>
            <h3>Search</h3>
            <p>
              Go beyond keyword matching, find meaning in antything <br /> from
              images to molecules.
            </p>
          </div>
          <div>
            <h3>Recomendations</h3>
            <p>
              Provide top match recommendations seamlessly with minimal setup.
            </p>
          </div>
          <div>
            <h3>Integrations</h3>
            <p>
              Use AI models, datasets and services such as GTP-3, Wikipedia and
              Jira.
            </p>
          </div>
        </div>
        <div className={styles.code}></div>
      </div>
    </div>
  );
}
