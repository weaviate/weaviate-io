import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Community/BWW/Heroes';
import Header from '../../components/Community/BWW/Header';
import CommunityPanel from '../../components/Community/BWW/CommunityPanel';
import SocialPanel from '../../components/Community/BWW/SocialPanel';
import Program from '../../components/Community/BWW/Program';
import Analytics from '../../components/Community/BWW/Analytics';
import Opensource from '../../components/Community/BWW/Opensource';

import ThemeSwitch from '../../components/ThemeSwitch';

export default function BWWPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <CommunityPanel />
        <SocialPanel />
        <Hero />
        <Analytics />
        <Opensource />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
