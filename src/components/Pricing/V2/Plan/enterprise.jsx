import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import EnterpriseContainer from '/src/components/Pricing/V2/EnterpriseContainer';

export default function PricingEnterprise() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={`${styles.pricingIcon} ${styles.enterprise}`}></div>
        <h3>Enterprise Cloud</h3>
      </div>
      <div className={styles.price}>
        <p>
          We manage everything for you in a dedicated instance in Weaviate
          Cloud.
        </p>
        <div className={styles.bottomPrice}>
          <span>from $2.64 / AIU</span>
          <p>AIU = AI Unit</p>
        </div>
        <Link className={styles.buttonTryOutline} to="#contact-sales">
          Contact Sales
        </Link>
      </div>

      <hr />
      <div className={styles.features}>
        <p>
          For deploying large-scale production use cases without the
          complexities of self-management.
        </p>
        <ul>
          <li>Dedicated resources for customer isolation</li>
          <li>Built for high-performance at large scale</li>
          <li>Optimize resource consumption with flexible storage tiers</li>
        </ul>
        <button className={styles.buttonView} onClick={toggleExpand}>
          {isExpanded ? 'Hide details' : 'View pricing'}
        </button>
      </div>

      {/* Expanded content shown inline */}
      <div
        className={`${styles.expandedContent} ${isExpanded ? styles.open : ''}`}
      >
        {isExpanded && <EnterpriseContainer />}
      </div>
    </div>
  );
}
