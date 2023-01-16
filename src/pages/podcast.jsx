import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '@site/src/theme/MetaSEO';

import PodcastHeader from '../components/PodcastHeader';
import PodcastCard from '../components/PodcastCard';

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
