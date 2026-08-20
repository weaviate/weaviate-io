import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";
import TrustedBy from "/src/components/Enterprise/TrustedBy";

const headingFont = { fontFamily: '"Plus Jakarta Sans", sans-serif' };
const bodyFont = { fontFamily: "Inter, sans-serif" };

const whyManaged = [
  {
    icon: "digital-ocean-icon-01.svg",
    title: "Spend less time managing infrastructure",
    description:
      "Stop allocating engineering cycles to upgrades, patching, backups, and scaling. Keep your team focused on shipping AI product features.",
  },
  {
    icon: "digital-ocean-icon-02.svg",
    title: "Deploy production clusters in minutes",
    description:
      "Provision from the DigitalOcean control panel, API, or doctl, then connect with official Weaviate SDKs without rewriting your stack.",
  },
  {
    icon: "digital-ocean-icon-03.svg",
    title: "Keep AI applications online",
    description:
      "Run production RAG, semantic search, hybrid retrieval, and agentic workflows on infrastructure designed for uptime and operational continuity.",
  },
  {
    icon: "digital-ocean-icon-04.svg",
    title: "Scale with predictable operational costs",
    description:
      "Start at $20/month with flat pricing, no per-query read unit fees, and no per-dimension pricing surprises as usage grows.",
  },
];

const managedFeatures = [
  "Recover quickly with managed backups",
  "Scale storage without migration projects",
  "Stay secure with managed patching",
  "Protect traffic with TLS by default on port 443",
  "Stay current without maintenance windows",
  "Maintain uptime with high availability",
  "Diagnose faster with integrated insights and logs",
  "Rotate credentials without downtime",
];

const relatedResources = [
  {
    title: "Deployment Guide",
    description:
      "Learn how to provision and connect your Managed Weaviate cluster.",
    cta: "View deployment guide",
    href: "https://docs.weaviate.io/deploy/installation-guides/digitalocean",
  },
  {
    title: "DigitalOcean Documentation",
    description:
      "Explore cluster management, plans, regions, and operational guidance.",
    cta: "Explore documentation",
    href: "https://docs.digitalocean.com/products/vector-databases/weaviate/",
  },
  {
    title: "Public Preview Announcement",
    description:
      "Read about Managed Weaviate pricing and the public preview launch.",
    cta: "Read announcement",
    href: "https://www.digitalocean.com/blog/public-preview-managed-weaviate",
  },
  {
    title: "Client SDKs and Quickstart",
    description:
      "Connect with Python, JavaScript, Go, or Java clients and start building quickly.",
    cta: "Open SDK quickstart",
    href: "https://docs.weaviate.io/deploy/installation-guides/digitalocean",
  },
];

const deploymentSteps = [
  {
    step: "STEP 1",
    title: "Provision",
    icon: "/img/site/2026/digital-ocean-step-01.svg",
    description:
      "Create a cluster from the control panel, API, or doctl and start with production-ready defaults.",
  },
  {
    step: "STEP 2",
    title: "Connect",
    icon: "/img/site/2026/digital-ocean-step-02.svg",
    description:
      "Connect using your HTTP host, gRPC host, and API key with official Weaviate SDKs and compatible APIs.",
  },
  {
    step: "STEP 3",
    title: "Build",
    icon: "/img/site/2026/digital-ocean-step-03.svg",
    description:
      "Ship RAG, semantic search, hybrid retrieval, and agentic workflows while DigitalOcean handles infrastructure operations.",
  },
];

