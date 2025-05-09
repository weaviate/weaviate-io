import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Community/BWW/Heroes';
import Header from '../../components/Community/BWW/Header';
import Picks from '../../components/Community/BWW/Picks';
import ProjectFilter from '../../components/Community/BWW/ProjectFilter';
import Analytics from '../../components/Community/BWW/Analytics';
import Opensource from '../../components/Community/BWW/Opensource';
import ThemeSwitch from '../../components/ThemeSwitch';

export default function BWWPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Build With Weaviate"
        description="Build something cool with Weaviate? Let us know so we can help spread the word."
      >
        <MetaSEO img="og/content/BWW-OG.jpg" />
        <Header />
        <Picks />
        <ProjectFilter />
        <Hero />
        <Analytics />
        <Opensource />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
