import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Header from '/src/components/Marketplace/Header';
import AppFilter from '/src/components/Marketplace/AppFilter';
import KnowledgeBase from '/src/components/Marketplace/knowledgebase';
import CTA from '/src/components/HybridSearch/CTA';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
  };
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Marketplace"
        description="Unlock more with addons and tools. Find the right Weaviate extension for your project."
      >
        <MetaSEO img="og/content/knowledgecards.jpg" />
        <Header />
        <AppFilter searchQuery={searchQuery} />
        <CTA />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
