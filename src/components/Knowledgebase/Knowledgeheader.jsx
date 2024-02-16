import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function KnowledgeHeader() {
  return (
    <header>
      <div className="container">
        <div className={styles.box}>
          <h1>Knowledge Cards</h1>
          <div className={styles.headerBox}>
            <p className="text-center">
              Unlock the power of vector search. Our guides will help you
              conquer vector embeddings and build better AI applications.
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="/developers/weaviate">
            Documentation
          </Link>
          <Link
            className={styles.buttonOutline}
            to="https://console.weaviate.cloud/"
          >
            Try Now
          </Link>
        </div>
      </div>
    </header>
  );
}
