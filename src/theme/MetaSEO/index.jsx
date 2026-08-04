import React from 'react';
import Head from '@docusaurus/Head';

export function MetaSEO({img, type = 'website'}) {
  return (
    <Head>
      <meta property="og:type" content={type} />
      <meta property="og:image" content={"https://weaviate.io/" + img } />
      <meta name="twitter:image" content={"https://weaviate.io/" + img } />
    </Head>
  );
}
