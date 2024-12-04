import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/Partners/awsreinvent/Header';
import UnlockSection from '/src/components/Partners/awsreinvent/UnlockSection';
import CallingSection from '/src/components/Partners/awsreinvent/CallingSection';
import Resources from '/src/components/Partners/awsreinvent/Resources/resources';
import Footer from '/src/components/Partners/awsreinvent/awsFooter';
import ContactForm from '../../../components/Partners/awsreinvent/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

const redirectToExternal = true;

export default function awsReinventPage() {
  useEffect(() => {
    if (redirectToExternal) {
      window.location.href = 'https://events.weaviate.io/aws-reinvent-2024';
    }
  }, []);

  if (redirectToExternal) {
    return (
      <div>
        <p>
          Redirecting to{' '}
          <a href="https://events.weaviate.io/aws-reinvent-2024">
            AWS Re:Invent 2024
          </a>
          ...
        </p>
      </div>
    );
  }

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
