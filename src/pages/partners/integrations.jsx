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
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Partners | Snowflake"
        description="Explore our Snowflake partner page to learn more about our partnership and how we can help you with your cloud journey."
      >
        <Header />
        <CardFilter />

        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}