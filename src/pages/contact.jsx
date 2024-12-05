import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Contact/header';
import ContactFrom from '/src/components/Contact/contactForm.jsx';
import ThemeSwitch from '/src/components/ThemeSwitch';
import CTA from '/src/components/Home/Redesign/CTA';

export default function ContactPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Contact"
        description="We are here to help you with any questions you might have."
      >
        <MetaSEO img="og/content/contact.jpg" />
        <Header />
        <ContactFrom />
        <CTA />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
