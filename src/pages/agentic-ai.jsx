import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";

import Header from "/src/components/AgenticAI/Header";
import Details from "/src/components/AgenticAI/Details";
import Blogs from "/src/components/AgenticAI/Blogs";
import CTA from "/src/components/AgenticAI/CTA";
import ThemeSwitch from "/src/components/ThemeSwitch";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className="custom-page noBG">
      <Layout
        title="Agentic AI"
        description="Discover the power of Agentic AI with Weaviate. Our cutting-edge platform enables you to build intelligent agents that can autonomously perform tasks, make decisions, and interact with users. Explore our comprehensive resources, tutorials, and support to unleash the full potential of Agentic AI in your applications."
      >
        <MetaSEO img="og/website/home.jpg" />
        <Header />
        <main>
          <Details />
          <Blogs />
          <CTA />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
