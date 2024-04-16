import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.topText}>Online Workshops & Events</p>
          <h1>
            Learn from the experts,<br></br>meet us where you are!
          </h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              We love to share our knowledge in building AI-native apps<br></br>
              Join us online in a workshop or meet us in-person at an event.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonOutline}
              to="https://newsletter.weaviate.io/subscribe"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
