import React from 'react';
import Head from '@docusaurus/Head';

export function MetaSEO({img}) {
  return (
    <Head>
      <meta property="og:image" content={"https://weaviate.io/" + img } />
      <meta name="twitter:image" content={"https://weaviate.io/" + img } />
    </Head>
  );
}