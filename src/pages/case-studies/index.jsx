import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '/src/components/CaseStudies/Header';
import ContactUsForm from '/src/components/ContactUsForm';
import Study from '/src/components/CaseStudies/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '/src/components/CaseStudies/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Instabase"
        description="How Instabase delivers enterprise-ready AI with Weaviate"
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
