import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Community/Heroes';
import Header from '../../components/Community/Header';
import Intro from '../../components/Community/Intro';
import CommunityPanel from '../../components/Community/CommunityPanel';
import WorkshopSection from '../../components/Community/Workshops';
import EventSection from '../../components/Community/EventMap';
import SocialPanel from '../../components/Community/SocialPanel';

import ThemeSwitch from '../../components/ThemeSwitch';

export default function CommunityPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <CommunityPanel />
        <WorkshopSection />
        <EventSection />
        <Intro />
        <SocialPanel />
        <Hero />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
