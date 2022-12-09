import React from 'react';
import styles from './styles.module.scss';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>What you can do with Weaviate</h2>
        <p className={styles.subtitle}>
          Beyond search, Weaviate's next-gen vector search engine can power a
          wide range of innovative apps
        </p>
      </div>
      <div className={styles.module}>
        <div className={styles.info}>
          <div className={styles.leftBorder}>
            <h3>Search</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />{' '}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <h3>Recomendations</h3>
          <h3>Integrations</h3>
        </div>
        <div className={styles.code}></div>
      </div>
    </div>
  );
}
