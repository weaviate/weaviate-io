import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import WorkshopsHeader from '/src/components/Events/Header';
import WorkshopSection from '/src/components/Events/Workshops';
import CalendarSection from '/src/components/Events/Calendar';
import ThemeSwitch from '/src/components/ThemeSwitch';
import OnDemand from '/src/components/Events/OnDemand';

export default function EventsPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Webinars"
        description="Join upcoming Weaviate webinars and watch expert sessions on demand."
      >
        <MetaSEO img="og/company/Community.jpg" />
        <WorkshopsHeader />
        <WorkshopSection />
        <CalendarSection />
        <OnDemand />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
