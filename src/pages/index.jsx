import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '@site/src/theme/MetaSEO';

import HomepageHeader from '@site/src/components/Home/Header';
import HomepageFeatures from '@site/src/components/Home/Features';
import HomepageWhatYouCanDo from '@site/src/components/Home/WhatYouCanDo';
import HomepageLearn from '@site/src/components/Home/Learn';
import HomepageJoinCommunity from '@site/src/components/Home/JoinCommunity';
import HomepageReady from '@site/src/components/Home/Ready';
import HomepageNewsletter from '@site/src/components/Home/Newsletter';
import HomepageCompany from '@site/src/components/Home/Company';
import HomepageIntegrations from '@site/src/components/Home/Integrations';
import HomepageTestimonials from '@site/src/components/Home/Testimonials';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
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
  );
}
