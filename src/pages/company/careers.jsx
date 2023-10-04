import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '../../components/Careers/Header';
import Intro from '../../components/Careers/Intro';
import InterviewProcess from '../../components/Careers/InterviewProcess';
import Jobs from '../../components/Careers/Jobs';
import Benefits from '../../components/Careers/Benefits';
import ThemeSwitch from '../../components/ThemeSwitch';

export default function CareersPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/careers.jpg" />
        <Header />
        <Intro />
        <InterviewProcess />
        <Jobs />
        <Benefits />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
