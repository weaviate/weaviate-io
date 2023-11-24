import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Weaviate Cloud Services Pricing</h2>
          <p>
            Our ecosystem is designed to give you the capabilities to build and
            test your applications for free. When you are ready to move to
            production, simply pick a plan that best suits your needs.
          </p>
        </div>
        <div className={styles.planContainer}>
          <PricingSandBox />
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
