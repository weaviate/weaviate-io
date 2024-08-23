import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Header from '../../components/Community/Demos/Header';
import Highlights from '../../components/Community/Demos/Highlights';
import Projects from '../../components/Community/Demos/Projects';
import Opensource from '../../components/Community/Demos/Opensource';
import ThemeSwitch from '../../components/ThemeSwitch';

export default function DemoPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Demos"
        description="In-house Weaviate built projects leveraging Weaviate, AI-Native vector database."
      >
        <MetaSEO img="og/content/Demos-OG.jpg" />
        <Header />
        <Highlights />
        <Projects />
        <Opensource />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
