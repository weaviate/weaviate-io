import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomeNext from '/src/components/HomeNext';

export default function HomeNextPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="New Homepage Draft"
        description="Homepage redesign preview"
      >
        <MetaSEO img="og/website/home.jpg" />
        <HomeNext />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
