import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Events/Heroes';
import Header from '../../components/Events/Header';
import Intro from '../../components/Events/Intro';
import HighlightPanel from '../../components/Events/Highlights';
import WorkshopSection from '../../components/Events/Workshops';
import ContactForm from '/src/components/Home/ContactForm/contactForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import LearnMore from '../../components/Events/LearnMore';

export default function EventsPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <HighlightPanel />
        <WorkshopSection />
        <LearnMore />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
