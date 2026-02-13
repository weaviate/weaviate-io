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

  const faqJsonLd = isVectorDbPost
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why do we need vector databases?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Vector databases are essential for efficiently managing and searching high-dimensional vector embeddings. They enable real-time accurate similarity searches, which are critical in the AI-native app stack.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why use a vector database?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Vector databases efficiently store and search unstructured data using high-dimensional embeddings. They provide the retrieval layer that powers accurate, context-aware semantic search and AI applications.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you use a vector database?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Store vector embeddings in the database, index them for efficient retrieval, and perform similarity searches to find the most relevant data points.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you choose a vector database?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Selection criteria include search latency, memory footprint at scale, recall and retrieval relevance, cost efficiency, and integration with your AI stack such as embedding models and LLMs.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a vector database and a vector store?',
            acceptedAnswer: {
              '@type': 'Answer',
              text:
                'Many tools call themselves “vector stores”; in practice, developers often mean a production-ready vector database with indexing, scaling, and filters.',
            },
          },
        ],
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
