import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItems from '../../theme/BlogPostItems';

function slugifyTag(tag) {
  return String(tag)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function normalizePermalink(value) {
  if (!value) return '';
  const permalink = typeof value === 'string' ? value : value.permalink || value.href || value.link;
  if (!permalink) return '';
  return permalink.startsWith('/') ? permalink : `/blog/${permalink.replace(/^\/+/, '')}`;
}

function toBlogItem(post) {
  return {
    content: {
      metadata: {
        title: post.title,
        permalink: post.permalink,
        date: post.date,
        readingTime: post.readingTime || 5,
        tags: (post.tags || []).map((tag) => ({
          label: tag,
          permalink: `/blog/tags/${encodeURIComponent(slugifyTag(tag))}`,
        })),
        description: post.description || '',
      },
      assets: {image: post.image || '/img/site/card-3-light.jpg'},
    },
  };
}

function editorialPost(entry, indexedPost) {
  if (typeof entry === 'string') return indexedPost;
  if (!entry || typeof entry !== 'object') return indexedPost;
  return {
    ...indexedPost,
    title: entry.title || indexedPost?.title,
    description: entry.description || indexedPost?.description || '',
    permalink: normalizePermalink(entry),
    image: entry.image || indexedPost?.image || '',
    tags: entry.tags || indexedPost?.tags || [],
    date: entry.date || indexedPost?.date || '',
  };
}

export default function RelatedPosts({count = 3}) {
  const {metadata: current} = useBlogPost();
  const {posts = []} = usePluginData('blog-search-index');
  const frontMatter = current.frontMatter || {};
  const currentTags = (current.tags || []).map((tag) => String(tag.label || tag).toLowerCase());
  const byPermalink = new Map(posts.map((post) => [post.permalink, post]));
  const chosen = [];

  function add(post) {
    if (!post?.permalink || !post.title || post.permalink === current.permalink) return;
    if (!chosen.some((item) => item.permalink === post.permalink)) chosen.push(post);
  }

  // Editorial choices always win. Each entry can be a permalink or an object.
  (frontMatter.related || []).forEach((entry) => {
    const permalink = normalizePermalink(entry);
    add(editorialPost(entry, byPermalink.get(permalink)));
  });

  // Series relationships come before broad topical recommendations.
  if (frontMatter.series) {
    posts
      .filter((post) => post.series === frontMatter.series)
      .sort((a, b) => (a.seriesOrder ?? Infinity) - (b.seriesOrder ?? Infinity))
      .forEach(add);
  }

  posts
    .filter((post) => post.permalink !== current.permalink)
    .map((post) => {
      const tags = (post.tags || []).map((tag) => String(tag).toLowerCase());
      const sharedTags = currentTags.filter((tag) => tags.includes(tag));
      const primaryMatch = frontMatter.primaryTag && post.primaryTag === frontMatter.primaryTag ? 1 : 0;
      return {post, score: sharedTags.length * 5 + primaryMatch * 4};
    })
    .filter(({score}) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .forEach(({post}) => add(post));

  // Recency is only a final fallback for posts without useful relationships.
  posts.forEach(add);

  const items = chosen.slice(0, count).map(toBlogItem);
  if (!items.length) return null;

  return (
    <section className="tw-mt-12" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="tw-mb-6 tw-text-[1.25rem] tw-text-[#ddebf2]">
        Continue reading
      </h2>
      <BlogPostItems items={items} />
    </section>
  );
}
