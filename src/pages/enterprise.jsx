import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";
import Hero from "../components/Enterprise/Hero";
import FeatureSplit from "../components/Enterprise/FeatureSplit";
import UseCaseCard from "../components/Enterprise/UseCasesV2";
import DeploymentOptions from "../components/Enterprise/Deployment";
import EnterprisePricing from "../components/Enterprise/EnterprisePricing";
import AssuranceSection from "../components/Enterprise/AssuranceSection";
import SecurityCompliance from "../components/Enterprise/SecurityCompliance";
import BenefitCards from "../components/Enterprise/BenefitCards";
import DeveloperExperience from "../components/Enterprise/DeveloperExperience";
import CTA from "../components/Enterprise/CTA";
import Blogs from "../components/Enterprise/Blogs";

export default function EnterprisePage() {
  return (
    <Layout
      title="Enterprise AI Database"
      description="From dedicated cloud deployments to enterprise SLAs backed by our core engineering team — everything you need to run mission-critical AI workloads in production."
    >
      <main>
        <MetaSEO />
        <Hero />
        <UseCaseCard />
        <DeploymentOptions />
        <EnterprisePricing />
        <AssuranceSection />
        <SecurityCompliance />

        <CTA />
      </main>
    </Layout>
  );
}
