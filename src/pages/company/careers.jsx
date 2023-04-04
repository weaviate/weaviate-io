import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import CareersHeader from '../../components/Careers/Header';
import CareersIntro from '../../components/Careers/Intro';
import CareersInterviewProcess from '../../components/Careers/InterviewProcess';
import Jobs from '../../components/Careers/Jobs';
import Benefits from '../../components/Careers/Benefits';

export default function CareersPage() {
  return (
    <div className="custom-page">
      <Layout>
        <MetaSEO img="og/company/careers.jpg" />
        <CareersHeader />
        {/* <CareersIntro />
        <CareersInterviewProcess />
        <Jobs />
        <Benefits /> */}
      </Layout>
    </div>
  );
}
