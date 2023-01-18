import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import AboutUsHeader from '/src/components/AboutUs/header';
import CompanyValues from '/src/components/AboutUs/values';
import MeetTheTeam from '/src/components/AboutUs/meet-team';

export default function AboutUsPage() {
  return (
    <Layout>
      <MetaSEO img="og/company/about-us.jpg" />
      <AboutUsHeader />
      <CompanyValues />
      <MeetTheTeam />
    </Layout>
  );
}
