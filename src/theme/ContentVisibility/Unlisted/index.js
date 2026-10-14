import React from 'react';
import {UnlistedMetadata} from '@docusaurus/theme-common';

// Unlisted posts keep the noindex metadata but show no banner.
export default function Unlisted() {
  return <UnlistedMetadata />;
}
