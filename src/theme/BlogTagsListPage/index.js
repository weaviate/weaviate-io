import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  listTagsByLetters,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import FeaturedBlogTags from '../FeaturedBlogTags';

export default function BlogTagsListPage({tags, sidebar}) {
  const title = translateTagsPageTitle();
  const letterGroups = listTagsByLetters(tags);

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <div className="tw-mx-auto tw-w-full tw-max-w-[1320px] tw-px-[18px] tw-pb-24 tw-pt-11 sm:tw-px-6 sm:tw-pt-16">
          <header className="tw-mb-8 tw-max-w-[700px]">
            <p className="tw-mb-3 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.14em] tw-text-[#63e689]">Browse the blog</p>
            <h1 className="tw-mb-4 tw-text-[clamp(2.5rem,5vw,4rem)] tw-leading-tight tw-tracking-[-0.04em] tw-text-[#ddebf2]">{title}</h1>
            <p className="tw-m-0 tw-text-base tw-leading-relaxed tw-text-[#b9c8de]">Explore every topic covered by the Weaviate team and community.</p>
          </header>

          <div className="tw-mb-12">
            <FeaturedBlogTags />
          </div>

          <div className="tw-grid tw-gap-x-12 md:tw-grid-cols-2">
            {letterGroups.map(({letter, tags: letterTags}) => (
              <section className="tw-border-t tw-border-[#2a2f3f] tw-py-7" key={letter}>
                <h2 className="tw-mb-5 tw-text-2xl tw-text-[#ddebf2]">{letter}</h2>
                <div className="tw-flex tw-flex-wrap tw-gap-2">
                  {letterTags.map((tag) => (
                    <Link
                      key={tag.permalink}
                      to={tag.permalink}
                      rel="tag"
                      className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded tw-border tw-border-[#39425b] tw-bg-white/[0.03] tw-px-3 tw-py-2 tw-text-sm tw-text-[#d0d8ea] hover:tw-border-[#63e689]/60 hover:tw-bg-[#63e689]/[0.06] hover:tw-text-[#edf4ff] hover:tw-no-underline">
                      <span>{tag.label}</span>
                      <span className="tw-rounded-full tw-bg-[#252a35] tw-px-1.5 tw-py-0.5 tw-text-[0.65rem] tw-text-[#b9c8de]">{tag.count}</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
