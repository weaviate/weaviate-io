import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { MetaSEO } from '/src/theme/MetaSEO';

import SecurityFAQ from '/src/components/Security/FAQ';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function TestHIPAAFAQPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="HIPAA FAQ Test Page"
        description="Test page for HIPAA-related FAQ content"
      >
        {/* Prevent indexing */}
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>

        {/* Optional meta override */}
        <MetaSEO
          title="HIPAA FAQ Test"
          description="Internal test page for HIPAA FAQ content"
        />

        <SecurityFAQ faqType="HIPAA" />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
