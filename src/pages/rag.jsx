import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import HomepageHeader from '/src/components/RAG/Header';
import Details from '/src/components/RAG/Details';
import HomepageWhatYouCanDo from '/src/components/RAG/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/RAG/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/RAG/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/RAG/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/RAG/Testimonials';
import Resources from '/src/components/RAG/Resources';
import Blogs from '/src/components/RAG/Blogs';
import CTA from '/src/components/RAG/CTA';
import ContactForm from '/src/components/RAG/ContactForm/contactForm';
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
