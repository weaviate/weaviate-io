import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StudyHeader from '/src/components/StartUp/Header';
import Main from '/src/components/StartUp/Main';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function StartUpPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Start Up Program"
        description="Our startup program is designed for early stage startups looking to build and grow innovative AI solutions with Weaviate"
      >
        <StudyHeader />
        <Main />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
