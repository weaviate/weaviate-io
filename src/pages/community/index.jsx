import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Community/Heroes';
import Header from '../../components/Community/Header';
import CommunityPanel from '../../components/Community/CommunityPanel';
import SocialPanel from '../../components/Community/SocialPanel';
import Program from '../../components/Community/Program';

import ThemeSwitch from '../../components/ThemeSwitch';

export default function CommunityPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <Program />
        <CommunityPanel />

        <SocialPanel />
        <Hero />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
