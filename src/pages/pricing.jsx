import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../components/Pricing/HybridBusinessCritical/styles.module.scss';
import PricingHeader from '../components/Pricing/Header';
import PricingCalculator from '../components/Pricing/Calculator';
import PricingPlan from '../components/Pricing/Plan';
import PricingFAQ from '../components/Pricing/FAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/Pricing/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('saas');
  const divStyle = {
    marginTop: '0px',
    // width: '440px',
  };

  return (
    <div className="custom-page noBG">
      <Layout>
        <PricingHeader
          selectedType={selectedType}
          handleSelected={setSelectedType}
        />

        {selectedType === 'saas' ? (
          <>
            <PricingPlan />
            <PricingCalculator />
          </>
        ) : (
          <HybridBusinessCritical />
        )}
        <PricingFAQ />
        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
