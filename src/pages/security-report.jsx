import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import AboutUsHeader from '/src/components/Security-Report/header';
import Vuln from '/src/components/Security/Vuln/vuln';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function SecurityReportPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Report a Security Vulnerability"
        description="Trust, security, and privacy
        come first "
      >
        <MetaSEO />
        <AboutUsHeader />
        <Vuln socLight="dark" />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
