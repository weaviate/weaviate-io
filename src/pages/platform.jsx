import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import PlatformHeader from '/src/components/Platform/Header/index.jsx';
import SOC2 from '/src/components/Platform/SOC2/soc2';
import SafetyTypes from '/src/components/Platform/SafetyTypes';
import Integrations from '/src/components/Platform/Integrations';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function PlatformPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Open Source Vector Database"
        description="Simplify the development of AI applications and enable developers of all levels to build, iterate, and scale AI capabilities faster."
      >
        <MetaSEO />
        <PlatformHeader />
        <SOC2 socLight="light" />
        <SafetyTypes />
        <Integrations />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
