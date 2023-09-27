import React from 'react';
import {BlogPostProvider} from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme/BlogPostItem';
import styles from './styles.module.scss';
import ThemeSwitch from '../../components/ThemeSwitch';


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

              <a className={styles.blogCardImage} href={BlogPostContent.metadata.permalink}>
                <img
                  src={BlogPostContent.assets.image}
                  alt="alt"
                />
             </a>

            <a className={styles.blogCardTitle} href={BlogPostContent.metadata.permalink}>
                <h2>{BlogPostContent.metadata.title}</h2>
            </a>

              <p className={styles.blogCardDescription}>
                {BlogPostContent.metadata.description}
              </p>

              {BlogPostContent.metadata.tags.length > 0 &&
              <div className={styles.blogTags}>
                {BlogPostContent.metadata.tags.map(tag=>(
                    <div className={styles.tag}>
                        <a href={`${tag.permalink}`}>{tag.label} <div className={`${styles.dot} ${styles[tag.label]}`}></div></a>
                    </div>
                ))}
              </div>
              }

              <div className={styles.blogCardInfo}>
                <span>{BlogPostContent.metadata.formattedDate} · {Math.round(BlogPostContent.metadata.readingTime)} min read</span>
              </div>
            </div>

<ThemeSwitch/>
          </BlogPostItemComponent>
        </BlogPostProvider>

      ))}

    </div>

  );
}
