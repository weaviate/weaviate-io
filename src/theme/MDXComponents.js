import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { LinkButton, LinkButtonAccent, ButtonContainer, DownloadButton } from './Buttons';
import { MetaSEO } from './MetaSEO';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  LinkButton: LinkButton,
  LinkButtonAccent: LinkButtonAccent,
  DownloadButton: DownloadButton,
  ButtonContainer: ButtonContainer,
  MetaSEO: MetaSEO,
};