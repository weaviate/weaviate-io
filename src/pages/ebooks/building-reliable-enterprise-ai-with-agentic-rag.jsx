import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/BuildingAI';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Building Reliable Enterprise AI with Agentic RAG</title>
        <meta
          name="description"
          content="Design architectures for building grounded, autonomous RAG agents at scale in production with StackAI and Weaviate."
        />
        <meta
          property="og:title"
          content="Building Reliable Enterprise AI with Agentic RAG"
        />
        <meta
          property="og:description"
          content="Design architectures for building grounded, autonomous RAG agents at scale in production with StackAI and Weaviate."
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
