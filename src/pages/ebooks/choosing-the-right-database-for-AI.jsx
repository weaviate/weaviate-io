import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/Ebooks/v2';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Ebook: Choosing the Right Database For AI</title>
        <meta
          name="description"
          content="Practical tips for indexing, hybrid search, and seamless integration with AI models."
        />
        <meta property="og:title" content="Request a Demo" />
        <meta
          property="og:description"
          content="Practical tips for indexing, hybrid search, and seamless integration with AI models."
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
