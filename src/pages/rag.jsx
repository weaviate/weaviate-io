import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/RAG/Header';
import Details from '/src/components/RAG/Details';
import Blogs from '/src/components/RAG/Blogs';
import CTA from '/src/components/RAG/CTA';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="Retrieval Augmented Generation"
        description="Build secure, explainable generative AI applications"
      >
        <MetaSEO img="og/website/home.jpg" />
        <Header />
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
