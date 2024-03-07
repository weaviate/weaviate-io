import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/EducationSupport/Header/index.jsx';
import ServicePlan from '../../components/Service/EducationSupport/Plan/index.jsx';
import ContactUsForm from '../../components/ContactUsForm/index.jsx';
import Highlights from '../../components/Service/EducationSupport/Highlights/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '../../components/Service/EducationSupport/QuoteBox/quoteBox.jsx';
import Integrations from '../../components/Service/EducationSupport/Integrations/index.jsx';

export default function EducationandSupportPage() {
  return (
    <div className="custom-page noBG">
      <Layout title="Education and Support" description="Education and Support">
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
