import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Investors/header';

import ThemeSwitch from '/src/components/ThemeSwitch';

export default function InvestorPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/investors.jpg" />
        <Header />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
