import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/Dedicated/Header';
import ServicePlan from '../../components/Service/Dedicated/Plan';
import ContactUsForm from '../../components/Contact/contactForm';
import Highlights from '../../components/Service/Dedicated/Highlights';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '../../components/Service/Dedicated/QuoteBox/quoteBox.jsx';
import Integrations from '../../components/Service/Dedicated/Integrations/index.jsx';
import Availability from '../../components/Service/Dedicated/Availability/index.jsx';

export default function EDPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Dedicated Cloud Vector Database"
        description="Fully managed vector database on dedicated resources, ensuring consistent, high-speed results without the complexities of self-management."
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
