import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '../../components/Community/Header';
import Intro from '../../components/Community/Intro';
import InterviewProcess from '../../components/Community/InterviewProcess';
import Jobs from '../../components/Community/Jobs';
import Benefits from '../../components/Community/Benefits';
import ThemeSwitch from '../../components/ThemeSwitch';

export default function CommunityPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/Community.jpg" />
        <Header />
        <InterviewProcess />
        <Intro />
        <Jobs />
        <Benefits />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
