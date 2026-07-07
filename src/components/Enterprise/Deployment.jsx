import React from "react";
import Link from "@docusaurus/Link";

const cards = [
  {
    eyebrow: "Most popular for enterprise",
    title: "Dedicated Cloud",
    description:
      "A professionally managed AI database on single-tenant infrastructure. Consistent performance with no noisy neighbors, backed by SOC 2 and HIPAA compliance.",
    points: [
      "Isolated, dedicated instance for security and consistency",
      "Up to 99.95% uptime on AWS, GCP & Azure",
      "Dedicated Success Manager and 24/7 monitoring",
    ],
    link: "/deployment/dedicated",
    cta: "Explore Dedicated Cloud",
    featured: true,
  },
  {
    eyebrow: "Fastest to production",
    title: "Shared Cloud",
    description:
      "Fully managed Weaviate on shared infrastructure. The fastest way to ship, with the full core database toolkit, replication, and high availability.",
    points: [
      "Zero infrastructure to operate",
      "Scales from prototype to production",
      "Available on Flex, Plus, and Premium plans",
    ],
    link: "/deployment/shared",
    cta: "Explore Shared Cloud",
  },
  {
    eyebrow: "Maximum control",
    title: "Self-Hosted + Assurance",
    description:
      "Run open-source Weaviate in your own environment and back it with Weaviate Assurance: enterprise SLAs and a direct line to our core engineering team.",
    points: [
      "Full control over infrastructure and data residency",
      "24×7 incident response with 1-hour P1 SLA",
      "Proactive upgrade and lifecycle guidance",
    ],
    link: "/product/assurance",
    cta: "Explore Weaviate Assurance",
  },
];

export default function DeploymentOptions() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-14 tw-max-w-5xl">
          <p className="tw-m-0 tw-mb-8 tw-font-['Plus_Jakarta_Sans'] tw-text-[1rem] tw-font-semibold tw-uppercase tw-leading-[130%] tw-text-[#43E2C5]">
            Deployment
          </p>

          <h2 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2.5rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
            Run Weaviate the way your organization requires
          </h2>

          <p className="tw-m-0 tw-mt-6 tw-max-w-3xl tw-font-['Inter'] tw-text-[1.25rem] tw-leading-[160%] tw-text-[#B9C8DE]">
            Managed by us in shared or dedicated environments, or self-hosted in
            your own infrastructure with enterprise backing.
          </p>
        </div>

        <div className="tw-grid tw-gap-6 lg:tw-grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`tw-group tw-flex tw-min-h-[440px] tw-flex-col tw-rounded-[2rem] tw-bg-[#1A1A1A] tw-p-7 md:tw-p-8 tw-transition-all tw-duration-300 tw-ease-out hover:tw--translate-y-1 hover:tw-bg-[#1D1D1D] tw-border ${
                card.featured
                  ? "tw-border-[#00FE6B]/35"
                  : "tw-border-white/5 hover:tw-border-[#00FE6B]/35"
              }`}
              style={
                card.featured
                  ? {
                      boxShadow: "inset 0 0 0 1px rgba(0, 254, 107, 0.35)",
                      background:
                        "linear-gradient(180deg, rgba(0, 254, 107, 0.05) 0%, #1A1A1A 35%)",
                    }
                  : undefined
              }
            >
              <p
                className="tw-m-0 tw-mb-6 tw-font-['Plus_Jakarta_Sans'] tw-text-[0.85rem] tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-[#7BE7C7] tw-transition-colors tw-duration-300 group-hover:tw-text-[#68FFA8]"
                style={
                  card.featured
                    ? {
                        color: "#8CF6D5",
                        letterSpacing: "0.2em",
                      }
                    : undefined
                }
              >
                {card.eyebrow}
              </p>

              <h3 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
                {card.title}
              </h3>

              <p className="tw-m-0 tw-mt-8 tw-font-['Inter'] tw-text-[1.1rem] tw-leading-[170%] tw-text-[#B9C8DE]">
                {card.description}
              </p>

              <ul className="tw-m-0 tw-mt-8 tw-space-y-5 tw-p-0">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className="tw-flex tw-gap-4 tw-font-['Inter'] tw-text-[1rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                  >
                    <span className="tw-mt-1 tw-text-[#00FE6B]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={card.link}
                className="tw-mt-auto tw-inline-flex tw-pt-10 tw-font-['Inter'] tw-text-[1rem] tw-font-semibold tw-text-[#7BE7C7] tw-no-underline hover:tw-text-[#68FFA8] hover:tw-no-underline"
              >
                {card.cta}
                <span className="tw-ml-3 tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
