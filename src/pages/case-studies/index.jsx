import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '/src/components/CaseStudies/Header';
import Main from '/src/components/CaseStudies/Main';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Studies"
        description="Read how companies are using Weaviate to build AI-powered applications."
      >
        <StudyHeader />
        <Main />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
