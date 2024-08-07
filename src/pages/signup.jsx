import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import Introduction from '/src/components/Signup/Introduction/introduction';

import ThemeSwitch from '/src/components/ThemeSwitch';

export default function awsContactPage() {
  return (
    <div className="custom-page noBG">
      <Introduction />

      <ThemeSwitch />
    </div>
  );
}
