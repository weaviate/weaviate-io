import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import PodcastHeader from '/src/components/Podcast/Header';
import PodcastCard from '/src/components/Podcast/Card';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function PodcastPage() {
  return (
    <div className="podcast-page">
      <Layout
        title="Weaviate Podcasts"
        description="Welcome to Weaviate Podcasts"
      >
        <MetaSEO img="og/content/podcast.jpg" />
        <PodcastHeader />
        <PodcastCard />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
