import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import PricingHeader from '/src/components/Pricing/Header';
import PricingCalculator from '/src/components/Pricing/Calculator';
import PricingPlan from '/src/components/Pricing/Plan';
import HybridBusinessCritical from '/src/components/Pricing/HybridBusinessCritical';
import PricingFAQ from '/src/components/Pricing/FAQ';
import ContactUsForm from '/src/components/ContactUsForm';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('saas');

  return (
    <Layout>
      <MetaSEO img="og/wcs/_title.jpg" />
      <PricingHeader selectedType={selectedType} handleSelected={setSelectedType} />
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
  );
}
