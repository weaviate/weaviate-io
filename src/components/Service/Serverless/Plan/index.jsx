import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import styles from './styles.module.scss';

export default function ServicePlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Highlights</h2>
          <span>
            All the features of our{' '}
            <Link to="/platform">AI-native vector database</Link>, plus:
          </span>
          <div className={styles.highlightSection}>
            <div className={styles.highlights}>
              <div className={styles.hlPoint}>Async indexing</div>
              <div className={styles.hlPoint}>Auto-schema enhancement</div>
              <div className={styles.hlPoint}>Choose from 5 cloud regions</div>
              <div className={styles.hlPoint}>
                Link your external Weaviate clusters
              </div>
            </div>
            <div className={styles.highlights}>
              <div className={styles.hlPoint}>High-availability optional</div>
              <div className={styles.hlPoint}>GUI for GraphQL queries</div>
              <div className={styles.hlPoint}>
                Collections definition and management
              </div>
            </div>
          </div>
          <h2>Ready to get started? Choose your plan.</h2>
          <p className={styles.subHeader}>
            Our pricing is based on dimensions stored and chosen SLA tier. The
            exact calculation can be found in the{' '}
            <Link className={styles.faqLink} to="/platform">
              FAQ
            </Link>{' '}
            (not inclusive of discounts and taxes).
          </p>
        </div>
        <div className={styles.planContainer} id="plan">
          <PricingSandBox />
        </div>
      </div>
    </div>
  );
}
