import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/FeedbackLoops/Header';
import Details from '/src/components/FeedbackLoops/Details';
import Blogs from '/src/components/FeedbackLoops/Blogs';
import CTA from '/src/components/FeedbackLoops/CTA';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="Generative Feedback Loops"
        description="Improve your dataset with generated content"
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
