import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Learn/Header';
import GetStarted from '/src/components/Learn/GetStarted';
import Documentation from '/src/components/Learn/Documentation';
import Examples from '/src/components/Learn/Examples';
import Guides from '/src/components/Learn/Guides';
import GoFurther from '/src/components/Learn/Further';
import Resources from '/src/components/Learn/Resources';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Learning Centre"
        description="Training courses, resources, and support options for builders of all levels. We’re with you on your AI journey."
      >
        <MetaSEO img="og/website/home.jpg" />
        <Header />
        <main>
          <Resources />
          <GetStarted />
          <Guides />
          <Documentation />
          <Examples />
          <GoFurther />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
