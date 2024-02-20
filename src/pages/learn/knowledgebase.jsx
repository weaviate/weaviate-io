import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import KnowledgeHeader from '/src/components/Knowledgebase/Knowledgeheader';
import KnowledgeBase from '/src/components/Knowledgebase/knowledgebase';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function KnowledgeBasePage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO />
        <KnowledgeHeader />

        <KnowledgeBase />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
