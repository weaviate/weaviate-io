import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Enterprise Dedicated</h1>
          <div className={styles.headerBox}>
            <p>
              Tailored for businesses seeking high performance, Weaviate’s
              Enterprise Dedicated solution provides the power of Weaviate on
              dedicated resources, ensuring consistent, high-speed results
              without the complexities of self-management.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="#contact-sales">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
