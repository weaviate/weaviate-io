import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/Morningstar/Header';
import ContactForm from '/src/components/Contact/contactForm.jsx';
import Study from '../../components/Service/Morningstar/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Morningstar"
        description="How Morningstar built a trustworthy, AI-driven financial data platform with Weaviate"
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
