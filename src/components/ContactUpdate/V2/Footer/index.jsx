import React from 'react';
import styles from './styles.module.scss';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.socials}>
          <button onClick={scrollToTop} className={styles.backToTop}>
            Back to Top
          </button>
        </div>

        <div className={styles.copy}>
          © {new Date().getFullYear()} Weaviate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
