import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import MDXContent from '@theme/MDXContent';
import ContentVisibility from '@theme/ContentVisibility';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import {blogPostContainerID} from '@docusaurus/utils-common';
import NewsletterPanel from '../../components/Blog/NewsletterPanel';

function Author({author, imageURL}) {
  return (
    <a
      className="tw-flex tw-items-center tw-gap-3 tw-text-[#ddebf2] hover:tw-no-underline"
      href={author.url || undefined}>
      {imageURL && (
        <img
          className="tw-h-10 tw-w-10 tw-rounded-full tw-object-cover"
          src={imageURL}
          alt=""
        />
      )}
      <span>
        <strong className="tw-block tw-text-sm tw-font-semibold">{author.name}</strong>
        {author.title && <span className="tw-block tw-text-xs tw-text-[#8a93a9]">{author.title}</span>}
      </span>
    </a>
  );
}

function PostHero() {
  const {metadata, assets} = useBlogPost();
  const {title, date, formattedDate, readingTime, authors} = metadata;
  const displayDate = formattedDate || new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));

  return (
    <header className="tw-grid tw-gap-10 tw-border-b-[0.5px] tw-border-[#6E6B91] tw-pb-12 lg:tw-grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:tw-items-center">
      <div>
        <p className="tw-mb-6 tw-text-xs tw-text-[#8a93a9]">
          {displayDate} · {Math.round(readingTime)} min read
        </p>
        <h1 className="tw-mb-10 tw-text-[clamp(2.5rem,5vw,4.5rem)] tw-leading-[1.08] tw-tracking-[-0.04em] tw-text-[#ddebf2]">
          {title}
        </h1>
        <div className="tw-flex tw-flex-wrap tw-gap-5">
          {authors.map((author, index) => (
            <Author
              key={`${author.name}-${index}`}
              author={author}
              imageURL={assets.authorsImageUrls?.[index] || author.imageURL}
            />
          ))}
        </div>
      </div>
      {assets.image && (
        <div className="tw-flex tw-min-h-[280px] tw-items-center tw-justify-center tw-overflow-hidden tw-rounded tw-bg-[#1A1A1A] lg:tw-min-h-[390px]">
          <img
            className="tw-block tw-h-full tw-max-h-[520px] tw-w-full tw-object-contain"
            src={assets.image}
            alt=""
            fetchPriority="high"
          />
        </div>
      )}
    </header>
  );
}

function ShareAndTags() {
  const {metadata} = useBlogPost();
  const canonicalUrl = `https://weaviate.io${metadata.permalink}`;
  const shareLinks = [
    ['X', `https://x.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(metadata.title)}`],
    ['in', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`],
  ];

  return (
    <div className="tw-grid tw-gap-8 tw-border-y-[0.5px] tw-border-[#6E6B91] tw-py-8 sm:tw-grid-cols-[1fr_auto]">
      <div>
        <h2 className="tw-mb-4 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5]">Tags</h2>
        <div className="tw-flex tw-flex-wrap tw-gap-2">
          {metadata.tags.map((tag) => (
            <Link
              className="tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-transparent tw-px-3 tw-py-2 tw-text-xs tw-capitalize tw-text-[#d0d8ea] hover:tw-border-[#63e689] hover:tw-text-white hover:tw-no-underline"
              key={tag.permalink}
              to={tag.permalink}>
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className="tw-mb-4 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5]">Share</h2>
        <div className="tw-flex tw-gap-2">
          {shareLinks.map(([label, href]) => (
            <a
              key={label}
              className="tw-inline-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-text-sm tw-font-semibold tw-text-[#d0d8ea] hover:tw-border-[#63e689] hover:tw-text-white hover:tw-no-underline"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Share on ${label}`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostPageContent({BlogPostContent}) {
  const {metadata, toc} = useBlogPost();
  const {frontMatter} = metadata;
  const showToc = !frontMatter.hide_table_of_contents && toc.length > 0;

  return (
    <Layout>
      <ContentVisibility metadata={metadata} />
      <main className="tw-mx-auto tw-w-full tw-max-w-[1320px] tw-px-[18px] tw-pb-24 tw-pt-12 sm:tw-px-6 sm:tw-pt-16">
        <PostHero />

        <div className="tw-grid tw-gap-12 tw-py-12 lg:tw-grid-cols-[minmax(0,760px)_260px] lg:tw-justify-center xl:tw-gap-20">
          <article
            id={blogPostContainerID}
            className="markdown tw-min-w-0 tw-text-[#b9c8de] [&>p:first-child:has(img)]:tw-hidden">
            <MDXContent>
              <BlogPostContent />
            </MDXContent>
          </article>

          {showToc && (
            <aside className="tw-hidden lg:tw-block">
              <div className="tw-sticky tw-top-28 tw-border-l-[0.5px] tw-border-[#6E6B91] tw-pl-7">
                <h2 className="tw-mb-5 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5]">Table of contents</h2>
                <TOC
                  toc={toc}
                  minHeadingLevel={frontMatter.toc_min_heading_level}
                  maxHeadingLevel={frontMatter.toc_max_heading_level}
                />
              </div>
            </aside>
          )}
        </div>

        <div className="tw-mx-auto tw-max-w-[1100px]">
          <ShareAndTags />
          <div className="tw-mt-12">
            <NewsletterPanel />
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  const frontMatter = BlogPostContent?.frontMatter || {};
  const faqJsonLd = frontMatter.faq?.length
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
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        {faqJsonLd && (
          <Head>
            <script key="ld-faq" type="application/ld+json">
              {JSON.stringify(faqJsonLd)}
            </script>
          </Head>
        )}
        <PostPageContent BlogPostContent={BlogPostContent} />
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
