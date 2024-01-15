import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function TechnologyPartners() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Technology Partners</h2>
          <p>
            If you have a complementary technology or product, we want to
            collaborate with you.<br></br> Integrate Weaviate's powerful AI
            capabilities into your solutions to provide enhanced value<br></br>{' '}
            to your customers.
          </p>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.techList}>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.intelPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.haystackPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.datadogPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.dithubPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.unstructuredPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.AI21Partners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.openAIPartners} />
              </Link>
            </div>
            <div className={styles.techBox}>
              <Link to="#">
                <span className={styles.nvidiaPartners} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
