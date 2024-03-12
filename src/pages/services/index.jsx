import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import ServiceHeader from '../../components/Service/Index/Header';
import ServicePlan from '../../components/Service/Index/Plan';
import ContactUsForm from '../../components/ContactUsForm';
import HybridBusinessCritical from '../../components/Service/Index/HybridBusinessCritical';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Integrations from '../../components/Service/Index/Integrations';

export default function ServicePage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Services Overview"
        description="Overview of Weaviate Services"
      >
        <ServiceHeader />
        <ServicePlan />
        <HybridBusinessCritical />
        <Integrations />
        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
