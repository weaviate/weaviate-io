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
//
// The ItemList mirrors the "Platform Services" section rendered further down
// this page by src/components/HomeNext/sections/Capabilities/index.jsx: same
// four services, same names, same order, same destinations. If that section
// changes, change this list with it. A list that does not match what the page
// shows is worse than no list at all.
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
    {
      '@type': 'ItemList',
      '@id': 'https://weaviate.io/#platform-services',
      name: 'Weaviate platform services',
      description:
        'The four platform services listed on the weaviate.io homepage, each linking to its own page.',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 4,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Vector Database',
          description:
            'Store, index, and search high-dimensional vectors at any scale. The foundation for search, RAG, and agents.',
          url: 'https://weaviate.io/platform',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Query Agent',
          description:
            'Ask questions in natural language. Query Agent translates intent into optimized database queries automatically.',
          url: 'https://weaviate.io/product/query-agent',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Embeddings',
          description:
            'Built-in vector generation from text, images, and more. No external embedding pipeline required.',
          url: 'https://weaviate.io/product/embeddings',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Engram',
          description:
            'Create personalized AI experiences that learn and adapt to each user over time.',
          url: 'https://weaviate.io/product/engram',
        },
      ],
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
