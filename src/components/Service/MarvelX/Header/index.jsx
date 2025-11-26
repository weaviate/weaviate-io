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
          <h1>
            How MarvelX is Scaling Insurance Processing at the Speed of AI with
            Weaviate
          </h1>
        </div>
      </div>
    </header>
  );
}
