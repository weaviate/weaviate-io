import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SlaPlan from '../SLAS';

export default function Embeddings() {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.soc2Container}>
        <div className={styles.box}>
          <div className={styles.tableFooter}>
            <div className={styles.tfSection}>
              <div className={styles.tfHeader}>
                <div className={styles.tableFooterIcon}></div>
                <div className={styles.tableFooterText}>
                  Weaviate Embeddings
                </div>
              </div>
              <p>Access various embedding models hosted in Weaviate Cloud.</p>
            </div>
            <div className={styles.iconSection}>
              <div className={styles.hrIcon}></div>
              <div className={styles.tokenSection}>
                <div className={styles.tokenLine}>
                  <p>Snowflake arctic-embed-m-v1.5</p>
                  {'  '}
                  <p>
                    <strong>$0.025 / 1M tokens</strong>
                  </p>
                </div>
                <div className={styles.tokenLine}>
                  <p>Snowflake arctic-embed-m-v2.0</p>
                  {'  '}
                  <p>
                    <strong>$0.040 / 1M tokens</strong>
                  </p>
                </div>
              </div>
            </div>
            <Link className={styles.buttonGradient} to="/product/embeddings">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
