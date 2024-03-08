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
          <h2>Accelerate your success</h2>
          <p>
            We offer a variety of cloud services and subscriptions to help our
            customers and open source community deliver valuable solutions. We
            can build a tailored plan based on your deployment, training, and
            support needs.
          </p>
        </div>
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <PricingStandard />
            <PricingEnterprise />
            <PricingBusinessCritical />
          </div>
          <PricingSandBox />
        </div>
      </div>
    </div>
  );
}
