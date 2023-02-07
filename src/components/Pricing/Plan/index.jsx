import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandbox from './sandbox';
import PricingStandard from './standard';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h2>Weaviate Cloud Services Saas</h2>
        <p>
          Our pricing is designed to give you all the capabilities to build and
          test your applications for free. <br /> When you are ready to move to
          production, simply pick a plan that best suits your needs.
        </p>
      </div>
      <div className={styles.planContainer}>
        <div className={styles.plan}>
          <PricingStandard />
          <PricingEnterprise />
          <PricingBusinessCritical />
        </div>
        <PricingSandbox />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonGradient}>
          Register for Private Beta
        </div>
        <div className={styles.buttonOutline}>
          Create a Free Sandbox
        </div>
      </div>
    </div>
  );
}
