import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '/src/components/Pricing/HybridBusinessCritical/styles.module.scss';
import PricingHeader from '/src/components/Pricing/Header';
import PricingCalculator from '/src/components/Pricing/Calculator';
import PricingPlan from '/src/components/Pricing/Plan';
import PricingFAQ from '/src/components/Pricing/FAQ';
import ContactUsForm from '/src/components/ContactUsForm';
import HybridBusinessCritical from '/src/components/Pricing/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('hybrid');
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

        {selectedType === 'saas' ? <></> : <ContactUsForm />}
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
