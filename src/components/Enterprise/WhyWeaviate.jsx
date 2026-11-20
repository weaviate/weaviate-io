import React from "react";

const cards = [
  {
    step: "STEP 1",
    title: "Build",
    heading: "Best Developer Experience",
    icon: "/img/site/2026/step-01-enterprise.svg",
    features: [
      {
        emphasis: "Fastest time to value",
        after:
          " - no complex data pipelines or painstaking performance tuning.",
      },
      {
        emphasis: "Fast ramp-up:",
        after: " largest AI ecosystem and open source community.",
      },
    ],
  },
  {
    step: "STEP 2",
    title: "Deploy",
    heading: "Easy, Flexible Deployment",
    icon: "/img/site/2026/step-02-enterprise.svg",
    features: [
      {
        before: "Weaviate-hosted or self-hosted, ",
        emphasis: "backed by enterprise support.",
      },
      {
        emphasis: "Multi-tenant enabled",
        after: " and SOC II, HIPAA compliant.",
      },
    ],
  },
  {
    step: "STEP 3",
    title: "Scale",
    heading: "Grow to Planetary Scale (ROI)",
    icon: "/img/site/2026/step-03-enterprise.svg",
    features: [
      {
        before: "If not planetary, at least to ",
        emphasis: "Meta, Booking.com, Cisco",
        after: " scale.",
      },
      {
        emphasis: "Support any AI use case",
        after: ", at any scale, as your AI strategy and user base evolves.",
      },
    ],
  },
];

export default function WhyWeaviate() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p className="tw-m-0 tw-mb-4 tw-font-['Plus_Jakarta_Sans'] tw-text-[0.9rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5] md:tw-mb-6 md:tw-text-[1rem]">
            Why Weaviate
          </p>

          <h2 className="tw-mt-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2rem] tw-font-semibold tw-leading-[1.08] tw-text-[#DDEBF2] md:tw-mt-4 md:tw-text-[2.5rem]">
            Most actively used AI vector platform
          </h2>

          <p className="tw-mt-4 tw-max-w-3xl tw-font-['Inter'] tw-text-[16px] tw-leading-8 tw-text-[#B9C8DE] md:tw-mt-5 md:tw-text-[18px]">
            Large community &amp; ecosystem make it easy to choose, learn,
            staff, and integrate Weaviate.
          </p>
        </div>

        <div className="tw-mt-10 tw-grid tw-gap-5 md:tw-mt-12 md:tw-grid-cols-2 md:tw-gap-6 xl:tw-grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.step}
              className="tw-flex tw-min-h-[420px] tw-flex-col tw-rounded-[1.25rem] tw-bg-[#1A1A1A] tw-p-6 md:tw-p-8"
            >
              <div className="tw-mb-6 tw-flex tw-items-center tw-gap-6 md:tw-mb-8">
                <img
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  className="tw-h-[74px] tw-w-[74px] tw-shrink-0"
                />
                <div>
                  <p className="tw-m-0 tw-font-['Inter'] tw-text-[0.95rem] tw-font-medium tw-text-[#B9C8DE]">
                    {card.step}
                  </p>
                  <p className="tw-m-0 tw-mt-2 tw-font-['Plus_Jakarta_Sans'] tw-text-[1.65rem] tw-font-semibold tw-leading-[120%] tw-text-[#5DDA91]">
                    {card.title}
                  </p>
                </div>
              </div>

              <h3 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[1.45rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2]">
                {card.heading}
              </h3>

              <div className="tw-mt-7 tw-border-t tw-border-[#6E6B91] tw-pt-7">
                <ul className="tw-m-0 tw-list-none tw-space-y-5 tw-p-0">
                  {card.features.map((feature) => (
                    <li
                      key={feature.emphasis}
                      className="tw-flex tw-items-start tw-gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="tw-mt-0.5 tw-flex tw-h-[21px] tw-w-[21px] tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[3px] tw-border tw-border-[#43E2C5] tw-font-['Inter'] tw-text-[0.7rem] tw-font-semibold tw-leading-none tw-text-[#43E2C5]"
                      >
                        ✓
                      </span>
                      <span className="tw-font-['Inter'] tw-text-[0.95rem] tw-leading-[165%] tw-text-[#B9C8DE]">
                        {feature.before}
                        <strong className="tw-font-semibold tw-text-[#B9C8DE]">
                          {feature.emphasis}
                        </strong>
                        {feature.after}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
