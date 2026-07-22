import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import FeaturedBlogTags from '../FeaturedBlogTags';
import NewsletterPanel from '../../components/Blog/NewsletterPanel';
import { MetaSEO } from '/src/theme/MetaSEO';

function BlogListPageMetadata({metadata}) {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink, page} = metadata;
  const title = permalink === '/' ? siteTitle : blogTitle;
  const description = page > 1 ? `${blogDescription} - Page ${page}` : blogDescription;
  const ogimg = `og/content/${blogTitle.toLowerCase()}.jpg`;

  return (
    <>
      <MetaSEO img={ogimg} />
      <PageMetadata title={title} description={description} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function FeaturedPost({item}) {
  const post = item.content;
  const {metadata, assets} = post;

  return (
    <article className="tw-my-[30px] tw-grid tw-overflow-hidden tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-[#1A1A1A] lg:tw-grid-cols-[1.05fr_1fr]">
      <Link className="tw-flex tw-min-h-[220px] tw-items-center tw-justify-center tw-bg-[#1A1A1A] md:tw-min-h-[320px]" to={metadata.permalink}>
        <img className="tw-block tw-h-full tw-max-h-[480px] tw-w-[560px] tw-object-contain" src={assets.image} alt="" fetchPriority="high" />
      </Link>
      <div className="tw-flex tw-flex-col tw-justify-center tw-p-7 md:tw-p-10 xl:tw-p-[54px]">
        <div className="tw-mb-6 tw-flex tw-gap-2">
          {metadata.tags.slice(0, 2).map((tag, index) => (
            <Link
              key={tag.permalink}
              className={clsx(
                'tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-px-[9px] tw-py-[5px] tw-text-[0.7rem] tw-capitalize tw-leading-none hover:tw-no-underline',
                index === 0
                  ? 'tw-bg-[linear-gradient(223deg,#43E2C5_-4.42%,#70EE62_100%)] tw-text-[#08120c] hover:tw-text-[#08120c]'
                  : 'tw-bg-transparent tw-text-[#d0d8ea] hover:tw-border-[#63e689]/60 hover:tw-text-[#edf4ff]',
              )}
              to={tag.permalink}>
              {tag.label}
            </Link>
          ))}
        </div>
        <Link className="tw-text-[#ddebf2] hover:tw-text-[#63e689] hover:tw-no-underline" to={metadata.permalink}>
          <h2 className="tw-mb-5 tw-text-[clamp(1.75rem,3vw,2.55rem)] tw-leading-[1.14] tw-tracking-[-0.025em] tw-text-inherit">{metadata.title}</h2>
        </Link>
        <p className="tw-mb-7 tw-text-[0.95rem] tw-leading-[1.65] tw-text-[#b9c8de]">{metadata.description}</p>
        <span className="tw-text-xs tw-text-[#8a93a9]">
          {metadata.formattedDate} · {Math.round(metadata.readingTime)} min read
        </span>
      </div>
    </article>
  );
}

function BlogListPageContent({metadata, items, sidebar}) {
  const isMainBlogPage = metadata.permalink === '/blog' && (!metadata.page || metadata.page === 1);
  const featuredItem = isMainBlogPage ? items[0] : null;
  const gridItems = featuredItem ? items.slice(1) : items;

  return (
    <BlogLayout sidebar={sidebar}>
      <div className="tw-mx-auto tw-w-full tw-max-w-[1320px] tw-px-[18px] tw-pb-24 tw-pt-11 sm:tw-px-6 sm:tw-pt-16">
        <header className="tw-mb-[34px] tw-max-w-[640px]">
          <h1 className="tw-mb-4 tw-text-[clamp(2.5rem,5vw,4rem)] tw-leading-[1.05] tw-tracking-[-0.04em] tw-text-[#ddebf2]"><span className="tw-text-[#22e6a8]">Weaviate</span> Blog</h1>
          <p className="tw-m-0 tw-max-w-[560px] tw-text-base tw-leading-[1.6] tw-text-[#b9c8de]">Keep up-to-date on the latest product updates, how-tos, industry insights, and community spotlights.</p>
        </header>

        {isMainBlogPage && <FeaturedBlogTags activeTag="all" />}
        {featuredItem && <FeaturedPost item={featuredItem} />}
        {isMainBlogPage && <NewsletterPanel />}

        <BlogPostItems items={gridItems} />
        <div className="tw-mt-10">
          <BlogListPaginator metadata={metadata} />
        </div>
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
