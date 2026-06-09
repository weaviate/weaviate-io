import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";

const headingFont = { fontFamily: '"Plus Jakarta Sans", sans-serif' };
const bodyFont = { fontFamily: "Inter, sans-serif" };

const deploymentOptions = [
  {
    title: "Dedicated Cloud",
    tag: "Most popular for enterprise",
    description:
      "A professionally managed AI database on single-tenant infrastructure. Consistent performance with no noisy neighbors, backed by SOC 2 and HIPAA compliance.",
    features: [
      "Isolated, dedicated instance for security and consistency",
      "Up to 99.95% uptime on AWS, GCP & Azure",
      "Dedicated Success Manager and 24/7 monitoring",
    ],
    ctaLabel: "Explore Dedicated Cloud",
    to: "/deployment/dedicated",
    featured: true,
  },
  {
    title: "Shared Cloud",
    tag: "Fastest to production",
    description:
      "Fully managed Weaviate on shared infrastructure. The fastest way to ship, with the full core database toolkit, replication, and high availability.",
    features: [
      "Zero infrastructure to operate",
      "Scales from prototype to production",
      "Available on Flex, Plus, and Premium plans",
    ],
    ctaLabel: "Explore Shared Cloud",
    to: "/deployment/shared",
    featured: false,
  },
  {
    title: "Self-Hosted + Assurance",
    tag: "Maximum control",
    description:
      "Run open-source Weaviate in your own environment and back it with Weaviate Assurance: enterprise SLAs and a direct line to our core engineering team.",
    features: [
      "Full control over infrastructure and data residency",
      "24×7 incident response with 1-hour P1 SLA",
      "Proactive upgrade and lifecycle guidance",
    ],
    ctaLabel: "Explore Weaviate Assurance",
    to: "/product/assurance",
    featured: false,
  },
];

const enterprisePlans = [
  {
    product: "Weaviate Database",
    title: "Premium",
    price: "$400",
    priceSuffix: "/mo",
    eyebrow: "Starts at",
    meta: "Prepaid annual contract",
    description:
      "For teams scaling AI in production who need predictable pricing and enhanced reliability. The only Database plan with a dedicated deployment option.",
    features: [
      "Choice of shared or dedicated deployment",
      "Trusted reliability — up to 99.95% uptime",
      "Global coverage on AWS, GCP & Azure",
      "Enterprise support: as low as 1-hour Severity 1 response",
      "Technical Account Team",
    ],
  },
  {
    product: "Engram",
    title: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    eyebrow: "Pricing",
    meta: "Volume-based annual contract",
    description:
      "Agent memory at enterprise scale, with custom pipelines for any domain and the compliance features your security team expects.",
    features: [
      "Custom run volume & unlimited projects",
      "Custom pipeline builder for any domain",
      "Dedicated TAM + SLA",
      "SSO & SAML",
      "Everything in Team",
    ],
  },
];

const assurancePillars = [
  {
    title: "Incident Response & SLAs",
    description:
      "24×7 global coverage with a 1-hour SLA for critical issues, root cause analysis, and direct engineering escalation.",
  },
  {
    title: "Proactive Expert Guidance",
    description:
      "Recurring office hours with Weaviate engineers covering index selection, query tuning, schema design, and architecture reviews.",
  },
  {
    title: "Managed Lifecycle Support",
    description:
      "Upgrade advisory for every release, compatibility assessments for your environment, and managed end-of-life migrations.",
  },
  {
    title: "Dedicated Account Management",
    description:
      "A private Slack channel, an assigned Account Executive, and periodic business reviews aligned to your roadmap.",
  },
];

