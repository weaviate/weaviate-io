import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";
import Hero from "../../components/Database/Hero";
import FeatureSplit from "../../components/Database/FeatureSplit";
import BenefitCards from "../../components/Database/BenefitCards";
import DeveloperExperience from "../../components/Database/DeveloperExperience";
import CTA from "../../components/Database/CTA";
import Blogs from "../../components/Database/Blogs";
import Capabilities from "../../components/Database/Capabilities";

export default function DatabasePage() {
  return (
    <Layout
      title="Open Source Vector Database"
      description="Simplify the development of AI applications and enable developers of all levels to build, iterate, and scale AI capabilities faster."
    >
      <main>
        <MetaSEO />
        <Hero />
        <BenefitCards />
        <FeatureSplit />
        <DeveloperExperience />
        <CTA />
        <Capabilities />
      </main>
    </Layout>
  );
}
