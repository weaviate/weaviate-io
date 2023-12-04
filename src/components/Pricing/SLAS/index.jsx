import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import styles from './styles.module.scss';

export default function SlaPlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>SLAs (Serverless Pricing)</h2>
        </div>
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <PricingStandard />
            <PricingEnterprise />
            <PricingBusinessCritical />
          </div>
        </div>
      </div>
    </div>
  );
}
