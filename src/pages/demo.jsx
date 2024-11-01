import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/Demo/v2';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Request a Demo</title>
        <meta
          name="description"
          content="All the power of our open-source vector database, without the burden of self-hosting."
        />
        <meta property="og:title" content="Request a Demo" />
        <meta
          property="og:description"
          content="All the power of our open-source vector database, without the burden of self-hosting."
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
