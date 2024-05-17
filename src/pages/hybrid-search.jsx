import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/HybridSearch/Header';
import Details from '/src/components/HybridSearch/Details';
import HomepageWhatYouCanDo from '/src/components/HybridSearch/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/HybridSearch/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/HybridSearch/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/HybridSearch/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/HybridSearch/Testimonials';
import Resources from '/src/components/HybridSearch/Resources';
import Blogs from '/src/components/HybridSearch/Blogs';
import CTA from '/src/components/HybridSearch/CTA';
import ContactForm from '/src/components/HybridSearch/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout title="Welcome" description="Welcome to Weaviate">
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />
        <main>
          <Details />
          <Blogs />
          <CTA />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
