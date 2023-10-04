import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Intro() {
  return (
    <div className={styles.introBg}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.textGrid}>
            <h2>
              You can make an <br /> Impact at Weaviate
            </h2>
            <p>
              Weaviate is a remote-first company that has big ambitions. Our
              product Weaviate is a vector database, which uses AI and machine
              learning to organize and search data in a completely new way.
            </p>
            <p>
              With over 1.6 million downloads, Weaviate continues to grow. We
              are looking for ambitious people globally. Join us, so we can
              expand and grow our community of users!
            </p>
          </div>
          <div className={styles.imgGridMiddle}>
            <div className={styles.img1} />
            <div className={styles.img2} />
          </div>
          <div>
            <div className={styles.img3} />
            <div className={styles.img4} />
          </div>
        </div>
      </div>
    </div>
  );
}
