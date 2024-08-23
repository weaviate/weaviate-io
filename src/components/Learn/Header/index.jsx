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
              A learning resources hub for builders of all levels.
            </p>
            <div className={styles.boxContainer}>
              <Link to="#get-started">Get started</Link>
              &nbsp;|&nbsp;
              <Link to="#guided-courses">Guided courses</Link>
              &nbsp;|&nbsp;
              <Link to="#documentation">Documentation</Link>
              &nbsp;|&nbsp;
              <Link to="#code-examples">Code examples</Link>
              &nbsp;|&nbsp;
              <Link to="#go-further">Go further</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
