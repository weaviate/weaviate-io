import React from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '../components/PricingHeader';
import PricingCalculator from '../components/PricingCalculator';
import PricingPlan from '../components/PricingPlan';

export default function PricingPage() {
  return (
    <Layout>
      <PricingHeader />
      <PricingCalculator />
      <PricingPlan />
    </Layout>
  );
}
