import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Header() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <span>Glossary</span>
            <h1>AI Databases Explained</h1>
            <p>
              Learn about AI databases, including AI database design, examples,
              and more.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
