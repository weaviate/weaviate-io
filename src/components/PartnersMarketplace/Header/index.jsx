import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Partner integrations</h1>
          <div className={styles.headerBox}>
            <p>
              Find new ways to extend your applications and infrastructure with
              our partner integrations.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
