import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/DocsBot/Header';
import ContactForm from '/src/components/Contact/contactForm.jsx';
import Study from '../../components/Service/DocsBot/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';

import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - DocsBot"
        description="How DocsBot Answers Millions of Customer Questions by Scaling to 50,000+ Tenants with Weaviate"
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
