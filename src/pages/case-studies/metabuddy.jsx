import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '../../components/Service/Metabuddy/Header';
import ContactUsForm from '../../components/ContactUsForm';
import Study from '../../components/Service/Metabuddy/Study';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Integrations from '../../components/Service/CaseStudy/Integrations';

export default function CaseStudyPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Case Study - Metabuddy"
        description="How Metabuddy Unifies Wellness Data and Powers Personalized AI Coaching With Query Agent"
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
