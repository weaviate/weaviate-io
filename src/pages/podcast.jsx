import React from 'react';
import Layout from '@theme/Layout';
import PodcastHeader from '../components/PodcastHeader';
import PodcastCard from '../components/PodcastCard';

export default function PodcastPage() {
  return (
    <Layout>
      <PodcastHeader />
      <PodcastCard />
    </Layout>
  );
}
