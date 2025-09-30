import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/MarvelX/Header';
import ContactUsForm from '../../components/ContactUsForm';
import Study from '../../components/Service/MarvelX/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - MarvelX"
        description="How MarvelX is Scaling Insurance Processing at the Speed of AI with Weaviate"
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
