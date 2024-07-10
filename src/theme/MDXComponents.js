import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { LinkButton, ButtonContainer, DownloadButton } from './Buttons';
import { MetaSEO } from './MetaSEO';
import { Roadmap } from './Roadmap';
import FeaturedBlogTags from './FeaturedBlogTags';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  LinkButton: LinkButton,
  DownloadButton: DownloadButton,
  ButtonContainer: ButtonContainer,
  MetaSEO: MetaSEO,
  Roadmap: Roadmap,
  FeaturedBlogTags: FeaturedBlogTags,
};