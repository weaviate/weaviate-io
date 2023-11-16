import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '../components/Partners/Header';
import TechnologyPartners from '../components/Partners/TechnologyPartners';
import PartnerOpportunities from '../components/Partners/PartnerOpportunities';
import PartnersFooter from '../components/Partners/PartnersFooter';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <PartnersHeader />
        <TechnologyPartners />
        <PartnerOpportunities />
        <PartnersFooter />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
