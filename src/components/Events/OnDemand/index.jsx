import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function OnDemand() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.marketTitle} id="on-demand-webinars">
          <h2 className={styles.marketText}>On-demand webinars</h2>
        </div>
        <div className={styles.buttons}>
          <div className={styles.marketBox}>
            <p>
              Intro to Hybrid Search: Combining the power of keyword and vector
              search
            </p>
            <Link to="https://events.weaviate.io/hybrid-search-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Multimodal Product Discovery: The next generation of search for
              ecommerce
            </p>
            <Link to="https://events.weaviate.io/ecommerce-webinar">
              {'Watch now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>Building an AI-Native Foundation for Enterprise Applications</p>
            <Link to="https://events.weaviate.io/enterprise-apps-webinar">
              {'Watch now >'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
