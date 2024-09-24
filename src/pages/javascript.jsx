import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Javascript/Header';
import Details from '/src/components/Javascript/Details';
import Use from '/src/components/Javascript/Use';
import CTA from '/src/components/Javascript/CTA';
import List from '/src/components/Javascript/List';
import Tabs from '/src/components/Javascript/Tabs'
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="AI-Native Javascript"
        description="Build AI-Native Applications with Javascript"
      >
        <MetaSEO img="og/website/home.jpg" />
        <CTA />
        <main>
          <Details />
          <Tabs />
          <Header />
          <List />
          {/* <Blogs /> */}
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}