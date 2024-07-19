import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import KnowledgeHeader from '/src/components/Marketplace/Knowledgeheader';
import AppFilter from '/src/components/Marketplace/AppFilter';
import KnowledgeBase from '/src/components/Marketplace/knowledgebase';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
  };
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Knowledge Cards"
        description="Unlock the power of vector search. Our guides will help you conquer vector embeddings and build better AI applications."
      >
        <MetaSEO img="og/content/knowledgecards.jpg" />

        <AppFilter searchQuery={searchQuery} />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
