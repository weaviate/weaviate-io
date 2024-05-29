import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import KnowledgeHeader from '/src/components/Knowledgebase/Knowledgeheader';
import KnowledgeBase from '/src/components/Knowledgebase/knowledgebase';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
  };
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Knowledge Cards"
        description="Learn core concepts and terminology"
      >
        <MetaSEO img="og/content/knowledgecards.jpg" />
        <KnowledgeHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <KnowledgeBase searchQuery={searchQuery} />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
