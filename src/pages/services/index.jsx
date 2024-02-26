import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/Header';
import ServicePlan from '../../components/Service/Plan';
import ServiceCalculator from '../../components/Service/Calculator';
import ServiceFAQ from '../../components/Service/FAQ';
import ContactUsForm from '../../components/ContactUsForm';
import HybridBusinessCritical from '../../components/Service/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Soc2 from '../../components/Service/SOC2/soc2';
import WCS from '../../components/Service/WCS';

export default function ServicePage() {
  const [selectedType, setSelectedType] = useState('serverless');
  const divStyle = {
    marginTop: '0px',
    // width: '440px',
  };

  useEffect(() => {
    const hashType = window.location.hash.substring(1); // Removes the '#' symbol
    if (hashType === 'byoc' || hashType === 'serverless') {
      setSelectedType(hashType);
    }
  }, []);

  return (
    <div className="custom-page noBG">
      <Layout title="Service" description="Service models">
        <ServiceHeader />

        {selectedType === 'serverless' ? (
          // Render Serverless content
          <>
            <WCS socLight="light" />
            <ServicePlan />
            <HybridBusinessCritical />
            <Soc2 socLight="dark" />
            <ServiceFAQ faqType="Serverless" />
          </>
        ) : (
          // Render BYOC content
          <>
            <HybridBusinessCritical />
            <Soc2 socLight="light" />
            <ServiceFAQ faqType="BYOC" />
          </>
        )}

        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
