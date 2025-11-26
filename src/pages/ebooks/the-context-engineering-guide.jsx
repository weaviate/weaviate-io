import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/ContextEngineering';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>The Context Engineering Guide</title>
        <meta
          name="description"
          content="The guide to engineering reliable, context-aware AI systems."
        />
        <meta property="og:title" content="The Context Engineering Guide" />
        <meta
          property="og:description"
          content="The guide to engineering reliable, context-aware AI systems."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="custom-page noBG">
        <Introduction />
        <ThemeSwitch />
      </div>
    </>
  );
}
