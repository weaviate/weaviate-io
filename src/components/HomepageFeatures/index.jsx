import React from 'react';
import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>
          Weaviate is an open source <br />
          vector search engine
        </h2>
        <p>It works out-of-the box and is eaisly configurable</p>
      </div>
      <div className={styles.features}>
        <div className={styles.box}>
          <p className={styles.icon}></p>
          <h4 className={styles.title}>Save time</h4>
          <p className={styles.subTitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            perspiciatis possimus quibusdam magni omnis nihil amet
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon}></p>
          <h4 className={styles.title}>Boost your apps</h4>
          <p className={styles.subTitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            perspiciatis possimus quibusdam magni omnis nihil amet
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.icon}></p>
          <h4 className={styles.title}>Enjoy the journey</h4>
          <p className={styles.subTitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            perspiciatis possimus quibusdam magni omnis nihil amet
          </p>
        </div>
      </div>
    </div>
  );
}
