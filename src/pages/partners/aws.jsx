import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '/src/components/Partners/aws/Header';
import EnterpriseSupport from '/src/components/Partners/aws/EnterpriseSupport';
import Integration from '/src/components/Partners/aws/Integration';
import Resources from '/src/components/Partners/aws/Resources/resources';
import Video from '../../components/Partners/aws/Video';
import Footer from '/src/components/Partners/aws/awsFooter';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <PartnersHeader />
        <EnterpriseSupport />
        <Integration />
        <Video />
        <Resources />
        <Footer />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
