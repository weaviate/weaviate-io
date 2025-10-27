import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/TechnicalStrategy';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>How to Build a Technical Strategy for AI</title>
        <meta
          name="description"
          content="A guide how to clearly define your AI strategy from a technical perspective  so you can identify required skills and resources, navigate internal conversations, and secure the necessary backing to launch and scale your project."
        />
        <meta
          property="og:title"
          content="How to Build a Technical Strategy for AI"
        />
        <meta
          property="og:description"
          content="A guide how to clearly define your AI strategy from a technical perspective  so you can identify required skills and resources, navigate internal conversations, and secure the necessary backing to launch and scale your project."
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
