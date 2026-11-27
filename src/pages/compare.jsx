import React from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import ComparisonCards from "/src/components/ComparePages/ComparisonCards";
import EnterpriseUseCases from "/src/components/Enterprise/UseCasesV2";
import TrustedBy from "/src/components/Enterprise/TrustedBy";

export default function ComparePage() {
  const title = "Compare Weaviate";
  const description =
    "Compare Weaviate with other vector search and database options to find the right fit for your AI application.";
  const canonical = "https://weaviate.io/compare";

  return (
    <Layout title="Compare Weaviate" description={description}>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Weaviate" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://weaviate.io/og/default.jpg" />
      </Head>
      <main className="tw-bg-[#111111] tw-text-white">
        <section className="tw-py-16 md:tw-py-24">
          <div className="container">
            <h1 className="tw-mb-4 tw-text-[#DDEBF2]">Compare Weaviate</h1>
            <p className="tw-mb-10 tw-max-w-3xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
              Explore how Weaviate compares with the tools you use to build
              search and AI applications.
            </p>
            <ComparisonCards headingLevel="h2" />
          </div>
        </section>
        <EnterpriseUseCases />
        <TrustedBy />
        <section className="tw-px-6 tw-py-16">
          <div className="container tw-text-center">
            <h2 className="tw-mb-6 tw-text-[#DDEBF2]">
              Talk to our team about your evaluation
            </h2>
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
              <a
                href="https://console.weaviate.io/signup"
                className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-font-semibold tw-text-[#111111] tw-no-underline hover:tw-text-[#111111] hover:tw-no-underline"
              >
                Start free
              </a>
              <a
                href="/contact"
                className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/40 tw-px-8 tw-font-semibold tw-text-white tw-no-underline hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
              >
                Talk to our team
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
