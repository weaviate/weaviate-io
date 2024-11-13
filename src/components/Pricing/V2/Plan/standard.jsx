import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import CalculatorContainer from '/src/components/Pricing/V2/CalculatorContainer';

export default function PricingStandard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.pricingIcon}></div>
        <h3>Serverless Cloud</h3>
      </div>
      <div className={styles.price}>
        <p>We manage everything for you in the Weaviate Cloud.</p>
        <div className={styles.bottomPrice}>
          <span>Starting at $25 /mo</span>
          <p>per 1M vector dimensions stored/month</p>
        </div>
        <Link
          className={styles.buttonTryOutline}
          to="https://console.weaviate.cloud"
        >
          Get Started
        </Link>
      </div>

      <hr />
      <div className={styles.features}>
        <p>
          For building and prototyping with seamless scaling and flexible
          pay-as-you-go pricing.
        </p>
        <ul>
          <li>Serverless SaaS deployment</li>
          <li>Get started with a free trial in minutes</li>
          <li>Various SLA tiers to meet your needs</li>
        </ul>
        <button className={styles.buttonView} onClick={toggleExpand}>
          {isExpanded ? 'Hide details' : 'View pricing'}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          {/* This section replaces the modal content, shown inline */}
          <CalculatorContainer />
        </div>
      )}
    </div>
  );
}
