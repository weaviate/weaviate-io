import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function PlatformHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.topText}>Events & webinars</p>
          <h1>
            Weaviate around the world,<br></br>meet us where you are!
          </h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              We are actively engaging in the open-source<br></br> and AI
              community around the World
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
