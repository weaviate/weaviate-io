import React from "react";
import Link from "@docusaurus/Link";

const pillars = [
  {
    icon: "/img/site/2026/enterprise-assurance-01.svg",
    title: "Incident Response & SLAs",
    description:
      "24×7 global coverage with a 1-hour SLA for critical issues, root cause analysis, and direct engineering escalation.",
  },
  {
    icon: "/img/site/2026/enterprise-assurance-02.svg",
    title: "Proactive Expert Guidance",
    description:
      "Recurring office hours with Weaviate engineers covering index selection, query tuning, schema design, and architecture reviews.",
  },
  {
    icon: "/img/site/2026/enterprise-assurance-03.svg",
    title: "Managed Lifecycle Support",
    description:
      "Upgrade advisory for every release, compatibility assessments for your environment, and managed end-of-life migrations.",
  },
  {
    icon: "/img/site/2026/enterprise-assurance-04.svg",
    title: "Dedicated Account Management",
    description:
      "A private Slack channel, an assigned Account Executive, and periodic business reviews aligned to your roadmap.",
  },
];

export default function AssuranceSection() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p
            className="tw-m-0 tw-mb-8 tw-uppercase"
            style={{
              color: "#43E2C5",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Weaviate Assurance
          </p>

          <h2
            className="tw-m-0"
            style={{
              color: "#DDEBF2",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 600,
              lineHeight: "120%",
              letterSpacing: "-0.04em",
            }}
          >
            Self-hosted flexibility, managed-service reliability
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-3xl"
            style={{
              color: "#B9C8DE",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.25rem",
              lineHeight: "160%",
            }}
          >
            A premium annual subscription that gives your team a direct line to
            Weaviate's core engineering expertise — built on four pillars.
          </p>
        </div>

        <div className="tw-mt-14 tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="tw-group tw-relative tw-overflow-hidden tw-rounded-[2rem] tw-p-[1px]"
              style={{
                borderRadius: "1.25rem",
                background:
                  "linear-gradient(123deg, rgba(38,214,255,0.18) 12.44%, rgba(215,122,255,0.18) 109.26%)",
              }}
            >
              <div className="tw-relative tw-flex tw-h-full tw-flex-col tw-rounded-[calc(2rem-1px)] tw-p-8">
                <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-60" />

                <div className="tw-relative">
                  <div className="tw-mb-8 tw-flex tw-h-[60px] tw-w-[60px] tw-items-center tw-justify-center tw-rounded-[18px] ">
                    <img
                      src={pillar.icon}
                      alt=""
                      aria-hidden="true"
                      className="tw-h-14 tw-w-14"
                    />
                  </div>

                  <h3
                    className="tw-m-0"
                    style={{
                      color: "#DDEBF2",
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 600,
                      lineHeight: "120%",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className="tw-m-0 tw-mt-6"
                    style={{
                      color: "#B9C8DE",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "165%",
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="tw-mt-16 tw-flex tw-justify-center">
          <Link
            to="/product/assurance"
            className="tw-inline-flex tw-min-h-[58px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-10 tw-font-['Inter'] tw-text-lg tw-font-semibold tw-text-[#111111] tw-no-underline hover:tw-text-[#111111] hover:tw-opacity-95"
          >
            Learn about Weaviate Assurance
          </Link>
        </div>
      </div>
    </section>
  );
}
