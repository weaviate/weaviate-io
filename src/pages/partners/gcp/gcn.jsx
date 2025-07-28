import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/Partners/GCN/Header';
import UnlockSection from '/src/components/Partners/GCN/UnlockSection';
import CallingSection from '/src/components/Partners/GCN/CallingSection';
import Resources from '/src/components/Partners/GCN/Resources/resources';
import Footer from '/src/components/Partners/GCN/awsFooter';
import ContactForm from '../../../components/Partners/GCN/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function GCNPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Google Cloud Next 2024"
        description="Weaviate -  Google Cloud Next 2024"
      >
        <Header />
        <UnlockSection />
        <CallingSection />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
