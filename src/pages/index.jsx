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
import ContactForm from '/src/components/Home/Redesign/Contact/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';
import HomepageHeaderV2 from '/src/components/Home/Redesign/Variants/Header/index.jsx';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const queryParams = new URLSearchParams(window.location.search);
  const version = queryParams.get('version');

  useEffect(() => {
    if (version) {
      window.gtag &&
        window.gtag('event', 'page_view', {
          page_path: `/homepage?version=${version}`,
        });
    }
  }, [version]);

  return (
    <div className="custom-page noBG">
      <Layout
        title="The AI-native database developers love"
        description="Bring AI-native applications to life with less hallucination, data leakage, and vendor lock-in"
      >
        <MetaSEO img="og/website/home.jpg" />

        <main>
          {version === 'a' ? (
            // Variant A Components
            <>
              <HomepageHeaderV2 />
              <HomepageLovedByDevelopers />
            </>
          ) : (
            // Default Components
            <>
              <HomepageHeader />
              <HomepageLovedByDevelopers />
              <HomepageTestimonials />
              <HomepageWhatYouCanDo />
              <HomepageIntegrations />
            </>
          )}

          <Resources />
          <CTA />
          <ContactForm />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
