import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';
import StickyHeader from '/src/components/ContactUpdate/Navigation';
import Header from '/src/components/ContactUpdate/Header';
import Studies from '/src/components/ContactUpdate/Studies';
import Main from '/src/components/ContactUpdate/Main';
import Integrations from '/src/components/ContactUpdate/IntegrationsUpdate/index.jsx';
import WhatYouCanDo from '/src/components/ContactUpdate/WhatYouCanDoUpdate/index.jsx';
import FAQ from '/src/components/ContactUpdate/FAQ/index.jsx';
import Testimonials from '/src/components/ContactUpdate/Testimonials';
import ContactFrom from '/src/components/ContactUpdate/contactForm.jsx';
import Footer from '/src/components/ContactUpdate/Footer';
import ThemeSwitch from '/src/components/ThemeSwitch';
import CTA from '/src/components/Home/Redesign/CTA';

export default function ContactPage() {
  return (
    <div className="custom-page noBG">
      <Head>
        <title>Contact</title>
        <meta
          name="description"
          content="We are here to help you with any questions you might have."
        />
      </Head>
      <MetaSEO img="og/content/contact.jpg" />
      <StickyHeader />
      <Header />
      <Studies />
      <Main />
      <WhatYouCanDo />
      <Integrations />
      <FAQ />
      <Testimonials />
      <ContactFrom />
      <Footer />

      <ThemeSwitch />
    </div>
  );
}
