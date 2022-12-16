import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Badges from '@site/src/components/badges';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "badges" tag to our <Badges /> component!
  // `Badges` will receive all props that were passed to `badges` in MDX
  badges: Badges,
};