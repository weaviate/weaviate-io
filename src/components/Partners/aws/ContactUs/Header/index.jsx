import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Help us spread the word, get a free t-shirt!</h1>
          <div className={styles.headerBox}>
            <p className="text-center"></p>
          </div>
        </div>
      </div>
    </header>
  );
}
