import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";
import IndustrySelector from "/src/components/Industries/IndustrySelector";
import IdeaCards from "/src/components/Industries/IdeaCards";
import ContentSection from "/src/components/Industries/ContentSection";
import { industries } from "/src/components/Industries/data";

export default function IndustriesPage() {
  const [selectedId, setSelectedId] = useState(industries[0].id);
  const industry =
    industries.find((item) => item.id === selectedId) || industries[0];

  return (
    <div className="custom-page noBG">
      <Layout
        title="AI solutions by industry | Weaviate"
        description="Explore what teams in your industry can build with Weaviate, learn from real examples, and find resources to get started."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-min-h-screen tw-bg-[#111111] tw-text-white">
          <section className="tw-relative tw-overflow-hidden tw-px-6 tw-py-16 lg:tw-py-24">
            <div className="tw-pointer-events-none tw-absolute tw-right-[-12rem] tw-top-[-14rem] tw-h-[34rem] tw-w-[34rem] tw-rounded-full tw-bg-[#26D6FF] tw-opacity-10 tw-blur-[120px]" />
            <div className="tw-relative tw-mx-auto tw-max-w-[1320px]">
              <p className="tw-m-0 tw-font-['Inter'] tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.16em] tw-text-[#00FE6B]">
                Weaviate by industry
              </p>
              <h1 className="tw-m-0 tw-mt-6 tw-max-w-5xl tw-font-['Plus_Jakarta_Sans'] tw-text-4xl tw-font-semibold tw-leading-[1.08] tw-tracking-[-0.04em] tw-text-[#DDEBF2] md:tw-text-6xl lg:tw-text-7xl">
                Find the AI application your industry should build next
              </h1>
              <p className="tw-m-0 tw-mt-8 tw-max-w-3xl tw-font-['Inter'] tw-text-xl tw-leading-relaxed tw-text-[#B9C8DE] md:tw-text-2xl">
                Explore useful ideas, real-world examples, and practical
                resources shaped around the work your team already does.
              </p>
              <div className="tw-mt-12">
                <IndustrySelector
                  industries={industries}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>
          </section>

          <div
            id="industry-panel"
            role="tabpanel"
            className="tw-mx-auto tw-max-w-[1320px] tw-px-6"
          >
            <section className="tw-py-14 lg:tw-py-20">
              <p className="tw-m-0 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.16em] tw-text-[#43E2C5]">
                {industry.eyebrow}
              </p>
              <h2 className="tw-m-0 tw-mt-5 tw-max-w-4xl tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold tw-leading-tight tw-text-[#DDEBF2] md:tw-text-5xl">
                {industry.title}
              </h2>
              <p className="tw-m-0 tw-mt-6 tw-max-w-3xl tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE] md:tw-text-xl">
                {industry.description}
              </p>
            </section>

            <section className="tw-pb-16 lg:tw-pb-24">
              <div className="tw-mb-10">
                <p className="tw-m-0 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.16em] tw-text-[#00FE6B]">
                  Imagine what you could build
                </p>
              </div>
              <IdeaCards ideas={industry.ideas} />
            </section>

            <ContentSection
              title="See how teams are using Weaviate"
              description="Source-backed stories showing what organisations in this space have built and learned."
              items={industry.proof}
              emptyLabel="Customer examples will appear here once their sources and claims are verified in the content brief."
            />

            <ContentSection
              title="Keep exploring"
              description="Case studies, articles, demos, and technical guides selected for this industry."
              items={industry.resources}
              emptyLabel="Relevant resources are being collected."
            />
          </div>

          <section className="tw-px-6 tw-py-16 lg:tw-py-24">
            <div className="tw-mx-auto tw-flex tw-max-w-[1320px] tw-flex-col tw-items-start tw-justify-between tw-gap-8 tw-rounded-[2rem] tw-bg-[linear-gradient(120deg,#14352A,#173848_55%,#33284A)] tw-p-10 md:tw-p-14 lg:tw-flex-row lg:tw-items-center">
              <div className="tw-max-w-3xl">
                <h2 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold tw-text-white md:tw-text-4xl">
                  Ready to turn an industry idea into an AI application?
                </h2>
                <p className="tw-m-0 tw-mt-5 tw-text-lg tw-leading-relaxed tw-text-[#DDEBF2]">
                  Start with Weaviate Cloud or explore the developer quickstart.
                </p>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-4">
                <Link
                  to="https://console.weaviate.cloud/"
                  className="tw-rounded-md tw-bg-[#00FE6B] tw-px-7 tw-py-4 tw-font-semibold tw-text-[#111111] tw-no-underline hover:tw-text-[#111111] hover:tw-no-underline"
                >
                  Start building
                </Link>
                <Link
                  to="https://docs.weaviate.io/weaviate/quickstart"
                  className="tw-rounded-md tw-border tw-border-white/40 tw-px-7 tw-py-4 tw-font-semibold tw-text-white tw-no-underline hover:tw-border-white hover:tw-text-white hover:tw-no-underline"
                >
                  View quickstart
                </Link>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
