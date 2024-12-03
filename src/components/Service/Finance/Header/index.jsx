import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <span>Case Study</span>
          <h1>
            How a Leading Financial Data Company Commercialized AI in Under a
            Year
          </h1>
        </div>
      </div>
    </header>
  );
}
