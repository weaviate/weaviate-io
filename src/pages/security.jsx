import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import AboutUsHeader from '/src/components/Security/header';
import SOC2 from '/src/components/Security/SOC2/soc2';
import SafetyTypes from '/src/components/Security/SafetyTypes';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function SecurityPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO />
        <AboutUsHeader />
        <SOC2 socLight="dark" />
        <SafetyTypes />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
