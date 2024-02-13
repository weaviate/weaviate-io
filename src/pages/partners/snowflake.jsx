import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '/src/components/Partners/Snowflake/Header';
import EnterpriseSupport from '/src/components/Partners/Snowflake/EnterpriseSupport';
import Integration from '/src/components/Partners/Snowflake/Integration';
import Resources from '/src/components/Partners/Snowflake/Resources/resources';
import Footer from '/src/components/Partners/Snowflake/awsFooter';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Partners | Snowflake"
        description="Explore our Snowflake partner page to learn more about our partnership and how we can help you with your cloud journey."
      >
        <PartnersHeader />
        <EnterpriseSupport />
        <Integration />
        <Resources />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
