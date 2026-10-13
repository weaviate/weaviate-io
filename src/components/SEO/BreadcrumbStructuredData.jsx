import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function absoluteUrl(siteUrl, path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl.replace(/\/$/, '')}/${String(path).replace(/^\//, '')}`;
}

export default function BreadcrumbStructuredData({items}) {
  const {siteConfig} = useDocusaurusContext();
  const itemListElement = items.map(({name, path}, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: absoluteUrl(siteConfig.url, path),
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <Head>
      <script key="ld-breadcrumbs" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}
