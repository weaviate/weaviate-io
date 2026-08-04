import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { MetaSEO } from '/src/theme/MetaSEO';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomeNext from '/src/components/HomeNext';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://weaviate.io/#organization',
      name: 'Weaviate',
      url: 'https://weaviate.io/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://weaviate.io/img/site/weaviate-logo-square-dark.png',
      },
      sameAs: [
        'https://github.com/weaviate',
        'https://x.com/weaviate_io',
        'https://youtube.com/@Weaviate',
        'https://www.linkedin.com/company/weaviate-io',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://weaviate.io/#website',
      url: 'https://weaviate.io/',
      name: 'Weaviate',
      publisher: {
        '@id': 'https://weaviate.io/#organization',
      },
    },
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
