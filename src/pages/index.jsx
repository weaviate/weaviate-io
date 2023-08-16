import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/Home/HeaderUpdate';
import HomepageFeatures from '/src/components/Home/FeaturesUpdate';
import HomepageWhatYouCanDo from '/src/components/Home/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/Home/LovedByDevelopers';
import HomepageLearn from '/src/components/Home/Learn';
import HomepageJoinCommunity from '/src/components/Home/JoinCommunityUpdate';
import HomepageReady from '/src/components/Home/Contact';
import HomepageNewsletter from '/src/components/Home/Newsletter';
import HomepageCompany from '/src/components/Home/Company';
import HomepageIntegrations from '/src/components/Home/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/Home/Testimonials';
import HomepageLatestInsights from '/src/components/Home/LatestInsights';
import HomepageContact from '/src/components/Home/Contact';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="custom-page noBG">
      <Layout title="Welcome" description="Welcome to Weaviate">
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageTestimonials />
          <HomepageWhatYouCanDo />
          <HomepageIntegrations />
          <HomepageLovedByDevelopers />
          <HomepageJoinCommunity />
          <HomepageLatestInsights />

          <HomepageReady />
        </main>
      </Layout>
    </div>
  );
}
