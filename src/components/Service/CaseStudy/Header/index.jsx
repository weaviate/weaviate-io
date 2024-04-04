import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function StudyHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.logo}></div>
          <span>Case Study</span>
          <h1>Transforming Customer Service with Generative AI</h1>
          <div className={styles.headerBox}>
            <p>
              Learn how Neople Assistants transform customer service with
              Weaviate
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
