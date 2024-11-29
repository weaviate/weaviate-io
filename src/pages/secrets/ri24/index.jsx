import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/Party';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Weaviate Secret AI Party</title>
        <meta name="description" content="Weaviate Secret AI Party." />
        <meta property="og:title" content="Weaviate Secret AI Party" />
        <meta property="og:description" content="Weaviate Secret AI Party" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="custom-page noBG">
        <Introduction />
        <ThemeSwitch />
      </div>
    </>
  );
}
