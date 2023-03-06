import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/Home/Header';
import HomepageFeatures from '/src/components/Home/Features';
import HomepageWhatYouCanDo from '/src/components/Home/WhatYouCanDo';
import HomepageLearn from '/src/components/Home/Learn';
import HomepageJoinCommunity from '/src/components/Home/JoinCommunity';
import HomepageReady from '/src/components/Home/Ready';
import HomepageNewsletter from '/src/components/Home/Newsletter';
import HomepageCompany from '/src/components/Home/Company';
import HomepageIntegrations from '/src/components/Home/Integrations';
import HomepageTestimonials from '/src/components/Home/Testimonials';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="custom-page">
      <Layout
        title="Welcome"
        description="Welcome to Weaviate"
      >
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageTestimonials />
          <HomepageWhatYouCanDo />
          <HomepageIntegrations />
          <HomepageLearn />
          <HomepageJoinCommunity />
          <HomepageReady />
          <HomepageNewsletter />
          <HomepageCompany />
        </main>
      </Layout>
    </div>
  );
}
