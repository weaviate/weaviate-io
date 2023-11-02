import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/Products/Header';
import PricingPlan from '../components/Products/Plan';
import PricingCalculator from '../components/Products/Calculator';
import PricingFAQ from '../components/Products/FAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/Products/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Soc2 from '../components/Products/SOC2/soc2';

export default function ProductPage() {
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
