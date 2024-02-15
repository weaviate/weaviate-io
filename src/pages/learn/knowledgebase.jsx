import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import AboutUsHeader from '/src/components/Knowledgebase/header';
import CompanyValues from '/src/components/Knowledgebase/values';
import MeetTheTeam from '/src/components/Knowledgebase/meet-team';
import Investors from '/src/components/Knowledgebase/Investors/investors';
import Press from '/src/components/Knowledgebase/Press/press';
import Playbook from '/src/components/Knowledgebase/Playbook/playbook';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function KnowledgeBasePage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/about-us.jpg" />
        <AboutUsHeader />

        <MeetTheTeam />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
