import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';
import StickyHeader from '/src/components/ContactUpdate/V2/Navigation';
import Header from '/src/components/ContactUpdate/V2/Header';
import Studies from '/src/components/ContactUpdate/V2/Studies';
import Main from '/src/components/ContactUpdate/V2/Main';
import Benefits from '/src/components/ContactUpdate/V2/Benefits';
import WhatYouCanDo from '/src/components/ContactUpdate/V2/WhatYouCanDoUpdate/index.jsx';
import Integrations from '/src/components/ContactUpdate/V2/IntegrationsUpdate';
import FAQ from '/src/components/ContactUpdate/V2/FAQ/index.jsx';
import Testimonials from '/src/components/ContactUpdate/V2/Testimonials';
import ContactFrom from '/src/components/ContactUpdate/V2/contactForm.jsx';
import Footer from '/src/components/ContactUpdate/V2/Footer/index.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import CTA from '/src/components/Home/Redesign/CTA';

export default function ContactPage() {
  return (
    <div className="custom-page noBG">
      <Head>
        <title>Explore</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <MetaSEO img="og/content/contact.jpg" />
      <StickyHeader />
      <Header />

      <Main />
      <Benefits />

      <Testimonials />
      <Integrations />
      <FAQ />
      <ContactFrom />
      <Footer />
      <ThemeSwitch />
    </div>
  );
}
