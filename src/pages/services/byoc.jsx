import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/BYOC/Header/index.jsx';
import ServicePlan from '../../components/Service/BYOC/Plan/index.jsx';
import ContactUsForm from '../../components/ContactUsForm/index.jsx';
import Highlights from '../../components/Service/BYOC/Highlights/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '../../components/Service/BYOC/QuoteBox/quoteBox.jsx';
import Integrations from '../../components/Service/BYOC/Integrations/index.jsx';
import Availability from '../../components/Service/BYOC/Availability/index.jsx';

export default function BYOCPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="BYOC - Bring Your Own Cloud"
        description="Bring Your Own Cloud Dedicated Service"
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