function Hero() {
  return (
    <>
      <section className="tw-relative tw-overflow-hidden tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
        <div className="tw-mx-auto tw-max-w-[1320px]">
          <div className="tw-grid tw-items-center tw-gap-12 lg:tw-grid-cols-[0.95fr_1.05fr] lg:tw-gap-16">
            <div>
              <p
                className="tw-m-0 tw-mb-8 tw-uppercase"
                style={{
                  color: "#00FE6B",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Managed Weaviate on DigitalOcean
              </p>

              <h1
                className="tw-mb-8 tw-font-['Plus_Jakarta_Sans'] tw-text-[3rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em]"
                style={{
                  color: "#DDEBF2",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  letterSpacing: "-0.04em",
                  fontSize: "3rem",
                }}
              >
                Run Weaviate in production without managing infrastructure
              </h1>

              <p
                className="tw-mt-8 tw-max-w-2xl tw-text-xl tw-leading-relaxed md:tw-text-2xl"
                style={{
                  color: "#B9C8DE",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Deploy fully managed Weaviate clusters on DigitalOcean while
                your team focuses on building AI applications, not operating
                database infrastructure.
              </p>

              <div className="tw-mt-12 tw-flex tw-flex-wrap tw-gap-5">
                <Link
                  to="https://cloud.digitalocean.com/vectordatabases/new?selected_db=weaviate"
                  className="tw-inline-flex tw-min-h-[58px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
                >
                  Deploy on DigitalOcean
                </Link>

                <Link
                  to="https://docs.digitalocean.com/products/vector-databases/weaviate/"
                  className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/40 tw-bg-transparent tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-border-white hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    borderRadius: "0.375rem",
                    border: "0.5px solid #ECF4F8",
                  }}
                >
                  View Documentation
                </Link>
              </div>
            </div>

            <div className="tw-relative">
              <div className="tw-absolute tw-inset-0 tw-rounded-[1.875rem] tw-bg-[linear-gradient(123deg,#26D6FF_12.44%,#D77AFF_109.26%)] tw-opacity-20" />

              <div className="tw-relative tw-rounded-[1.875rem] tw-border tw-border-white/10 tw-bg-[linear-gradient(123deg,rgba(38,214,255,0.18)_12.44%,rgba(215,122,255,0.18)_109.26%)] tw-p-6 tw-shadow-[0_28px_90px_rgba(0,0,0,0.35)] md:tw-p-10">
                <img
                  src="/img/site/2026/digital-ocean-header.svg"
                  alt="Managed Weaviate on DigitalOcean"
                  className="tw-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustedBy />
    </>
  );
}

function WhyManaged() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {whyManaged.map((item) => (
            <article
              key={item.title}
              className="tw-relative tw-overflow-hidden tw-rounded-[1.5rem] tw-bg-[#1A1A1A] tw-p-8"
            >
              <div className="tw-relative">
                <div className="tw-mb-5 tw-h-16 tw-w-16">
                  <img
                    src={`/img/site/2026/${item.icon}`}
                    alt=""
                    aria-hidden="true"
                    className="tw-h-full tw-w-full"
                  />
                </div>

                <h3
                  className="tw-m-0 tw-text-[1.35rem] tw-font-semibold tw-leading-[130%] tw-text-[#DDEBF2]"
                  style={headingFont}
                >
                  {item.title}
                </h3>

                <p
                  className="tw-m-0 tw-mt-5 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                  style={bodyFont}
                >
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EverythingManaged() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-12 tw-max-w-[35rem]">
          <p
            className="tw-m-0 tw-mb-4 tw-text-[1rem] tw-font-semibold tw-uppercase tw-tracking-[0.08em] tw-text-[#43E2C5]"
            style={bodyFont}
          >
            Why build on DigitalOcean
          </p>

          <h2
            className="tw-m-0 tw-text-[2.4rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Fully managed infrastructure for open-source Weaviate
          </h2>

          <p
            className="tw-m-0 tw-mt-5 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
            style={bodyFont}
          >
            Keep the Weaviate engine, APIs, and SDK compatibility your team
            already uses, while moving daily infrastructure operations out of
            your sprint plan.
          </p>
        </div>

        <div className="tw-grid tw-gap-8 lg:tw-grid-cols-[1.1fr_0.9fr] lg:tw-items-stretch tw-bg-[#1A1A1A]">
          <div className="tw-rounded-[1.5rem] tw-border tw-border-white/10 tw-bg-[#1A1A1A] tw-p-6 md:tw-p-10">
            <img
              src="/img/site/2026/digital-ocean-diagram.svg"
              alt="Managed Weaviate on DigitalOcean architecture"
              className="tw-w-full"
            />
          </div>

          <div className="tw-rounded-[1.5rem] tw-border tw-border-white/10 tw-bg-[#1A1A1A] tw-p-6 md:tw-p-10">
            <h3
              className="tw-m-0 tw-mt-4 tw-text-[1.375rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]"
              style={headingFont}
            >
              Open source portability without platform lock-in
            </h3>

            <p
              className="tw-m-0 tw-mt-4 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
              style={bodyFont}
            >
              Managed Weaviate is part of the DigitalOcean ecosystem alongside
              Managed Databases, Knowledge Bases, and Serverless Inference.
            </p>

            <p
              className="tw-m-0 tw-mt-4 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
              style={bodyFont}
            >
              Build retrieval and generation pipelines on one platform with
              unified billing and no egress fees between DigitalOcean services.
            </p>

            <p
              className="tw-m-0 tw-mt-4 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
              style={bodyFont}
            >
              The platform is OpenAI-compatible and includes native integration
              paths for DigitalOcean Serverless Inference.
            </p>

            <div className="tw-mt-8 tw-grid tw-gap-4 md:tw-grid-cols-2">
              {managedFeatures.map((feature) => (
                <div
                  key={feature}
                  className="tw-flex tw-items-start tw-gap-4 tw-text-[0.98rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                  style={bodyFont}
                >
                  <img
                    src="/img/site/2026/tick-icon-db.svg"
                    alt=""
                    aria-hidden="true"
                    className="tw-mt-1 tw-h-4 tw-w-4 tw-flex-none"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingAndPortability() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-24">
      <div className="tw-mx-auto tw-w-full tw-max-w-[1320px]">
        <div className="tw-mb-12 lg:tw-mb-14">
          <p
            className="tw-m-0 tw-mb-5 tw-text-[0.95rem] tw-font-semibold tw-uppercase tw-tracking-[0.08em] tw-text-[#43E2C5]"
            style={bodyFont}
          >
            Get started
          </p>

          <h2
            className="tw-m-0 tw-max-w-[860px] tw-text-[2.25rem] tw-font-semibold tw-leading-[1.15] tw-tracking-[-0.03em] tw-text-[#DDEBF2] md:tw-text-[2.75rem]"
            style={headingFont}
          >
            Deployment journey:
            <br className="tw-hidden md:tw-block" /> from cluster to production
          </h2>

          <p
            className="tw-m-0 tw-mt-5 tw-max-w-[940px] tw-text-[1rem] tw-leading-[1.6] tw-text-[#B9C8DE]"
            style={bodyFont}
          >
            Managed Weaviate runs the unmodified open-source engine with full
            compatibility for GraphQL, REST, and gRPC, so your deployment model
            can change without rewriting application logic.
          </p>
        </div>

        <div className="tw-grid tw-gap-5 lg:tw-grid-cols-3">
          {deploymentSteps.map((item) => (
            <article
              key={item.step}
              className="tw-min-h-[238px] tw-rounded-[18px] tw-bg-[#1B1B1B] tw-p-7 lg:tw-p-8"
            >
              <div className="tw-flex tw-items-start tw-gap-6">
                <div className="tw-flex tw-h-[64px] tw-w-[64px] tw-flex-none tw-items-center tw-justify-center tw-rounded-[12px] tw-border tw-border-[#666080] tw-bg-[#111111]">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="tw-h-16 tw-w-16"
                  />
                </div>

                <div className="tw-pt-1">
                  <p
                    className="tw-m-0 tw-text-[0.85rem] tw-font-semibold tw-uppercase tw-text-[#43E2C5]"
                    style={bodyFont}
                  >
                    {item.step}
                  </p>

                  <h3
                    className="tw-m-0 tw-mt-2 tw-text-[1.5rem] tw-font-semibold tw-leading-[1.2] tw-text-[#DDEBF2]"
                    style={headingFont}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              <p
                className="tw-m-0 tw-mt-6 tw-text-[0.98rem] tw-leading-[1.65] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="tw-mt-9 tw-grid tw-gap-5 lg:tw-grid-cols-2">
          <article className="tw-rounded-[18px] tw-bg-[#1B1B1B] tw-p-8 md:tw-p-10 lg:tw-p-11">
            <p
              className="tw-m-0 tw-text-[0.9rem] tw-font-semibold tw-uppercase tw-tracking-[0.03em] tw-text-[#43E2C5]"
              style={bodyFont}
            >
              Pricing
            </p>

            <h3
              className="tw-m-0 tw-mt-7 tw-max-w-[650px] tw-text-[1.8rem] tw-font-semibold tw-leading-[1.35] tw-tracking-[-0.02em] tw-text-[#DDEBF2] md:tw-text-[2rem]"
              style={headingFont}
            >
              Managed Weaviate starts at{" "}
              <span className="tw-text-[#43E2C5]">$20/mo</span> with flat
              pricing built for production usage
            </h3>

            <div className="tw-mt-6 tw-max-w-[650px] tw-space-y-5">
              <p
                className="tw-m-0 tw-text-[0.98rem] tw-leading-[1.65] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                There are no per-query read unit fees and no per-dimension
                pricing penalties, so costs stay predictable as applications
                scale.
              </p>

              <p
                className="tw-m-0 tw-text-[0.98rem] tw-leading-[1.65] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                RQ8 compression is enabled by default, reducing RAM usage by
                approximately 4x versus uncompressed vectors while preserving
                recall.
              </p>
            </div>

            <Link
              to="/pricing"
              className="tw-mt-7 tw-inline-block tw-border-b tw-border-[#43E2C5] tw-text-[0.98rem] tw-font-medium tw-text-[#43E2C5] hover:tw-text-[#7BE7C7]"
              style={bodyFont}
            >
              View all pricing
            </Link>
          </article>

          <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2">
            {relatedResources.map((resource, idx) => (
              <article
                key={resource.title}
                className="tw-flex tw-min-h-[210px] tw-flex-col tw-rounded-[18px] tw-bg-[#1B1B1B] tw-p-7 lg:tw-p-8"
              >
                <div className="tw-flex tw-items-start tw-gap-5">
                  <div className="tw-flex tw-h-[54px] tw-w-[54px] tw-flex-none tw-items-center tw-justify-center tw-rounded-[10px] tw-border tw-border-[#666080] tw-bg-[#111111]">
                    <img
                      src={`/img/site/2026/digital-ocean-small-icon-0${
                        idx + 1
                      }.svg`}
                      alt=""
                      aria-hidden="true"
                      className="tw-h-[52px] tw-w-[52px]"
                    />
                  </div>

                  <h4
                    className="tw-m-0 tw-pt-1 tw-text-[1.25rem] tw-font-semibold tw-leading-[1.25] tw-text-[#DDEBF2]"
                    style={headingFont}
                  >
                    {resource.title}
                  </h4>
                </div>

                <p
                  className="tw-m-0 tw-mt-6 tw-text-[0.95rem] tw-leading-[1.65] tw-text-[#B9C8DE]"
                  style={bodyFont}
                >
                  {resource.description}
                </p>

                <Link
                  to={resource.href}
                  className="tw-mt-auto tw-pt-5 tw-text-[0.95rem] tw-font-medium tw-text-[#43E2C5] tw-no-underline hover:tw-text-[#7BE7C7] hover:tw-no-underline"
                  style={bodyFont}
                >
                  {resource.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div
          className="tw-relative tw-flex tw-min-h-[320px] tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-[1.875rem] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-px-6 tw-py-12"
          style={{
            backgroundImage: "url('/img/site/2026/engram-cta-bg.png')",
          }}
        >
          <div className="tw-relative tw-z-10 tw-flex tw-max-w-[760px] tw-flex-col tw-items-center tw-text-center">
            <h2
              className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]"
              style={headingFont}
            >
              Deploy Managed Weaviate today
            </h2>

            <p
              className="tw-m-0 tw-mt-7 tw-max-w-[460px] tw-text-[1.125rem] tw-leading-[160%] tw-text-[#DDEBF2]"
              style={bodyFont}
            >
              Launch a fully managed, open-source Weaviate cluster in minutes
              and ship production AI applications without infrastructure drag.
            </p>

            <Link
              to="https://cloud.digitalocean.com/vectordatabases/new?selected_db=weaviate"
              className="tw-mt-10 tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-10 tw-py-4 tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition-all hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
              style={bodyFont}
            >
              Launch your cluster
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ManagedWeaviateOnDigitalOcean() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Managed Weaviate on DigitalOcean"
        description="Run fully managed Weaviate on DigitalOcean with predictable pricing, built-in security, and open-source portability for production AI workloads."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero />
          <WhyManaged />
          <EverythingManaged />
          <PricingAndPortability />
          <FinalCTA />
        </main>
      </Layout>
    </div>
  );
}
