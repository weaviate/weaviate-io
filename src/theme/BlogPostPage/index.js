// src/theme/BlogPostPage/index.js
import React from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';
import BackToBlogHub from '/src/components/Blog/BacktoBlog';

export default function BlogPostPage(props) {
  const {content} = props;

  const frontMatter = content?.frontMatter || {};
  const metadata = content?.metadata || {};

  const isVectorDbPost =
    frontMatter?.slug === 'what-is-a-vector-database' ||
    (metadata?.permalink || '').includes('/blog/what-is-a-vector-database');

  const faqJsonLd =
  frontMatter?.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: frontMatter.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;


  return (
    <>
      {faqJsonLd && (
        <Head>
          <script key="ld-faq" type="application/ld+json">
            {JSON.stringify(faqJsonLd)}
          </script>
        </Head>
      )}

      <BackToBlogHub />
      <OriginalBlogPostPage {...props} />
    </>
  );
}
