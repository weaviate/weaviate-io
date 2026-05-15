import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/Loti/Header';
import ContactForm from '/src/components/Contact/contactForm.jsx';
import Study from '../../components/Service/Loti/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Loti"
        description="How Loti AI fights likeness infringement and digital impersonation with one of the world’s largest vector database deployments"
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