const complianceItems = [
  {
    title: "SOC 2",
    description:
      "Weaviate Cloud is SOC 2 certified, with controls independently audited for security and availability.",
  },
  {
    title: "HIPAA",
    description:
      "HIPAA-compliant deployments are available on Dedicated Cloud for workloads handling protected health information.",
  },
  {
    title: "RBAC & SSO",
    description:
      "Role-based access control on all paid plans, with SSO / SAML single sign-on on Plus and above.",
  },
  {
    title: "Your Cloud, Your Region",
    description:
      "Deploy on AWS, GCP, or Azure in the region your data needs to live — or self-host for full data residency control.",
  },
];

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="tw-mx-auto tw-mb-12 tw-max-w-3xl tw-text-center">
      {eyebrow ? (
        <p
          className="tw-mb-4 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-[0.14em]"
          style={{
            ...headingFont,
            background: "linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
        style={headingFont}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className="tw-mx-auto tw-mt-5 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
          style={bodyFont}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function FeatureList({ items }) {
  return (
    <ul className="tw-m-0 tw-list-none tw-space-y-3 tw-p-0">
      {items.map((item) => (
        <li
          key={item}
          className="tw-flex tw-items-start tw-gap-3 tw-text-[15px] tw-leading-6 tw-text-[#B9C8DE]"
          style={bodyFont}
        >
          <span className="tw-mt-0.5 tw-text-[#00FE6B]" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Hero() {
  return (
    <section className="tw-relative tw-overflow-hidden tw-bg-[#111111] tw-py-20 lg:tw-py-24">
      <div className="container">
        <div className="tw-mx-auto tw-max-w-4xl tw-text-center">
          <p
            className="tw-mb-5 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-[0.14em]"
            style={{
              ...headingFont,
              background:
                "linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Weaviate for Enterprise
          </p>

          <h1
            className="tw-mb-8 tw-text-[3rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em]"
            style={headingFont}
          >
            <span className="tw-block tw-text-[#DDEBF2]">
              AI infrastructure your enterprise
            </span>
            <span className="tw-block tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-bg-clip-text tw-text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              can depend on
            </span>
          </h1>

          <p
            className="tw-mx-auto tw-mb-12 tw-max-w-2xl tw-text-xl tw-leading-relaxed tw-text-[#b8c4d4]"
            style={bodyFont}
          >
            From dedicated cloud deployments to enterprise SLAs backed by our
            core engineering team — everything you need to run mission-critical
            AI workloads in production.
          </p>

          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
            <Link
              to="/contact"
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
              style={bodyFont}
            >
              Contact sales
            </Link>

            <Link
              to="/pricing"
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-transparent tw-px-8 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
              style={{
                ...bodyFont,
                border: "0.5px solid #ECF4F8",
                borderRadius: "0.375rem",
              }}
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeploymentOptions() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <SectionHeading
          eyebrow="Deployment"
          title="Run Weaviate the way your organization requires"
          intro="Managed by us in shared or dedicated environments, or self-hosted in your own infrastructure with enterprise backing."
        />

        <div className="tw-grid tw-gap-6 lg:tw-grid-cols-3">
          {deploymentOptions.map((option) => (
            <article
              key={option.title}
              className="tw-relative tw-flex tw-flex-col tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-10"
              style={{
                boxShadow: option.featured
                  ? "0 0 0 1px rgba(0,254,107,0.35), 0 22px 70px rgba(0,0,0,0.18)"
                  : "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <p
                className="tw-mb-4 tw-text-[12px] tw-font-semibold tw-uppercase tw-tracking-[0.14em] tw-text-[#7BE7C7]"
                style={headingFont}
              >
                {option.tag}
              </p>

              <h3
                className="tw-m-0 tw-text-[1.55rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
                style={headingFont}
              >
                {option.title}
              </h3>

              <p
                className="tw-mb-7 tw-mt-4 tw-text-[1.05rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {option.description}
              </p>

              <div className="tw-mb-8 tw-flex-1">
                <FeatureList items={option.features} />
              </div>

              <Link
                to={option.to}
                className="tw-inline-flex tw-items-center tw-gap-2 tw-text-[15px] tw-font-semibold tw-text-[#7BE7C7] tw-no-underline tw-transition hover:tw-text-white hover:tw-no-underline"
                style={bodyFont}
              >
                {option.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterprisePricing() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <SectionHeading
          eyebrow="Pricing"
          title="Enterprise plans across the platform"
          intro="Predictable annual contracts for the AI Database, and custom agreements for Engram agent memory at scale."
        />

        <div className="tw-mx-auto tw-grid tw-max-w-5xl tw-gap-6 md:tw-grid-cols-2">
          {enterprisePlans.map((plan) => (
            <article
              key={plan.product}
              className="tw-flex tw-flex-col tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-10"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <p
                className="tw-mb-2 tw-text-[12px] tw-font-semibold tw-uppercase tw-tracking-[0.14em] tw-text-[#7BE7C7]"
                style={headingFont}
              >
                {plan.product}
              </p>

              <h3
                className="tw-m-0 tw-text-[1.7rem] tw-font-semibold tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
                style={headingFont}
              >
                {plan.title}
              </h3>

              <div className="tw-mt-5">
                <p
                  className="tw-m-0 tw-text-[13px] tw-uppercase tw-tracking-[0.1em] tw-text-[#8A93A9]"
                  style={bodyFont}
                >
                  {plan.eyebrow}
                </p>
                <p className="tw-m-0 tw-mt-1" style={headingFont}>
                  <span className="tw-text-[2.4rem] tw-font-semibold tw-text-white">
                    {plan.price}
                  </span>
                  <span className="tw-text-[1.1rem] tw-text-[#B9C8DE]">
                    {plan.priceSuffix}
                  </span>
                </p>
                <p
                  className="tw-m-0 tw-mt-1 tw-text-[14px] tw-text-[#8A93A9]"
                  style={bodyFont}
                >
                  {plan.meta}
                </p>
              </div>

              <p
                className="tw-mb-7 tw-mt-6 tw-text-[1.05rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {plan.description}
              </p>

              <div className="tw-mb-8 tw-flex-1">
                <FeatureList items={plan.features} />
              </div>

              <Link
                to="/contact"
                className="tw-inline-flex tw-min-h-[50px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-transparent tw-px-8 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                style={{
                  ...bodyFont,
                  border: "0.5px solid #ECF4F8",
                  borderRadius: "0.375rem",
                }}
              >
                Contact sales
              </Link>
            </article>
          ))}
        </div>

        <p
          className="tw-mt-10 tw-text-center tw-text-[15px] tw-text-[#8A93A9]"
          style={bodyFont}
        >
          Compare all plans, including Free, Flex, and Plus, on the{" "}
          <Link to="/pricing" className="tw-text-[#7BE7C7] hover:tw-text-white">
            pricing page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function AssuranceSpotlight() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div
          className="tw-rounded-[1.875rem] tw-border tw-border-white/10 tw-bg-[linear-gradient(123deg,_rgba(38,214,255,0.12)_12.44%,_rgba(215,122,255,0.12)_109.26%)] tw-p-8 md:tw-p-14"
          style={{ boxShadow: "0 28px 90px rgba(0,0,0,0.35)" }}
        >
          <div className="tw-mx-auto tw-mb-12 tw-max-w-3xl tw-text-center">
            <p
              className="tw-mb-4 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-[0.14em]"
              style={{
                ...headingFont,
                background:
                  "linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Weaviate Assurance
            </p>
            <h2
              className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
              style={headingFont}
            >
              Self-hosted flexibility, managed-service reliability
            </h2>
            <p
              className="tw-mx-auto tw-mt-5 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
              style={bodyFont}
            >
              A premium annual subscription that gives your team a direct line
              to Weaviate&apos;s core engineering expertise — built on four
              pillars.
            </p>
          </div>

          <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
            {assurancePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="tw-rounded-[1.25rem] tw-bg-[#111111]/60 tw-p-6"
              >
                <h3
                  className="tw-m-0 tw-text-[1.15rem] tw-font-semibold tw-leading-[140%] tw-text-[#DDEBF2]"
                  style={headingFont}
                >
                  {pillar.title}
                </h3>
                <p
                  className="tw-m-0 tw-mt-3 tw-text-[15px] tw-leading-[160%] tw-text-[#B9C8DE]"
                  style={bodyFont}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="tw-mt-12 tw-text-center">
            <Link
              to="/product/assurance"
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
              style={bodyFont}
            >
              Learn about Weaviate Assurance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <SectionHeading
          eyebrow="Security & Compliance"
          title="Built for your security review"
          intro="Enterprise-grade security controls and certifications across managed and self-hosted deployments."
        />

        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {complianceItems.map((item) => (
            <article
              key={item.title}
              className="tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <h3
                className="tw-m-0 tw-text-[1.3rem] tw-font-semibold tw-text-[#DDEBF2]"
                style={headingFont}
              >
                {item.title}
              </h3>
              <p
                className="tw-m-0 tw-mt-3 tw-text-[15px] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <p
          className="tw-mt-10 tw-text-center tw-text-[15px] tw-text-[#8A93A9]"
          style={bodyFont}
        >
          Read more about our practices on the{" "}
          <Link to="/security" className="tw-text-[#7BE7C7] hover:tw-text-white">
            security page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-3xl tw-text-center">
        <h2
          className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
          style={headingFont}
        >
          Talk to us about your enterprise deployment
        </h2>
        <p
          className="tw-mx-auto tw-mt-5 tw-max-w-xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
          style={bodyFont}
        >
          Our team will help you scope the right deployment model, plan, and
          support level for your workloads.
        </p>
        <div className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
          <Link
            to="/contact"
            className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
            style={bodyFont}
          >
            Contact sales
          </Link>
          <Link
            to="/case-studies"
            className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-transparent tw-px-8 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
            style={{
              ...bodyFont,
              border: "0.5px solid #ECF4F8",
              borderRadius: "0.375rem",
            }}
          >
            Read customer stories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Enterprise() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate for Enterprise"
        description="Enterprise-grade AI infrastructure: dedicated cloud deployments, enterprise plans, Weaviate Assurance for self-hosted, and SOC 2 / HIPAA compliance."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero />
          <DeploymentOptions />
          <EnterprisePricing />
          <AssuranceSpotlight />
          <Compliance />
          <FinalCTA />
        </main>
      </Layout>
    </div>
  );
}
