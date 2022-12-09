import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageWhatYouCanDo from '@site/src/components/HomepageWhatYouCanDo';
import HomepageLearn from '@site/src/components/HomepageLearn';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageWhatYouCanDo />
        <HomepageLearn />
      </main>
    </Layout>
  );
}
