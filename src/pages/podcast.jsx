import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import PodcastHeader from '/src/components/Podcast/Header';
import PodcastCard from '/src/components/Podcast/Card';

export default function PodcastPage() {
  return (
    <Layout
      title="Weaviate Podcasts"
      description="Welcome to Weaviate Podcasts"
    >
      <MetaSEO img="og/content/podcast.jpg" />
      <PodcastHeader />
      <PodcastCard />
    </Layout>
  );
}
