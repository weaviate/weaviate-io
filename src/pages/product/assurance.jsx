import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";

const headingFont = { fontFamily: '"Plus Jakarta Sans", sans-serif' };
const bodyFont = { fontFamily: "Inter, sans-serif" };

const pillars = [
  {
    number: "01",
    title: "Enterprise Incident Response & SLAs",
    description:
      "When production issues arise, minutes matter. Assurance customers receive our highest tier of reactive support.",
    items: [
      "24×7 global coverage for critical (P1) issues",
      "Elevated response times: P1 in 1 hour, P2 in 4 hours, P3 in 1 business day",
      "Root cause analysis with deep-dive reporting to prevent recurrence",
      "Direct engineering escalation via private, authenticated channels",
    ],
  },
  {
    number: "02",
    title: "Proactive Expert Guidance",
    description:
      "Maximize the performance of your cluster through continuous knowledge transfer with Weaviate engineers.",
    items: [
      "Recurring expert office hours with Weaviate engineers",
      "Technical optimization: vector index selection (HNSW / DiskANN), query performance tuning, schema design, replication strategies",
      "Periodic architecture reviews as your data grows",
    ],
  },
  {
    number: "03",
    title: "Managed Lifecycle Support",
    description:
      "Avoid the risks of technical debt and outdated versions while adopting database improvements as they ship.",
    items: [
      "Upgrade advisory for every Weaviate release (approx. 9 per year)",
      "Compatibility assessments for your specific environment and data types",
      "End-of-life migration guidance for zero-downtime continuity",
    ],
  },
  {
    number: "04",
    title: "Dedicated Account Management",
    description:
      "A streamlined communication layer to ensure your business goals are met.",
    items: [
      "Real-time collaboration via a private Slack channel",
      "Assigned Account Executive and priority escalation coordination",
      "Periodic business reviews aligning Weaviate's roadmap with your milestones",
    ],
  },
];

const tiers = [
  {
    title: "Flex",
    badge: null,
    intro: "The Assurance foundation for production self-hosted clusters.",
    features: [
      "24×7 support SLA: P1 (1-hour), P2 (4-hour), P3 (1 business day)",
      "Bi-weekly expert office hours (26 hrs/year)",
      "3-node baseline per production cluster",
      "Non-production clusters included",
      "Upgrade advisory for major releases",
      "Dedicated Slack channel & Account Executive",
    ],
    featured: false,
  },
  {
    title: "Plus",
    badge: "Most popular",
    intro: "Deeper engineering engagement and access to operational tooling.",
    features: [
      "Everything in Flex",
      "Weekly expert office hours (52 hrs/year)",
      "Weaviate Kubernetes Operator access",
      "Weaviate Tenant Controller access",
      "Pre-release upgrade calls for every release",
    ],
    featured: true,
  },
  {
    title: "Premium",
    badge: "Coming soon",
    intro: "Self-service diagnostics and forward-looking capacity planning.",
    features: [
      "Everything in Plus",
      "Support Portal with self-service diagnostics",
      "Custom monitoring & alerting integration",
      "Capacity planning tools",
      "Priority feature requests",
    ],
    featured: false,
  },
];

