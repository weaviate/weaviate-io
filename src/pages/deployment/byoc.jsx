import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '/src/components/Service/BYOC/Header/index.jsx';
import ServicePlan from '/src/components/Service/BYOC/Plan/index.jsx';
import ContactUsForm from '/src/components/Contact/contactForm';
import Highlights from '/src/components/Service/BYOC/Highlights/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '/src/components/Service/BYOC/QuoteBox/quoteBox.jsx';
import Integrations from '/src/components/Service/BYOC/Integrations/index.jsx';
import Availability from '/src/components/Service/BYOC/Availability/index.jsx';

export default function BYOCPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="BYOC Vector Database"
        description="Seamlessly integrate our BYOC vector database with AWS, GCP, and Azure to ensure optimized performance and security."
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
