import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/Predori/Header';
import ContactForm from '/src/components/Contact/contactForm.jsx';
import Study from '../../components/Service/Predori/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Predori"
        description="How Predori cut operational costs over 80% with an AI-Powered Patent Intelligence Platform"
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
