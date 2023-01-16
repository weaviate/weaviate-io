import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '@site/src/theme/MetaSEO';

import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageWhatYouCanDo from '@site/src/components/HomepageWhatYouCanDo';
import HomepageLearn from '@site/src/components/HomepageLearn';
import HomepageJoinCommunity from '@site/src/components/HomepageJoinCommunity';
import HomepageReady from '@site/src/components/HomepageReady';
import HomepageNewsletter from '@site/src/components/HomepageNewsletter';
import HomepageCompany from '@site/src/components/HomepageCompany';
import HomepageIntegrations from '@site/src/components/HomepageIntegrations';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';

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
