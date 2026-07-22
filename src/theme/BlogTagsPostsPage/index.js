import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import FeaturedBlogTags from '../FeaturedBlogTags';




// import BlogPostItems from '../BlogPostItems';
// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const {selectMessage} = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.blog.post.plurals',
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One post|{count} posts',
        },
        {count},
      ),
    );
}
function useBlogTagsPostsPageTitle(tag) {
  const blogPostsPlural = useBlogPostsPlural();
  return translate(
    {
      id: 'theme.blog.tagTitle',
      description: 'The title of the page for a blog tag',
      message: '{nPosts} tagged with "{tagName}"',
    },
    {nPosts: blogPostsPlural(tag.count), tagName: tag.label},
  );
}
function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
     
    </>
  );
}
function BlogTagsPostsPageContent({tag, items, sidebar, listMetadata}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    
    <BlogLayout sidebar={sidebar}>
      <div className="tw-mx-auto tw-w-full tw-max-w-[1320px] tw-px-[18px] tw-pb-24 tw-pt-11 sm:tw-px-6 sm:tw-pt-16">
      <header className="tw-mb-8">
        <p className="tw-mb-3 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.14em] tw-text-[#63e689]">Blog category</p>
        <h1 className="tw-mb-4 tw-text-[clamp(2.25rem,4vw,3.5rem)] tw-leading-tight tw-tracking-[-0.03em] tw-text-[#ddebf2]">{title}</h1>
        <Link className="tw-text-sm tw-text-[#63e689]" to={tag.allTagsPath}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page">
            View All Tags
          </Translate>
        </Link>
      </header>
      <div className="tw-mb-8">
        <FeaturedBlogTags activeTag={tag.label} />
      </div>
      <BlogPostItems items={items} />
      <div className="tw-mt-10">
        <BlogListPaginator metadata={listMetadata} />
      </div>
      </div>
    </BlogLayout>

  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
        'blogContainer',
      )}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
