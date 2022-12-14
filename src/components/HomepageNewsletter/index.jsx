import React from 'react';
import styles from './styles.module.scss';

export default function HomepageNewsletter() {
  return (
    <div className="container">
      <div className={styles.box}>
        <div className={styles.left}>
          <h2>Stay updated</h2>
          <span>Subscribe for our newsletter</span>
        </div>
        <div className={styles.right}>
          <div className={styles.form}>
            <input type="text" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
