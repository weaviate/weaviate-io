import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import PartnersHeader from '/src/components/Partners/Databricks/Header';
import EnterpriseSupport from '/src/components/Partners/Databricks/EnterpriseSupport';
import Integration from '/src/components/Partners/Databricks/Integration';
import Resources from '/src/components/Partners/Databricks/Resources/resources';
import Footer from '/src/components/Partners/Databricks/awsFooter';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Head from '@docusaurus/Head';

export default function PartnersPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Partners | Databricks"
        description="Build sophisticated AI applications leveraging Databricks’ Foundation Model APIs directly from Weaviate."
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
