import Link from '@docusaurus/Link';
import React from 'react';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import Calculator from '/src/components/Pricing/V2/Calculator';
import CalculatorCard from './CalculatorCard';
import Marketplace from '/src/components/Pricing/Marketplace';
import PriceList from './priceList';
import Sandbox from '/src/components/Pricing/CalculatorContainer/sandbox';
import styles from './styles.module.scss';

export default function PricingPlan() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <PricingStandard />

            <Calculator />
          </div>
          <div className={styles.plan}>
            <PricingEnterprise />
            <PricingBusinessCritical />
          </div>
          <Marketplace />
          <PricingSandBox />
        </div>
      </div>
    </div>
  );
}
