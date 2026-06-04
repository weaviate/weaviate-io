import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";

import Hero from "/src/components/ProductPageTemplate/Hero";
import BenefitCards from "/src/components/ProductPageTemplate/BenefitCards";
import FeatureSplit from "/src/components/ProductPageTemplate/FeatureSplit";
import StepsSection from "/src/components/ProductPageTemplate/StepsSection";
import CTA from "/src/components/ProductPageTemplate/CTA";
import Blogs from "/src/components/ProductPageTemplate/Blogs";

export default function Engram() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Engram | Weaviate Agents"
        description="Memory built for AI agents that remember, learn, and continually improve over time."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero />
          <BenefitCards />
          <FeatureSplit />
          <StepsSection />
          <CTA />
          <Blogs />
        </main>
      </Layout>
    </div>
  );
}
