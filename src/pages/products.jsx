import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/Pricing/Header';
import PricingPlan from '../components/Pricing/Plan';
import PricingCalculator from '../components/Pricing/Calculator';
import PricingFAQ from '../components/Pricing/FAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/Pricing/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Soc2 from '../components/Pricing/SOC2/soc2';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('serverless');
  const divStyle = {
    marginTop: '0px',
    // width: '440px',
  };

  useEffect(() => {
    const hashType = window.location.hash.substring(1); // Removes the '#' symbol
    if (hashType === 'byoc' || hashType === 'serverless') {
      setSelectedType(hashType);
    }
  }, []);

  return (
    <div className="custom-page noBG">
      <Layout>
        <PricingHeader
          selectedType={selectedType}
          handleSelected={setSelectedType}
        />

        {selectedType === 'serverless' ? (
          // Render Serverless content
          <>
            <PricingPlan />
            <PricingCalculator />
            <Soc2 socLight="dark" />
            <PricingFAQ faqType="Serverless" />
          </>
        ) : (
          // Render BYOC content
          <>
            <HybridBusinessCritical />
            <Soc2 socLight="light" />
            <PricingFAQ faqType="BYOC" />
          </>
        )}

        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
