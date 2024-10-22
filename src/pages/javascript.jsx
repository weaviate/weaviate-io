import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Recipes from '/src/components/Javascript/Recipes';
import Steps from '/src/components/Javascript/Steps';
import Details from '/src/components/Javascript/Details';
import CTA from '/src/components/Javascript/CTA';
import List from '/src/components/Javascript/List';
import Tabs from '/src/components/Javascript/Tabs';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Resources from '/src/components/Javascript/Resources';
import BuildWith from '../components/Javascript/BWW';

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
          <Resources />
          <BuildWith />
          <Recipes />
          <List />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
