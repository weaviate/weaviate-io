import React from 'react';
import clsx from 'clsx';
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
import { MetaSEO } from '/src/theme/MetaSEO';
import ThemeSwitch from '/src/components/ThemeSwitch';


function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  const ogimg = `og/content/${metadata.blogTitle.toLowerCase()}.jpg`
  return (
    <>
      <MetaSEO img={ogimg} />
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />

    </>
  );
}
function BlogListPageContent(props) {
  const {metadata, items, sidebar} = props;
  return (
    <BlogLayout sidebar={sidebar}>
      <h1 className='page-title'>Weaviate <span className='highlight'>{metadata.blogTitle}</span></h1>

      {metadata.permalink == '/blog' &&
        <FeaturedBlogTags/>
      }

      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}
export default function BlogListPage(props) {
  return (
    <div >
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>

      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
    

    </div>
  );
}
