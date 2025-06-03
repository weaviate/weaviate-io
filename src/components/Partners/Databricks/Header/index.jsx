import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function PartnersHeader() {
  return (
    <header>
      <div className={styles.partnersHead}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.leftGrid}>
              <p className={styles.title}>Weaviate + Databricks</p>
              <p className={styles.text}>
                Build sophisticated AI applications using the Spark Connector
                and Databricks’ Foundation Model APIs directly from Weaviate.
              </p>
            </div>
            <div className={styles.rightGrid}>
              <div className={styles.img} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
