import React, { useState } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/Pricing/Header';
import PricingCalculator from '../components/Pricing/Calculator';
import PricingPlan from '../components/Pricing/Plan';
import PricingFAQ from '../components/Pricing/FAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/Pricing/HybridBusinessCritical';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('saas');

  return (
    <div className="custom-page">
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
    </div>
  );
}
