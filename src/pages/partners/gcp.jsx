import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '/src/components/Partners/gcp/Header';
import EnterpriseSupport from '/src/components/Partners/gcp/EnterpriseSupport';
import Integration from '/src/components/Partners/gcp/Integration';
import Resources from '/src/components/Partners/gcp/Resources/resources';
import Video from '../../components/Partners/gcp/Video';
import Footer from '/src/components/Partners/gcp/Footer';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Partners | Google Cloud"
        description="Explore our Google Cloud partner page to learn more about our partnership and how we can help you with your cloud journey."
      >
        <PartnersHeader />
        <EnterpriseSupport />
        <Integration />

        <Resources />
        <Footer />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