const outOfScope = [
  {
    title: "Integration work",
    description:
      "Building or maintaining ETL pipelines, Kafka connectors, or data ingestion layers.",
  },
  {
    title: "Hands-on tuning",
    description:
      "Execution of performance tuning that requires Weaviate engineers to modify your environment.",
  },
  {
    title: "Custom development",
    description:
      "Development of new features, custom modules, or bespoke code.",
  },
  {
    title: "Security & audits",
    description:
      "Active penetration testing or formal third-party security reviews.",
  },
  {
    title: "Migration execution",
    description:
      "The physical execution of data migrations or infrastructure moves.",
  },
];

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
            Weaviate Assurance
          </p>

          <h1
            className="tw-mb-8 tw-text-[3rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em]"
            style={headingFont}
          >
            <span className="tw-block tw-text-[#DDEBF2]">
              Enterprise assurance for
            </span>
            <span className="tw-block tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-bg-clip-text tw-text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              self-hosted Weaviate
            </span>
          </h1>

          <p
            className="tw-mx-auto tw-mb-12 tw-max-w-2xl tw-text-xl tw-leading-relaxed tw-text-[#b8c4d4]"
            style={bodyFont}
          >
            A premium subscription that bridges the gap between self-hosted
            flexibility and managed-service reliability — with a direct line to
            Weaviate&apos;s core engineering expertise and the fastest response
            times in the industry.
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
              to="/enterprise"
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-transparent tw-px-8 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
              style={{
                ...bodyFont,
                border: "0.5px solid #ECF4F8",
                borderRadius: "0.375rem",
              }}
            >
              Explore enterprise options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 lg:tw-py-16">
      <div className="tw-mx-auto tw-max-w-3xl tw-text-center">
        <p
          className="tw-m-0 tw-text-lg tw-leading-[170%] tw-text-[#B9C8DE]"
          style={bodyFont}
        >
          As AI applications move from prototype to production, the underlying
          database becomes mission-critical infrastructure. For enterprises
          opting for self-hosted deployments, maintaining the delicate balance
          of performance, scale, and uptime requires deep domain expertise.
          Weaviate Assurance is more than a support ticket system — it is a
          standardized, recurring partnership that integrates Weaviate&apos;s
          internal expertise into your operational workflow.
        </p>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mx-auto tw-mb-12 tw-max-w-3xl tw-text-center">
          <h2
            className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Built on four pillars
          </h2>
        </div>

        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-10"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <p
                className="tw-mb-4 tw-text-[14px] tw-font-semibold tw-tracking-[0.1em]"
                style={{
                  ...headingFont,
                  background:
                    "linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {pillar.number}
              </p>

              <h3
                className="tw-m-0 tw-text-[1.45rem] tw-font-semibold tw-leading-[135%] tw-tracking-[-0.02em] tw-text-[#DDEBF2]"
                style={headingFont}
              >
                {pillar.title}
              </h3>

              <p
                className="tw-mb-6 tw-mt-4 tw-text-[1.05rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {pillar.description}
              </p>

              <ul className="tw-m-0 tw-list-none tw-space-y-3 tw-p-0">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="tw-flex tw-items-start tw-gap-3 tw-text-[15px] tw-leading-6 tw-text-[#B9C8DE]"
                    style={bodyFont}
                  >
                    <span
                      className="tw-mt-0.5 tw-text-[#00FE6B]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mx-auto tw-mb-12 tw-max-w-3xl tw-text-center">
          <h2
            className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Three tiers, standardized entitlements
          </h2>
          <p
            className="tw-mx-auto tw-mt-5 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
            style={bodyFont}
          >
            Weaviate Assurance is billed as a fixed annual subscription based
            on cluster complexity and scale — predictable operational expenses
            and a simplified procurement process.
          </p>
        </div>

        <div className="tw-grid tw-gap-6 lg:tw-grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.title}
              className="tw-flex tw-flex-col tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 md:tw-p-10"
              style={{
                boxShadow: tier.featured
                  ? "0 0 0 1px rgba(0,254,107,0.35), 0 22px 70px rgba(0,0,0,0.18)"
                  : "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <div className="tw-mb-2 tw-flex tw-items-center tw-gap-3">
                <h3
                  className="tw-m-0 tw-text-[1.7rem] tw-font-semibold tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
                  style={headingFont}
                >
                  {tier.title}
                </h3>
                {tier.badge ? (
                  <span
                    className="tw-rounded-full tw-border tw-border-[#7BE7C7]/40 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-[0.1em] tw-text-[#7BE7C7]"
                    style={headingFont}
                  >
                    {tier.badge}
                  </span>
                ) : null}
              </div>

              <p
                className="tw-mb-7 tw-mt-2 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {tier.intro}
              </p>

              <ul className="tw-m-0 tw-mb-8 tw-flex-1 tw-list-none tw-space-y-3 tw-p-0">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="tw-flex tw-items-start tw-gap-3 tw-text-[15px] tw-leading-6 tw-text-[#B9C8DE]"
                    style={bodyFont}
                  >
                    <span
                      className="tw-mt-0.5 tw-text-[#00FE6B]"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="tw-inline-flex tw-min-h-[50px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-bg-transparent tw-px-8 tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                style={{
                  ...bodyFont,
                  border: "0.5px solid #ECF4F8",
                  borderRadius: "0.375rem",
                }}
              >
                Contact sales for a quote
              </Link>
            </article>
          ))}
        </div>

        <p
          className="tw-mt-10 tw-text-center tw-text-[15px] tw-text-[#8A93A9]"
          style={bodyFont}
        >
          Pricing scales with cluster footprint — additional nodes and
          multi-region deployments are available as add-ons. Contact your
          Weaviate Account Executive for a tailored quote.
        </p>
      </div>
    </section>
  );
}

function ProgramBoundaries() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mx-auto tw-mb-12 tw-max-w-3xl tw-text-center">
          <h2
            className="tw-m-0 tw-text-[2.2rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Program boundaries
          </h2>
          <p
            className="tw-mx-auto tw-mt-5 tw-max-w-2xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
            style={bodyFont}
          >
            To keep the Assurance program predictable and high quality, the
            following are delivered separately as Professional Services.
          </p>
        </div>

        <div className="tw-mx-auto tw-grid tw-max-w-5xl tw-gap-5 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {outOfScope.map((item) => (
            <article
              key={item.title}
              className="tw-rounded-[1.25rem] tw-bg-[#1a1a1a] tw-p-6"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.035)" }}
            >
              <h3
                className="tw-m-0 tw-text-[1.1rem] tw-font-semibold tw-text-[#DDEBF2]"
                style={headingFont}
              >
                {item.title}
              </h3>
              <p
                className="tw-m-0 tw-mt-2 tw-text-[14px] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
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
          Back your self-hosted deployment with Weaviate expertise
        </h2>
        <p
          className="tw-mx-auto tw-mt-5 tw-max-w-xl tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]"
          style={bodyFont}
        >
          Talk to our team about a tailored quote based on your cluster
          footprint.
        </p>
        <div className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
          <Link
            to="/contact"
            className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
            style={bodyFont}
          >
            Contact sales
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Assurance() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Assurance"
        description="Enterprise SLAs, proactive expert guidance, and managed lifecycle support for self-hosted Weaviate — a direct line to Weaviate's core engineering team."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero />
          <About />
          <Pillars />
          <Tiers />
          <ProgramBoundaries />
          <FinalCTA />
        </main>
      </Layout>
    </div>
  );
}
