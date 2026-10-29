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
          <section
            aria-labelledby="engram-sunset-title"
            className="tw-mx-auto tw-max-w-7xl tw-px-6 tw-py-8"
          >
            <div className="tw-rounded-xl tw-border tw-border-amber-300/50 tw-bg-amber-300/10 tw-p-6">
              <h2 id="engram-sunset-title" className="tw-mt-0 tw-text-2xl tw-text-white">
                Engram sunset notice
              </h2>
              <p className="tw-mb-0 tw-text-white">
                Engram is being sunset. This page remains available for reference.
              </p>
            </div>
          </section>
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
