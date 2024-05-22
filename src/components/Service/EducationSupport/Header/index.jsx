import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Education & Support</h1>
          <div className={styles.headerBox}>
            <p>
              Training courses, resources, and support options for builders of
              all levels. We’re with you on your AI journey.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#contact-sales">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
