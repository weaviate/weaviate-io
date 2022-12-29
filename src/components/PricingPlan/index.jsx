import React from 'react';
import PricingBusinessCritical from '../PricingBusinessCritical';
import PricingEnterprise from '../PricingEnterprise';
import PricingSandBox from '../PricingSandBox';
import PricingStandard from '../PricingStandard';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Pick your plan</h2>
        <p>
          Our pricing is designed to give you all the capabilities to build and
          test your applications for free. When you are ready to move to
          production, simply pick a plan that best suits your needs.
        </p>
      </div>
      <PricingSandBox />
      <div className={styles.plan}>
        <PricingStandard />
        <PricingEnterprise />
        <PricingBusinessCritical />
      </div>
    </div>
  );
}
