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
            <p>Nov 27 - 30, 2023</p>
            <h1>Weaviate at AWS re:Invent</h1>
            <div className={styles.headerBox}>
              <p className="text-center">
                Visit us at AWS re:Invent to learn how to simplify building
                generative AI applications with our AI-native vector database.
              </p>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#meetingForm">
              Book A Meeting
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
