import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function SunsetPage() {
  return (
    <Layout title="Transformation Agent (Sunset) | Weaviate" description="Transformation Agent is being sunset. Review current product and retirement information.">
      <main className="tw-bg-[#111111] tw-px-6 tw-py-16 tw-text-white">
        <div className="tw-mx-auto tw-max-w-3xl">
          <h1>Transformation Agent</h1>
          <h2>Sunset notice</h2>
          <p>Transformation Agent is being sunset and should not be used for new workloads.</p>
          <p>Engram is being sunset. New Engram projects can no longer be created. Existing projects will continue to work until December 31, 2026.</p>
          <p><Link to="https://docs.weaviate.io/engram">Read the Engram sunset details</Link></p>
          <p>Query Agent supports natural-language retrieval. It is not a replacement for persistent memory or every legacy agent workflow.</p>
          <p><Link to="/product">Explore current Weaviate products</Link></p>
        </div>
      </main>
    </Layout>
  );
}
