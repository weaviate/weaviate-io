import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import PricingBusinessCritical from './businessCritical';
import PricingEnterprise from './enterprise';
import PricingSandBox from './sandbox';
import PricingStandard from './standard';
import Marketplace from '../../Marketplace';
import PriceList from './priceList';
import CalculatorContainer from '/src/components/Pricing/V3/CalculatorContainer';
import EnterpriseContainer from '/src/components/Pricing/EnterpriseContainer';

export default function PricingPlan() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const calculatorRef = useRef(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.planContainer}>
          <div className={styles.plan}>
            <PricingStandard onClick={() => handleSelectPlan('standard')} />
            <PricingEnterprise onClick={() => handleSelectPlan('enterprise')} />
            <PricingBusinessCritical
              onClick={() => handleSelectPlan('businessCritical')}
            />
          </div>
          <div ref={calculatorRef} className={styles.calculatorContainer}>
            {selectedPlan === 'standard' && <CalculatorContainer />}
            {selectedPlan === 'enterprise' && <EnterpriseContainer />}
            {/* Add more conditions for other plans if needed */}
          </div>
          <Marketplace />
          <PricingSandBox />
        </div>
        <PriceList />
      </div>
    </div>
  );
}
