import React from "react";
import Link from "@docusaurus/Link";

const plans = [
  {
    icon: "/img/site/2026/enterprise-cloud.svg",
    label: "Weaviate Database",
    title: "Premium",
    priceLabel: "Starts at",
    price: "$400",
    suffix: "/mo",
    note: "Prepaid annual contract",
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
    icon: "/img/site/2026/enterprise-engram.svg",
    label: "Engram",
    title: "Enterprise",
    priceLabel: "Pricing",
    price: "Custom",
    note: "Volume-based annual contract",
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

export default function EnterprisePricing() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-14 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-mb-12 tw-max-w-4xl">
          <p className="tw-m-0 tw-mb-6 tw-font-['Plus_Jakarta_Sans'] tw-text-[1rem] tw-font-semibold tw-uppercase tw-text-[#43E2C5]">
            Pricing
          </p>

          <h2 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2.4rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
            Enterprise plans across the platform
          </h2>

          <p className="tw-m-0 tw-mt-5 tw-max-w-3xl tw-font-['Inter'] tw-text-[1.1rem] tw-leading-[160%] tw-text-[#B9C8DE]">
            Predictable annual contracts for the AI Database, and custom
            agreements for Engram agent memory at scale.
          </p>
        </div>

        <div className="tw-grid tw-gap-6 lg:tw-grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className="tw-overflow-hidden tw-rounded-[1.5rem] tw-bg-[#1A1A1A]"
              style={{
                border: "1px solid rgba(125, 115, 168, 0.7)",
              }}
            >
              <div
                className="tw-grid tw-gap-6 tw-p-6 md:tw-grid-cols-[1fr_auto] md:tw-p-8"
                style={{
                  borderBottom: "1px solid rgba(125, 115, 168, 0.7)",
                }}
              >
                <div className="tw-flex tw-items-center tw-gap-6">
                  <div className="tw-flex tw-h-[70px] tw-w-[70px] tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[0.8rem] tw-border tw-border-[#7D73A8]/80">
                    <img
                      src={plan.icon}
                      alt=""
                      aria-hidden="true"
                      className="tw-h-13 tw-w-13 tw-object-contain"
                    />
                  </div>

                  <div>
                    <p className="tw-m-0 tw-font-['Inter'] tw-text-[0.85rem] tw-font-semibold tw-uppercase tw-text-[#43E2C5]">
                      {plan.label}
                    </p>

                    <h3 className="tw-m-0 tw-mt-3 tw-font-['Plus_Jakarta_Sans'] tw-text-[1.8rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
                      {plan.title}
                    </h3>
                  </div>
                </div>

                <div className="md:tw-min-w-[150px]">
                  <p className="tw-m-0 tw-font-['Inter'] tw-text-[0.72rem] tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-[#7F8799]">
                    {plan.priceLabel}
                  </p>

                  <p className="tw-m-0 tw-mt-2 tw-font-['Plus_Jakarta_Sans'] tw-text-[2.1rem] tw-font-semibold tw-leading-none tw-text-white">
                    {plan.price}
                    {plan.suffix ? (
                      <span className="tw-font-['Inter'] tw-text-[0.95rem] tw-font-normal tw-text-[#B9C8DE]">
                        {plan.suffix}
                      </span>
                    ) : null}
                  </p>

                  <p className="tw-m-0 tw-mt-2 tw-font-['Inter'] tw-text-[0.82rem] tw-text-[#8E98AD]">
                    {plan.note}
                  </p>
                </div>
              </div>

              <div className="tw-p-6 md:tw-p-8">
                <p className="tw-m-0 tw-max-w-2xl tw-font-['Inter'] tw-text-[1.15rem] tw-leading-[160%] tw-text-[#B9C8DE] tw-h-[90px] tw-min-h-[90px]">
                  {plan.description}
                </p>

                <ul className="tw-m-0 tw-mt-8 tw-space-y-4 tw-p-0">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="tw-flex tw-gap-4 tw-font-['Inter'] tw-text-[0.98rem] tw-leading-[160%] tw-text-[#B9C8DE]"
                    >
                      <span className=" tw-text-[#00FE6B]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="tw-mt-8 tw-flex tw-justify-end">
                  <Link
                    to="/pricing#contact-sales"
                    className="
    tw-inline-flex
    tw-min-h-[44px]
    tw-min-w-[160px]
    tw-items-center
    tw-justify-center
    tw-rounded-md
    tw-bg-transparent
    tw-px-6
    tw-font-['Inter']
    tw-text-[0.95rem]
    tw-font-semibold
    tw-text-[#DDEBF2]
    tw-no-underline
    tw-transition-all
    hover:tw--translate-y-0.5
    hover:tw-bg-white/10
    hover:tw-text-[#DDEBF2]
    hover:tw-no-underline
  "
                    style={{
                      border: "0.5px solid #ECF4F8",
                    }}
                  >
                    Contact sales
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
