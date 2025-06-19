import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import HomepageHeader from '/src/components/HomeV2/Header';
import HomepageWhatYouCanDo from '/src/components/HomeV2/WhatYouCanDoUpdate';
import HomepageLovedByDevelopers from '/src/components/HomeV2/LovedByDeveloperUpdate/index.jsx';
import HomepageJoinCommunity from '/src/components/HomeV2/JoinCommunityUpdate';
import HomepageIntegrations from '/src/components/HomeV2/IntegrationsUpdate/v2.jsx';
import HomepageTestimonials from '/src/components/HomeV2/Testimonials';
import Resources from '/src/components/HomeV2/Resources';
import CTA from '/src/components/HomeV2/CTA';
import Main from '/src/components/HomeV2/Main';
import BottomMain from '/src/components/HomeV2/BottomMain';
import ContactForm from '/src/components/HomeV2/Contact/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="The AI-native database developers love"
        description="Bring AI-native applications to life with less hallucination, data leakage, and vendor lock-in"
      >
        <MetaSEO img="og/website/home.jpg" />
        <HomepageHeader />

        <Main />
        <BottomMain />

        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
