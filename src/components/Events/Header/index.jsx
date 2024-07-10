import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function WorkshopsHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Online Workshops & Events</h1>

          <div className={styles.headerBox}>
            <p>
              We hold workshops for different experience levels.<br />
              Sign up below to learn how to build AI-native apps.
            </p>
          </div>
          <div className={styles.buttons}>
            {/* <Link
              className={styles.buttonGradient}
              to="https://newsletter.weaviate.io/subscribe"
            >
              Subscribe to Newsletter
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
}