import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
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
import ContactForm from '/src/components/Home/Redesign/Contact/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomepageHeaderV2 from '../components/Home/Redesign/Variants/Header';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="The AI-native database developers love"
        description="Bring AI-native applications to life with less hallucination, data leakage, and vendor lock-in"
      >
        <MetaSEO img="og/website/home.jpg" />

        <main>
          <BrowserOnly>
            {() => {
              const queryParams = new URLSearchParams(window.location.search);
              const version = queryParams.get('version');
              return version === 'a' ? (
                <>
                  <HomepageHeaderV2 />
                  <HomepageLovedByDevelopers />
                  <HomepageWhatYouCanDo />
                </>
              ) : (
                <>
                  <HomepageHeader />
                  <HomepageLovedByDevelopers />
                  <HomepageTestimonials />
                  <HomepageWhatYouCanDo />
                  <HomepageIntegrations />
                </>
              );
            }}
          </BrowserOnly>
          <Resources />
          <CTA />
          <ContactForm />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
