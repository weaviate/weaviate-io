import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import PricingHeader from '/src/components/Pricing/Header';
import PricingCalculator from '/src/components/Pricing/Calculator';
import PricingPlan from '/src/components/Pricing/Plan';
import PricingFAQ from '/src/components/Pricing/FAQ';
import ContactUsForm from '/src/components/ContactUsForm';

export default function PricingPage() {
  return (
    <Layout>
      <MetaSEO img="og/wcs/_title.jpg" />
      <PricingHeader />
      <PricingCalculator />
      <PricingPlan />
      <PricingFAQ />
      <ContactUsForm />
    </Layout>
  );
}