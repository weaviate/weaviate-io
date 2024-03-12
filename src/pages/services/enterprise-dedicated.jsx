import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/EnterpriseDedicated/Header';
import ServicePlan from '../../components/Service/EnterpriseDedicated/Plan';
import ContactUsForm from '../../components/ContactUsForm';
import Highlights from '../../components/Service/EnterpriseDedicated/Highlights';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '../../components/Service/EnterpriseDedicated/QuoteBox/quoteBox.jsx';
import Integrations from '../../components/Service/EnterpriseDedicated/Integrations/index.jsx';
import Availability from '../../components/Service/EnterpriseDedicated/Availability/index.jsx';

export default function EDPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Enterprise Dedicated"
        description="Enterprise Dedicated Service"
      >
        <ServiceHeader />
        <ServicePlan />
        <QuoteBox />
        <Integrations />
        <Highlights />
        <Availability />
        <ContactUsForm theme="dark" />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
