import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '/src/components/CaseStudies/V2/Header';
import ContactUsForm from '/src/components/ContactUsForm';
import Main from '/src/components/CaseStudies/V2/Main';
import Study from '/src/components/CaseStudies/V2/Study';
import Stories from '/src/components/CaseStudies/V2/Stories';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '/src/components/CaseStudies/V2/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Morningstar"
        description="How Morningstar built a trustworthy, AI-driven financial data platform with Weaviate"
      >
        <StudyHeader />
        <Main />
        <Stories />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
