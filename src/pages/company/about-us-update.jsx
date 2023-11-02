import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import AboutUsHeader from '/src/components/AboutUsUpdate/header';
import CompanyValues from '/src/components/AboutUsUpdate/values';
import MeetTheTeam from '/src/components/AboutUsUpdate/meet-team';
import Investors from '/src/components/AboutUsUpdate/Investors/investors';
import Press from '/src/components/AboutUsUpdate/Press/press';
import Playbook from '/src/components/AboutUsUpdate/Playbook/playbook';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function AboutUsPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/about-us.jpg" />
        <AboutUsHeader />
        <CompanyValues />
        <MeetTheTeam />
        <Investors />
        <Press />
        <Playbook />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
