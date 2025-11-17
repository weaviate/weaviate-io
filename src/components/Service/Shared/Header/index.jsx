import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function ServiceHeader() {
  return (
    <header className={styles.headerSecurity}>
      <div className="container">
        <div className={styles.box}>
          <p className={styles.headText}>Shared Cloud</p>
          <div className={styles.headerBox}>
            <h1>Fully-managed Vector Database on our shared cloud.</h1>
            <p>
              The easiest way to get started with Weaviate. Get the full power
              of our <Link to="/platform">AI-native vector database</Link>{' '}
              without worrying about infrastructure and operations. Experiment
              quickly with POCs and launch full production use cases.
            </p>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.buttonGradient} to="/go/console">
              Try Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
