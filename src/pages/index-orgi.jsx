import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomeNext from '/src/components/HomeNext';

export default function HomeNextPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="The AI database developers love"
        description="Bring AI-native applications to life with less hallucination, data leakage, and vendor lock-in"
      >
        <MetaSEO img="og/website/home.jpg" />
        <HomeNext />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
