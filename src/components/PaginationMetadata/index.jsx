import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PaginationMetadata({metadata}) {
  const {
    siteConfig: {url},
  } = useDocusaurusContext();
  const {previousPage, nextPage} = metadata;

  return (
    <Head>
      {previousPage && (
        <link rel="prev" href={new URL(previousPage, url).toString()} />
      )}
      {nextPage && (
        <link rel="next" href={new URL(nextPage, url).toString()} />
      )}
    </Head>
  );
}
