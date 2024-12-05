import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function ContactHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <br></br>
          <h1>Contact</h1>

          <div className={styles.headerBox}>
            <p className="text-center">
              We are here to help you with any questions you might have. Please
              contact us via the form below or join our communities.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://forum.weaviate.io/"
            >
              Join us
            </Link>
            <Link
              className={styles.buttonOutline}
              to="https://newsletter.weaviate.io/"
            >
              Subscribe for news
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
