import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.left}>
            <span>Contact</span>
            <h1>Contact Weaviate to continue your AI journey</h1>
            <div className={styles.headerBox}>
              <div className={styles.buttons}>
                <Link to="#contact" className={styles.buttonLight}>
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <iframe
              width="720"
              height="400"
              src="https://www.youtube.com/embed/NObCyVszHdo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; controls"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}></div>
          <div className={`${styles.logo} ${styles.logo1}`}></div>
          <div className={`${styles.logo} ${styles.logo2}`}></div>
          <div className={`${styles.logo} ${styles.logo3}`}></div>
          <div className={`${styles.logo} ${styles.logo4}`}></div>
          <div className={`${styles.logo} ${styles.logo5}`}></div>
          <div className={`${styles.logo} ${styles.logo7}`}></div>
          <div className={`${styles.logo} ${styles.logo8}`}></div>
          <div className={`${styles.logo} ${styles.logo9}`}></div>
          <div className={`${styles.logo} ${styles.logo10}`}></div>
          <div className={`${styles.logo} ${styles.logo11}`}></div>
          <div className={`${styles.logo} ${styles.logo12}`}></div>
          <div className={`${styles.logo} ${styles.logo13}`}></div>
          <div className={`${styles.logo} ${styles.logo14}`}></div>

          <div className={styles.logo}></div>
          <div className={`${styles.logo} ${styles.logo1}`}></div>
          <div className={`${styles.logo} ${styles.logo2}`}></div>
          <div className={`${styles.logo} ${styles.logo3}`}></div>
          <div className={`${styles.logo} ${styles.logo4}`}></div>
          <div className={`${styles.logo} ${styles.logo5}`}></div>
          <div className={`${styles.logo} ${styles.logo7}`}></div>
          <div className={`${styles.logo} ${styles.logo8}`}></div>
          <div className={`${styles.logo} ${styles.logo9}`}></div>
          <div className={`${styles.logo} ${styles.logo10}`}></div>
          <div className={`${styles.logo} ${styles.logo11}`}></div>
          <div className={`${styles.logo} ${styles.logo12}`}></div>
          <div className={`${styles.logo} ${styles.logo13}`}></div>
          <div className={`${styles.logo} ${styles.logo14}`}></div>
        </div>
      </div>
    </header>
  );
}
