import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Cloud/Header';
import Details from '/src/components/Cloud/Details';
import Availability from '../components/Cloud/Availablity';
import HomepageWhatYouCanDo from '/src/components/Home/Redesign/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/Home/Redesign/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/Home/Redesign/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/Home/Redesign/IntegrationsUpdate';
import HomepageTestimonials from '/src/components/Home/Redesign/Testimonials';
import Resources from '/src/components/Cloud/Resources';
import CTA from '/src/components/Cloud/CTA';

import ContactForm from '/src/components/Home/Redesign/Contact/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout title="Welcome" description="Welcome to Weaviate">
        <MetaSEO img="og/website/home.jpg" />
        <Header />
        <main>
          <Details />
          <Availability />

          <Resources />
          <CTA />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
