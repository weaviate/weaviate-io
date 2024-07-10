import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import WorkshopsHeader from '../../components/Events/Header';
import WorkshopSection from '../../components/Events/Workshops';
import ContactForm from '/src/components/Events/ContactForm/contactForm';
import ThemeSwitch from '../../components/ThemeSwitch';
import LearnMore from '../../components/Events/LearnMore';
import OnDemand from '../../components/Events/OnDemand';

export default function EventsPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Online Workshops & Events"
        description="-Join us at conferences, meetups, webinars or workshops"
      >
        <MetaSEO img="og/company/Community.jpg" />
        <WorkshopsHeader />
        <WorkshopSection />
        <OnDemand />
        <LearnMore />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
