import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Header() {
  return (
    <header>
      <div className={styles.awsBg}>
        <div className="container">
          <div className={styles.box}>
            <p>April 9 - 11, 2024</p>
            <h1>Weaviate at Google Cloud Next</h1>
            <div className={styles.headerBox}>
              <p className="text-center">
                Meet with us to learn how to simplify building AI-native
                applications with our open source vector database.
              </p>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#meetingForm">
              Book a meeting
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
