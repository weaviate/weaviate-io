import React from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Remote/Header';
import Details from '/src/components/Remote/Details';
import Map from '/src/components/Remote/Map';
import Join from '/src/components/Remote/Join';
import Quote from '/src/components/Remote/Quote';
import Playbook from '/src/components/Remote/Playbook/playbook';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function AboutUsPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Remote work at Weaviate"
        description="Together, we create a space for flexibility and growth, innovation, making work more fun and fulfilling"
      >
        <MetaSEO img="og/content/remote.jpg" />
        <Header />
        <Details />
        <Map />
        <Join />
        <Quote />
        <Playbook />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
