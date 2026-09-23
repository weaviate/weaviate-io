import React from 'react';
import Head from '@docusaurus/Head';
import {
  useBlogPost,
  useBlogPostStructuredData,
} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostStructuredData() {
  const structuredData = useBlogPostStructuredData();
  const {metadata} = useBlogPost();
  const modifiedDateValue = metadata.frontMatter?.last_update?.date;

  const scopedStructuredData = modifiedDateValue
    ? {
        ...structuredData,
        dateModified: new Date(modifiedDateValue).toISOString(),
      }
    : structuredData;

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(scopedStructuredData)}
      </script>
    </Head>
  );
}
