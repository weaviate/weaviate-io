import React from 'react';
import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>
          Weaviate is an Open Source <br />
          Vector Search engine
        </h2>
        <p>It works out-of-the box and is easily configurable</p>
      </div>
      <div className={styles.features}>
        <div className={styles.box}>
          <p className={styles.icon1}></p>
          <h4 className={styles.title}>Get started instantly</h4>
          <p className={styles.subTitle}>
            with our Cloud Service, Kubernetes or Docker, Sensible defaults and
            easy configuration.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon2}></p>
          <h4 className={styles.title}>Leverage advanced features</h4>
          <p className={styles.subTitle}>
            like vector and hybrid search, recommendations and summarization. No
            AI expertise required.
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon3}></p>
          <h4 className={styles.title}>DevEx is our focus</h4>
          <p className={styles.subTitle}>
            Get all the help and support you need, join a friendly community and
            have your say.
          </p>
        </div>
      </div>
    </div>
  );
}
