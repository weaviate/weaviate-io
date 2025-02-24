import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/Agentic';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>
          Agentic Architectures for Retrieval-intensive Applications
        </title>
        <meta
          name="description"
          content="A comprehensive guide to mastering fundamentals, patterns, and examples of agentic architectures."
        />
        <meta
          property="og:title"
          content="Agentic Architectures for Retrieval-intensive Applications"
        />
        <meta
          property="og:description"
          content="A comprehensive guide to mastering fundamentals, patterns, and examples of agentic architectures."
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
