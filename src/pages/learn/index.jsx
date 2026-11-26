import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";

import Header from "/src/components/Learn/Header";
import GetStarted from "/src/components/Learn/GetStarted";
import Documentation from "/src/components/Learn/Documentation";
import WhatsNew from "/src/components/Learn/Examples";
import Guides from "/src/components/Learn/Guides";
import Ebooks from "../../components/Learn/Ebooks";
import GoFurther from "/src/components/Learn/Further";
import Resources from "../../components/Learn/Resources";
import ThemeSwitch from "/src/components/ThemeSwitch";

export default function Home() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Learning Center"
        description="Find learning paths, guides, and events for building production AI with Weaviate—from strategy to scale."
      >
        <MetaSEO img="og/content/learning-centre.jpg" />
        <Header />
        <main>
          <Resources />
          <GetStarted />
          <Ebooks />
          <WhatsNew />
          <Documentation />
          <GoFurther />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
