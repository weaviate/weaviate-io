import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/Partners/G2/Header';
import Introduction from '../../components/Partners/G2/Introduction/introduction';
import RewardProcess from '/src/components/Partners/G2/RewardProcess';
import CallingSection from '/src/components/Partners/G2/CallingSection';
import ContactForm from '../../components/Partners/G2/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function g2Page() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="G2 Reviews"
        description="Help us spread the word, get a free t-shirt!"
      >
        <Header />
        <Introduction />
        <RewardProcess />
        <CallingSection />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
