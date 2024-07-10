import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/Partners/awsreinvent/Header';
import UnlockSection from '/src/components/Partners/awsreinvent/UnlockSection';
import CallingSection from '/src/components/Partners/awsreinvent/CallingSection';
import Resources from '/src/components/Partners/awsreinvent/Resources/resources';
import Footer from '/src/components/Partners/awsreinvent/awsFooter';
import ContactForm from '../../../components/Partners/awsreinvent/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function awsReinventPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="AWS Re:Invent 2023"
        description="Weaviate -  AWS Re:Invent 2023"
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
