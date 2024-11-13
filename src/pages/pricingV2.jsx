import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '/src/components/Pricing/Header/index.jsx';
import PricingPlan from '/src/components/Pricing/V2/Plan/index.jsx';
import PricingCalculator from '/src/components/Pricing/Calculator/index.jsx';
import PricingFAQ from '/src/components/Pricing/FAQ/index.jsx';
import ContactUsForm from '/src/components/Contact/contactForm.jsx';
import HybridBusinessCritical from '/src/components/Pricing/HybridBusinessCritical/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Soc2 from '/src/components/Pricing/SOC2/soc2.jsx';
import CustomScriptLoader from '/src/components/scriptSwitch/index.jsx';
import PricingTable from '/src/components/Pricing/Table/index.jsx';
import CalculatorContainer from '/src/components/Pricing/CalculatorContainer/index.jsx';

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
      <Layout title="Pricing" description="Pricing models">
        <PricingHeader />

        {selectedType === 'serverless' ? (
          // Render Serverless content
          <>
            <PricingPlan />
            {/*   <PricingTable />
            <CalculatorContainer />

             <HybridBusinessCritical /> */}
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
      <CustomScriptLoader />
    </div>
  );
}
