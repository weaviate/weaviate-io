import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function ContactHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Startup Deal Redemption</h1>

          <div className={styles.headerBox}>
            <p>
              We are excited to offer a special deal for startups. If you are a
              startup, you can redeem this deal to get access to our products
              and services at a discounted rate. This is a great opportunity for
              startups to get started with Weaviate and take advantage of our
              powerful vector search capabilities.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.io/signup?utm_source=website&utm_medium=button&utm_campaign=startup_deal"
            >
              Join us
            </Link>
            <Link
              className={styles.buttonOutline}
              to="https://console.weaviate.io/"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
