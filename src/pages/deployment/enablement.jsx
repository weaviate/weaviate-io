import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '/src/components/Service/EducationSupport/Header/index.jsx';
import ServicePlan from '/src/components/Service/EducationSupport/Plan/index.jsx';
import ContactUsForm from '/src/components/Contact/contactForm.jsx';
import Highlights from '/src/components/Service/EducationSupport/Highlights/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '/src/components/Service/EducationSupport/QuoteBox/quoteBox.jsx';
import Integrations from '/src/components/Service/EducationSupport/Integrations/index.jsx';

export default function EducationandSupportPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Vector Database Training & Enablement"
        description="Get vector database tutorials, training courses, resources, and support for builders of all levels. We’re with you on your AI journey"
      >
        <ServiceHeader />
        <ServicePlan />
        <QuoteBox />
        <Integrations />
        <Highlights />
        <ContactUsForm theme="dark" />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
