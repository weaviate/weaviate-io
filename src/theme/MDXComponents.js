import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { LinkButton, ButtonContainer } from './LinkButton';
import { MetaSEO } from './MetaSEO';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  LinkButton: LinkButton,
  ButtonContainer: ButtonContainer,
  MetaSEO: MetaSEO,
};