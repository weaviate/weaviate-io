import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import WorkshopsHeader from '/src/components/Events/Header';
import WorkshopSection from '/src/components/Events/Workshops';
import CalendarSection from '/src/components/Events/Calendar';
import ContactForm from '/src/components/Events/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';
import LearnMore from '/src/components/Events/LearnMore';
import OnDemand from '/src/components/Events/OnDemand';
import Ebooks from '/src/components/Community/Ebooks';

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
        <CalendarSection />
        <OnDemand />
        <Ebooks />
        <LearnMore />
        <ContactForm />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
