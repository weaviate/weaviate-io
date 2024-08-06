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
            <h1>Remote work at Weaviate</h1>
            <p>
              Weaviate is a fully remote company with people living and working
              across the world. This is the foundation of our culture. Together,
              we create a space for flexibility and growth, innovation, making
              work more fun and fulfilling.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.buttonGradient} to="/company/careers">
                See open roles
              </Link>
              <Link className={styles.buttonOutline} to="/company/about-us">
                Learn more how we operate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
