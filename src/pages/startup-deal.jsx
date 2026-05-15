import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Startup/Header';
import StartupDealIntroSection from '/src/components/Startup/IntroSection';
import ContactFrom from '/src/components/Startup/contactForm.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import CTA from '/src/components/Home/Redesign/CTA';

export default function StartUpPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Startup Deal Redemption"
        description="Redeem your startup deal for Weaviate Cloud."
      >
        <MetaSEO img="og/content/home.jpg" />
        <Header />
        <StartupDealIntroSection />
        <ContactFrom />
        <CTA />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
