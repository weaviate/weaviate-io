import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function OnDemand() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.marketTitle}>
          <h2 className={styles.marketText}>On-demand webinars</h2>
        </div>
        <div className={styles.buttons}>
          <div className={styles.marketBox}>
            <p>
              Intro to Hybrid Search: Combining the power of keyword and vector
              search
            </p>
            <Link to="https://events.weaviate.io/hybrid-search-webinar">
              {'Register now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>
              Multimodal Product Discovery: The next generation of search for
              ecommerce
            </p>
            <Link to="https://events.weaviate.io/ecommerce-webinar">
              {'Register now >'}
            </Link>
          </div>
          <div className={styles.marketBox}>
            <p>How to build an ai-native foundation for enterprise apps</p>
            <Link to="https://webinars.devops.com/how-to-build-an-ai-native-foundation-for-enterprise-apps">
              {'Register now >'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
