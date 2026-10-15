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
  const imageAlt = metadata.frontMatter?.imageAlt;

  const image = imageAlt && structuredData.image
    ? {
        ...structuredData.image,
        caption: imageAlt,
      }
    : structuredData.image;

  const scopedStructuredData = {
    ...structuredData,
    ...(modifiedDateValue
      ? {dateModified: new Date(modifiedDateValue).toISOString()}
      : {}),
    ...(image ? {image} : {}),
    publisher: {'@id': 'https://weaviate.io/#organization'},
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(scopedStructuredData)}
      </script>
    </Head>
  );
}
