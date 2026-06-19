import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MetaSEO } from "/src/theme/MetaSEO";
import TrustedBy from "/src/components/Enterprise/TrustedBy";

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
                Weaviate Assurance
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
                Enterprise support for self-hosted Weaviate
              </h1>

              <p
                className="tw-mt-8 tw-max-w-2xl tw-text-xl tw-leading-relaxed md:tw-text-2xl"
                style={{
                  color: "#B9C8DE",

                  fontFamily: "Inter, sans-serif",
                }}
              >
                Self-hosted flexibility with managed-service reliability — a
                direct line to Weaviate’s core engineering team for critical AI
                workloads.
              </p>

              <div className="tw-mt-12 tw-flex tw-flex-wrap tw-gap-5">
                <Link
                  to="/contact"
                  className="tw-inline-flex tw-min-h-[58px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
                >
                  Contact Sales
                </Link>

                <Link
                  to="/enterprise"
                  className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/40 tw-bg-transparent tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-border-white hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    borderRadius: "0.375rem",
                    border: "0.5px solid #ECF4F8",
                  }}
                >
                  Explore Enterprise
                </Link>
              </div>
            </div>

            <div className="tw-relative">
              <div className="tw-absolute tw-inset-0 tw-rounded-[1.875rem] tw-bg-[linear-gradient(123deg,#26D6FF_12.44%,#D77AFF_109.26%)] tw-opacity-20" />

              <div className="tw-relative tw-rounded-[1.875rem] tw-border tw-border-white/10 tw-bg-[linear-gradient(123deg,rgba(38,214,255,0.18)_12.44%,rgba(215,122,255,0.18)_109.26%)] tw-p-6 tw-shadow-[0_28px_90px_rgba(0,0,0,0.35)] md:tw-p-10">
                <img
                  src="/img/site/2026/enterprise-diagram-26.svg"
                  alt="Enterprise AI infrastructure diagram"
                  className="tw-h-auto tw-w-full"
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

function About() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 lg:tw-py-16">
      <div className="tw-mx-auto tw-max-w-[980px]">
        <div className="tw-rounded-[1.5rem] tw-border tw-border-white/10 tw-bg-[#1A1A1A] tw-p-8 tw-text-center md:tw-p-10">
          <p
            className="tw-m-0 tw-text-lg tw-leading-[175%] tw-text-[#B9C8DE] md:tw-text-xl"
            style={bodyFont}
          >
            As AI applications move from prototype to production, the underlying
            database becomes mission-critical infrastructure. For enterprises
            opting for self-hosted deployments, Weaviate Assurance gives your
            team a recurring partnership with Weaviate&apos;s engineering
            expertise helping you manage performance, scale, uptime, and
            operational confidence.
          </p>
        </div>
      </div>
    </section>
  );
}

