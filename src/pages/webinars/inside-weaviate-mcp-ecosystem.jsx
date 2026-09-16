import React from 'react';
import Head from '@docusaurus/Head';

import WebinarRegistration from '/src/components/Signup/Webinars/MCP';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function InsideWeaviateMcpEcosystem() {
  const title = "Inside Weaviate's MCP Ecosystem";
  const description =
    'Explore why MCP matters and see the Weaviate Database and Weaviate Query Agent MCP servers in action.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="custom-page noBG">
        <WebinarRegistration />
        <ThemeSwitch />
      </div>
    </>
  );
}
