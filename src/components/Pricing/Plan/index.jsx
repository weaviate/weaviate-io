import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import Marketplace from '../Marketplace';
import PriceList from './priceList';
import Sandbox from '../CalculatorContainer/sandbox';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <PricingStandard />
            <PricingEnterprise />
            <PricingBusinessCritical />
          </div>
          <Marketplace />
          <PricingSandBox />
        </div>
        <PriceList />
      </div>
    </div>
  );
}
