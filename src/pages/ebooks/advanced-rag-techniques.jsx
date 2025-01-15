import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';

import Introduction from '/src/components/Signup/RAG';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>Advanced RAG Techniques</title>
        <meta
          name="description"
          content="A guide on different techniques to improve the performance of your Retrieval-Augmented Generation applications."
        />
        <meta property="og:title" content="Advanced RAG Techniquess" />
        <meta
          property="og:description"
          content="A guide on different techniques to improve the performance of your Retrieval-Augmented Generation applications."
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
