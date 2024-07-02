import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Header() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <h1>Weaviate Learning Centre</h1>
            <p>
              Training courses, resources, and support options for<br></br>{' '}
              builders of all levels. We’re with you on your AI journey.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
