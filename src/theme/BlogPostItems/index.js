import React from 'react';
import {BlogPostProvider} from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme/BlogPostItem';
import styles from './styles.module.scss';

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  return (
    <div className={styles.blogs}>
      {items.map(({content: BlogPostContent}) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <BlogPostItemComponent>
            <div className={styles.blogCard}>

              <a className={styles.blogCardTitle} href={BlogPostContent.metadata.permalink}>
                <h2>{BlogPostContent.metadata.title}</h2>
              </a>

              <a className={styles.blogCardImage} href={BlogPostContent.metadata.permalink}>
                <img
                  src={BlogPostContent.assets.image}
                  alt="alt"
                />
              </a>
              <p className={styles.blogCardDescription}>
                {BlogPostContent.metadata.description}
              </p>

              {BlogPostContent.metadata.tags.length > 0 &&
              <div className={styles.blogTags}>
                <span className={styles.blogTagsLabel}>Tags:</span>
                {BlogPostContent.metadata.tags.map(tag=>(
                  <a className={styles.blogTag} href={tag.permalink}>{tag.label}</a>
                ))}
              </div>
              }

              <div className={styles.blogCardInfo}>
                <span>{BlogPostContent.metadata.formattedDate} · {Math.round(BlogPostContent.metadata.readingTime)} min read</span>
              </div>
            </div>
          </BlogPostItemComponent>
        </BlogPostProvider>
      ))}
    </div>
  );
}
