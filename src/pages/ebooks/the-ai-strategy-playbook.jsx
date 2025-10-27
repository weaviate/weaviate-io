import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/StrategyPlaybook';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>The AI Strategy Playbook</title>
        <meta
          name="description"
          content="The AI Leader’s Guide to Operationalizing AI."
        />
        <meta property="og:title" content="The AI Strategy Playbook" />
        <meta
          property="og:description"
          content="The AI Leader’s Guide to Operationalizing AI."
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
