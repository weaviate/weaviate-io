import React from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/Serverless/Header/index.jsx';
import ServicePlan from '../../components/Service/Serverless/Plan/index.jsx';
import ContactUsForm from '../../components/Contact/contactForm.jsx';
import CalculatorContainer from '../../components/Service/Serverless/CalculatorContainer/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import QuoteBox from '../../components/Service/Serverless/QuoteBox/quoteBox.jsx';
import Integrations from '../../components/Service/Serverless/Integrations/index.jsx';

export default function ServerlessPage() {
  return (
    <div className="custom-page noBG">
      <Layout title="Serverless Cloud" description="Serverless Cloud Service">
        <ServiceHeader />
        <ServicePlan />
        <CalculatorContainer />
        <QuoteBox />
        <Integrations />
        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
