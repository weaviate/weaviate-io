import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import heroes from '/data/heroes.json'; // Assuming this is the correct path to your JSON data

export default function Heroes() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Grow with Weaviate</h2>
        <p>
          Struggling to gain visibility for your AI project? Let us help you in
          boosting your projects and campaigns. Whether you're a project owner
          looking to maximize visibility or a showcase client aiming to make an
          impact on social media, our program equips you with the tools and
          support necessary for success.
        </p>
      </div>
      <div className={styles.box}></div>
    </div>
  );
}
