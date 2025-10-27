import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/Pricing/V2/Header';

import PricingTiers from '../components/Pricing/V2/TiersUpdate/index.jsx';
import CompareTable from '../components/Pricing/V2/CompareTable/index.jsx';
import Availability from '../components/Pricing/V2/Availablity/index.jsx';
import AddOnsSection from '../components/Pricing/V2/AddOns/index.jsx';
import PriceList from '../components/Pricing/V2/PriceList/index.jsx';
import PricingPlan from '../components/Pricing/V2/Plan';
import PricingFAQ from '../components/Pricing/V2/FAQ';
import ContactForm from '/src/components/Pricing/V2/ContactForm/contactForm';
import HybridBusinessCritical from '../components/Pricing/V2/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';
import SecurityCompliance from '../components/Pricing/V2/SOC2/soc2';
import CustomScriptLoader from '../components/scriptSwitch/index.jsx';
import { PriceCalculator } from '../components/Pricing/PriceCalculator/PriceCalculator';



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
      <Layout
        title="Vector Database Pricing"
        description="Compare pricing options for our different levels of vector database services and solutions."
      >

        {selectedType === 'serverless' ? (
          // Render Serverless content
          <>
            <PricingTiers />
            <div className="container" id="calculator">
              <PriceCalculator />
            </div>

            <CompareTable />
            <Availability />
            <AddOnsSection />
            <PriceList />
            <SecurityCompliance theme="dark" />
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

        <ContactForm />
      </Layout>
      <ThemeSwitch />
      <CustomScriptLoader />
    </div>
  );
}
