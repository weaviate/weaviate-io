import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/Home/Redesign/Header';
import HomepageWhatYouCanDo from '/src/components/Home/Redesign/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/Home/Redesign/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/Home/Redesign/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/Home/Redesign/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/Home/Redesign/Testimonials';
import Resources from '/src/components/Home/Redesign/Resources';
import CTA from '/src/components/Home/Redesign/CTA';
import ContactForm from '/src/components/Home/Redesign/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout title="Welcome" description="Welcome to Weaviate">
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />
        <main>
          <HomepageLovedByDevelopers />
          <HomepageTestimonials />
          <HomepageWhatYouCanDo />
          <HomepageIntegrations />

          <Resources />
          <CTA />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
