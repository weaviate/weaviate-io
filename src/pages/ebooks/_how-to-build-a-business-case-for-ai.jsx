import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/BusinessCase';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>How to Build a Business Case for AI </title>
        <meta
          name="description"
          content="A guide how to clearly define and articulate the business value of your AI project and navigate internal strategic conversations."
        />
        <meta
          property="og:title"
          content="How to Build a Business Case for AI"
        />
        <meta
          property="og:description"
          content="A guide how to clearly define and articulate the business value of your AI project and navigate internal strategic conversations."
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
