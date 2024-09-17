// src/theme/BlogPostPage/index.js
import React from 'react';
import OriginalBlogPostPage from '@theme-original/BlogPostPage'; 
import BackToBlogHub from '../../components/Blog/BacktoBlog';

export default function BlogPostPageWrapper(props) {
  return (
    <>
      <BackToBlogHub />
      <OriginalBlogPostPage {...props} />
    </>
  );
}
