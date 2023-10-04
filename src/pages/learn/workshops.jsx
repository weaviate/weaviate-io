import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Workshops/header';

import ThemeSwitch from '/src/components/ThemeSwitch';

export default function WorkshopPage() {
  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/company/investors.jpg" />
        <Header />
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></script>
        <div className="container">
          <div class="elfsight-app-01a3e7d9-f320-4491-a464-8339fafe3e80"></div>
        </div>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
