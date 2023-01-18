import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { LinkButton, ButtonContainer, DownloadButton } from './LinkButton';
import { MetaSEO } from './MetaSEO';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  LinkButton: LinkButton,
  DownloadButton: DownloadButton,
  ButtonContainer: ButtonContainer,
  MetaSEO: MetaSEO,
};