import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '../components/Partners/Header';
import StrategicPartners from '../components/Partners/StrategicPartners';
import TechnologyPartners from '../components/Partners/TechnologyPartners';
import SystemIntegrators from '../components/Partners/SystemIntegrators';
import PartnerOpportunities from '../components/Partners/PartnerOpportunities';
import PartnersFooter from '../components/Partners/PartnersFooter';
import ContactForm from '../components/Partners/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <Layout
        title="Partners"
        description="Learn more about our partners and how we work together to provide the best solutions for our customers."
      >
        <PartnersHeader />
        <StrategicPartners />
        <TechnologyPartners />
        <SystemIntegrators />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
