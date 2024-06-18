import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Hero from '../../components/Community/Demos/Heroes';
import Header from '../../components/Community/Demos/Header';
import CommunityPanel from '../../components/Community/Demos/CommunityPanel';
import SocialPanel from '../../components/Community/Demos/SocialPanel';
import Projects from '../../components/Community/Demos/Projects';
import Program from '../../components/Community/Demos/Program';
import Analytics from '../../components/Community/Demos/Analytics';
import Opensource from '../../components/Community/Demos/Opensource';

import ThemeSwitch from '../../components/ThemeSwitch';

export default function DemoPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <CommunityPanel />
        <Projects />
        <Analytics />
        <Opensource />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