function AssuranceFramework() {
  const tableBorder = "1px solid rgba(112, 120, 172, 0.58)";
  const cellBorder = "1px solid rgba(112, 120, 172, 0.5)";
  const headerGradient =
    "linear-gradient(48deg, #00FE6B 13.81%, #00B7E2 92.18%)";
  const programBoundariesGradient =
    "linear-gradient(234deg, #A254EC 8.5%, #F4404E 92.78%)";
  const programBoundaryColumns = [
    [outOfScope[0], outOfScope[3]],
    [outOfScope[1], outOfScope[2]],
    [outOfScope[4]],
  ];
  const renderLeadText = (text) => {
    const separatorIndex = text.indexOf(":");

    if (separatorIndex === -1) {
      return <span>{text}</span>;
    }

    const lead = text.slice(0, separatorIndex + 1);
    const rest = text.slice(separatorIndex + 1).trimStart();

    return (
      <>
        <strong style={{ color: "#DDEBF2", fontWeight: 700 }}>{lead}</strong>{" "}
        <span>{rest}</span>
      </>
    );
  };

  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-14 tw-max-w-5xl">
          <p
            className="tw-m-0 tw-mb-6 tw-text-[1rem] tw-font-semibold tw-uppercase tw-text-[#43E2C5]"
            style={headingFont}
          >
            Assurance Framework
          </p>

          <h2
            className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Your partner for production-ready AI
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-5xl tw-text-[1.125rem] tw-leading-[160%] tw-text-[#B9C8DE]"
            style={bodyFont}
          >
            Weaviate Assurance gives your team a recurring partnership with
            Weaviate&apos;s engineering expertise, helping you manage
            performance, scale, uptime, and operational confidence.
          </p>
        </div>

        <div
          className="tw-overflow-hidden tw-rounded-[1.5rem] tw-bg-[#141414]"
          style={{
            border: tableBorder,
            backgroundColor: "#111318",
            boxShadow: "0 18px 55px rgba(0, 0, 0, 0.24)",
          }}
        >
          <div className="tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="tw-p-6 md:tw-p-7"
                style={{
                  borderBottom: cellBorder,
                  borderRight: cellBorder,
                }}
              >
                <h3
                  className="tw-m-0 tw-text-[1.15rem] tw-font-semibold tw-leading-[130%] tw-text-[#00FE6B]"
                  style={{
                    ...headingFont,
                    background: headerGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {pillar.number}. {pillar.title}
                </h3>

                <p
                  className="tw-m-0 tw-mt-7 tw-text-[0.95rem] tw-leading-[160%] tw-text-[#DDEBF2]"
                  style={bodyFont}
                >
                  {pillar.description}
                </p>

                <ul className="tw-m-0 tw-mt-7 tw-space-y-4 tw-p-0">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="tw-flex tw-gap-3 tw-text-[0.92rem] tw-leading-[155%] tw-text-[#B9C8DE]"
                      style={bodyFont}
                    >
                      <span
                        className="tw-text-[#22E7A7]"
                        style={{ fontWeight: 700, lineHeight: 1.25 }}
                      >
                        ✓
                      </span>
                      <span>{renderLeadText(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            className="tw-p-6 md:tw-p-7"
            style={{
              borderBottom: cellBorder,
              backgroundColor: "#0E1015",
            }}
          >
            <h3
              className="tw-m-0 tw-text-[1.4rem] tw-font-semibold tw-text-[linear-gradient(234deg,#A254EC_8.5%,#F4404E_92.78%)]"
              style={{
                ...headingFont,
                background: programBoundariesGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Program Boundaries
            </h3>
          </div>

          <div className="tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-4">
            <div
              className="tw-p-6 md:tw-p-7"
              style={{
                borderRight: cellBorder,
                backgroundColor: "#090B10",
              }}
            >
              <p
                className="tw-m-0 tw-text-[0.95rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                style={bodyFont}
              >
                To maintain predictability and quality, these items are
                classified as Professional Services and are outside the scope of
                this subscription.
              </p>
            </div>

            {programBoundaryColumns.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="tw-p-6 md:tw-p-7"
                style={{
                  borderRight: columnIndex < 2 ? cellBorder : "none",
                  backgroundColor: "#090B10",
                }}
              >
                {column.map((item, itemIndex) => (
                  <div
                    key={item.title}
                    style={{ marginTop: itemIndex === 0 ? 0 : "1.25rem" }}
                  >
                    <p
                      className="tw-m-0 tw-text-[0.95rem] tw-font-semibold tw-text-[#DDEBF2]"
                      style={bodyFont}
                    >
                      <span className="tw-mr-3 tw-text-[#FF4DB8]">×</span>
                      {item.title}
                    </p>

                    <p
                      className="tw-m-0 tw-mt-4 tw-text-[0.92rem] tw-leading-[155%] tw-text-[#B9C8DE]"
                      style={bodyFont}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-12 tw-max-w-3xl">
          <p
            className="tw-m-0 tw-mb-4 tw-text-[1rem] tw-font-semibold tw-uppercase tw-tracking-[0.08em] tw-text-[#43E2C5]"
            style={bodyFont}
          >
            Weaviate Assurance
          </p>

          <h2
            className="tw-m-0 tw-text-[2.4rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]"
            style={headingFont}
          >
            Self-hosted flexibility, managed-service reliability
          </h2>
        </div>

        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="tw-group tw-relative tw-overflow-hidden tw-rounded-[1.5rem] tw-bg-[#1a1a1a] tw-p-8 tw-transition-all tw-duration-300 hover:tw--translate-y-1"
            >
              <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(123deg,rgba(38,214,255,0.12)_12.44%,rgba(215,122,255,0.12)_109.26%)]" />

              <div className="tw-relative">
                <img
                  src={`/img/site/2026/enterprise-assurance-0${index + 1}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="tw-mb-8 tw-h-[62px] tw-w-[62px] tw-object-contain tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                />

                <h3
                  className="tw-m-0 tw-text-[1.5rem] tw-font-semibold tw-leading-[130%] tw-text-[#DDEBF2]"
                  style={headingFont}
                >
                  {pillar.title}
                </h3>

                <p
                  className="tw-m-0 tw-mt-5 tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                  style={bodyFont}
                >
                  {pillar.description}
                </p>
              </div>
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
            Weaviate Assurance is billed as a fixed annual subscription based on
            cluster complexity and scale — predictable operational expenses and
            a simplified procurement process.
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
              className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2] "
              style={headingFont}
            >
              Back your self-hosted deployment with Weaviate expertise
            </h2>

            <p
              className="tw-m-0 tw-mt-7 tw-max-w-[680px] tw-text-[1.125rem] tw-leading-[160%] tw-text-[#DDEBF2]"
              style={bodyFont}
            >
              Talk to our team about a tailored quote based on your cluster
              footprint.
            </p>

            <Link
              to="/contact"
              className="tw-mt-10 tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-10 tw-py-4 tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition-all hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
              style={bodyFont}
            >
              Contact sales
            </Link>
          </div>
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
          <AssuranceFramework />
          <Tiers />
          <FinalCTA />
        </main>
      </Layout>
    </div>
  );
}
