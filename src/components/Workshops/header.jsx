import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Weaviate Workshops</h1>
          <div className={styles.headerBox}>
            <p>
              We believe that the next wave of software infrastructure is
              AI-first and that a strong open-source community is a basis for
              creating high-quality software. Our workshops deliver new
              information and details on our service.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
