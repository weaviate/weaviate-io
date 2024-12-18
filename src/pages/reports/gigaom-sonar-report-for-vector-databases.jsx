import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/Reports';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Analyst Report - GigaOm Sonar Report for Vector Databases</title>
        <meta
          name="description"
          content="The GigaOm Sonar Report for Vector Databases provides a thorough examination of the rapidly evolving vector database market"
        />
        <meta
          property="og:title"
          content="Analyst Report - GigaOm Sonar Report for Vector Databases"
        />
        <meta
          property="og:description"
          content="The GigaOm Sonar Report for Vector Databases provides a thorough examination of the rapidly evolving vector database market"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="custom-page noBG">
        <Introduction />
        <ThemeSwitch />
      </div>
    </>
  );
}
