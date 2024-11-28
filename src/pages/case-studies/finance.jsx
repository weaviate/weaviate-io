import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '/src/components/Service/Finance/Header';
import ContactUsForm from '/src/components/ContactUsForm';
import Study from '/src/components/Service/Finance/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Integrations from '/src/components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Finance"
        description="How a leading financial data company commercialized AI in under a year"
      >
        <StudyHeader />
        <Study />
        <Integrations />
        <ContactUsForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
