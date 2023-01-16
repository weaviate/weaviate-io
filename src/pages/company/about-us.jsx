import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '@site/src/theme/MetaSEO';

import AboutUsHeader from '../../components/AboutUs/header';
import CompanyValues from '../../components/AboutUs/values';
import MeetTheTeam from '../../components/AboutUs/meet-team';

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
