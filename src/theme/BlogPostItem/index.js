import React from 'react';
import Head from '@docusaurus/Head';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';

function toAbsoluteUrl(url) {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://weaviate.io${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function BlogPostItem(props) {
  const {metadata, frontMatter, assets} = useBlogPost();

 
  if (!metadata) return <OriginalBlogPostItem {...props} />;

  const canonicalUrl = toAbsoluteUrl(metadata.permalink);
  const imageUrl = toAbsoluteUrl(assets?.image || frontMatter?.image || metadata?.image);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: metadata.description,
    author: { '@type': 'Organization', name: 'Weaviate', url: 'https://weaviate.io' },
    publisher: {
      '@type': 'Organization',
      name: 'Weaviate',
      url: 'https://weaviate.io',
      logo: { '@type': 'ImageObject', url: 'https://weaviate.io/img/site/weaviate-logo-horizontal-dark-1.svg' },
    },
    datePublished: metadata.date,
    dateModified: metadata.lastUpdatedAt ? new Date(metadata.lastUpdatedAt).toISOString() : metadata.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(metadata.tags?.length ? { keywords: metadata.tags.map(t => t.label) } : {}),
  };

  const isVectorDbPost = metadata?.permalink?.includes('/blog/what-is-a-vector-database');

  const faqJsonLd = isVectorDbPost ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Why do we need vector databases?', acceptedAnswer: { '@type': 'Answer', text: 'Vector databases are essential for efficiently managing and searching high-dimensional vector embeddings. They enable real-time accurate similarity searches, which are critical in the AI-native app stack.' } },
      { '@type': 'Question', name: 'Why use a vector database?', acceptedAnswer: { '@type': 'Answer', text: 'Vector databases efficiently store and search unstructured data using high-dimensional embeddings. They provide the retrieval layer that powers accurate, context-aware semantic search and AI applications.' } },
      { '@type': 'Question', name: 'How do you use a vector database?', acceptedAnswer: { '@type': 'Answer', text: 'Store vector embeddings in the database, index them for efficient retrieval, and perform similarity searches to find the most relevant data points.' } },
      { '@type': 'Question', name: 'How do you choose a vector database?', acceptedAnswer: { '@type': 'Answer', text: 'Selection criteria include search latency, memory footprint at scale, recall and retrieval relevance, cost efficiency, and integration with your AI stack such as embedding models and LLMs.' } },
      { '@type': 'Question', name: 'What is the difference between a vector database and a vector store?', acceptedAnswer: { '@type': 'Answer', text: 'Many tools call themselves “vector stores”; in practice, developers often mean a production-ready vector database with indexing, scaling, and filters.' } },
    ],
  } : null;

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(blogPostingJsonLd)}} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
        )}
      </Head>
      <OriginalBlogPostItem {...props} />
    </>
  );
}
