import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/HybridSearch/Header';
import Details from '/src/components/HybridSearch/Details';
import Blogs from '/src/components/HybridSearch/Blogs';
import CTA from '/src/components/HybridSearch/CTA';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="Hybrid Search"
        description="Take search to new
AI-powered heights"
      >
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />
        <main>
          <Details />
          <Blogs />
          <CTA />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
