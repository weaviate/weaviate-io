import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/Kapa/Header';
import ContactForm from '/src/components/Contact/contactForm.jsx';
import Study from '../../components/Service/Kapa/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Kapa"
        description="How Kapa delivers enterprise-ready AI with Weaviate"
      >
        <StudyHeader />
        <Study />
        <Integrations />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
