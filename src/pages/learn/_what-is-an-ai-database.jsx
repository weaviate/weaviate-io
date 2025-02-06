import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';

import Header from '/src/components/Learn/Whatisanaidatabase/Header';
import GetStarted from '/src/components/Learn/Whatisanaidatabase/GetStarted';
import Documentation from '/src/components/Learn/Whatisanaidatabase/Documentation';
import Examples from '/src/components/Learn/Whatisanaidatabase/Examples';
import Guides from '/src/components/Learn/Whatisanaidatabase/Guides';
import GoFurther from '/src/components/Learn/Whatisanaidatabase/Further';
import Resources from '../../components/Learn/Whatisanaidatabase/Resources';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Summary from '/src/components/Learn/Whatisanaidatabase/Summary';

export default function Home() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="What is an AI Database?"
        description="Learn about AI databases, including AI database design, examples, and more."
      >
        <MetaSEO img="og/content/learning-centre.jpg" />
        <Header />
        <main>
          <Resources />
          <GetStarted />
          <Guides />
          <Documentation />
          <Examples />
          <Summary />
          <GoFurther />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
