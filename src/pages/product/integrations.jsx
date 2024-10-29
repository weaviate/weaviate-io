import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/PartnersMarketplace/Header';
import CardFilter from '/src/components/PartnersMarketplace/CardsFilter';
import Integration from '/src/components/Partners/Snowflake/Integration';
import Resources from '/src/components/Partners/Snowflake/Resources/resources';
import Footer from '/src/components/Partners/Snowflake/awsFooter';
import ThemeSwitch from '/src/components/ThemeSwitch';
import ContactForm from '/src/components/Partners/ContactForm/contactForm';
import CTA from '/src/components/HybridSearch/CTA';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Product | Modules and Intergrations"
        description="Find new ways to extend your applications and infrastructure with our partner integrations."
      >
        <Header />
        <CardFilter />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
