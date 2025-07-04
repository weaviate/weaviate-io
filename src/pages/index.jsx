import React, { lazy, Suspense } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import HomepageHeader from '/src/components/HomeV2/Header';
import Main from '/src/components/HomeV2/Main/V2';
import ContactForm from '/src/components/HomeV2/Contact/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

// New lazy import

const BottomMain = lazy(() => import('/src/components/HomeV2/BottomMain'));

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

        <Suspense fallback={null}>
          <BottomMain />
        </Suspense>

        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
