import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <h1>Integration Ecosystem</h1>
          <div className={styles.headerBox}>
            <p>
              Find new ways to extend your applications and infrastructure with
              our integration ecosystem.
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <Link
              to="https://weaviate.io/developers/weaviate/model-providers"
              className={styles.buttonGradient}
            >
              Model Providers
            </Link>
            <Link
              to="https://weaviate.io/developers/integrations"
              className={styles.buttonOutline}
            >
              Integrations
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
