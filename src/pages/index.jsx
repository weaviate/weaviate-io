import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { MetaSEO } from '/src/theme/MetaSEO';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomeNext from '/src/components/HomeNext';

// The Organization and WebSite nodes for weaviate.io are emitted site-wide
// from docusaurus.config.js (plugin "inject-structured-data"), so this page
// only describes what is specific to it. The publisher reference below
// resolves against that site-wide Organization.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://weaviate.io/#software',
      name: 'Weaviate',
      url: 'https://weaviate.io/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description:
        'An open-source, AI-native vector database for building search, retrieval-augmented generation, and agentic applications.',
      publisher: {
        '@id': 'https://weaviate.io/#organization',
      },
    },
  ],
};

export default function HomeNextPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="The AI database developers love"
        description="Bring AI-native applications to life with less hallucination, data leakage, and vendor lock-in"
      >
        <MetaSEO img="og/website/home.jpg" />
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Head>
        <HomeNext />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
