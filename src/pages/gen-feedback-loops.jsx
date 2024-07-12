import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/FeedbackLoops/Header';
import Details from '/src/components/FeedbackLoops/Details';
import HomepageWhatYouCanDo from '/src/components/FeedbackLoops/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/FeedbackLoops/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/FeedbackLoops/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/FeedbackLoops/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/FeedbackLoops/Testimonials';
import Resources from '/src/components/FeedbackLoops/Resources';
import Blogs from '/src/components/FeedbackLoops/Blogs';
import CTA from '/src/components/FeedbackLoops/CTA';
import ContactForm from '/src/components/FeedbackLoops/ContactForm/contactForm';
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
