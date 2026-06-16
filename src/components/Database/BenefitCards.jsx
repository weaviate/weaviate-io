import React from "react";

const benefitCards = [
  {
    title: "Bring the power of AI to more developers",
    description:
      "Help developers build and scale AI applications with an open source, developer-friendly platform and ecosystem.",
    icon: "/img/site/2026/database-power.svg",
    glow: "rgba(0, 254, 107, 0.16)",
  },
  {
    title: "Easily connect to popular ML models",
    description:
      "Build and iterate faster with integrations, quickly adopt and test new models as the ecosystem evolves.",
    icon: "/img/site/2026/database-connect.svg",
    glow: "rgba(122, 145, 255, 0.18)",
  },
  {
    title: "Get the best of vector and keyword search",
    description:
      "Enhance semantic understanding and accuracy for better insights by leveraging hybrid search with vector and BM25 keyword search.",
    icon: "/img/site/2026/database-vector.svg",
    glow: "rgba(104, 255, 168, 0.15)",
  },
  {
    title: "Run securely, flexibly, and reliably—at scale",
    description:
      "Run freely with Weaviate, available as a self-hosted database, managed service, or Kubernetes package in your VPC.",
    icon: "/img/site/2026/database-scale.svg",
    glow: "rgba(0, 183, 226, 0.16)",
  },
];

export default function BenefitCards() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {benefitCards.map((card) => (
            <article
              key={card.title}
              className="tw-group tw-relative tw-overflow-hidden tw-rounded-[1.875rem] tw-bg-[#1a1a1a] tw-p-8 tw-transition-all tw-duration-300 md:tw-min-h-[300px] md:tw-p-10 md:hover:tw--translate-y-1 md:hover:tw-scale-[1.01]"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.035), 0 22px 70px rgba(0,0,0,0.18)",
              }}
            >
              <div
                className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-0 tw-transition-opacity tw-duration-300 md:group-hover:tw-opacity-100"
                style={{
                  background: `radial-gradient(circle at top left, ${card.glow} 0%, rgba(255,255,255,0.035) 34%, rgba(255,255,255,0) 70%)`,
                }}
                aria-hidden="true"
              />

              <div
                className="tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-[1.875rem] tw-opacity-0 tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] tw-transition-opacity tw-duration-300 md:group-hover:tw-opacity-100"
                aria-hidden="true"
              />

              <div className="tw-relative tw-flex tw-min-h-[240px] tw-flex-col">
                <div className="tw-mb-6 tw-flex tw-h-[62px] tw-w-[62px] tw-items-center tw-justify-center tw-transition-transform tw-duration-300 md:group-hover:tw-scale-105">
                  <img
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    className="tw-h-[62px] tw-w-[62px] tw-object-contain"
                  />
                </div>

                <h3
                  className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[1.55rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em] tw-text-[#DDEBF2] md:tw-text-[1.7rem]"
                  style={{
                    color: "#DDEBF2",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    lineHeight: "130%",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="tw-m-0 tw-mt-7 tw-font-['Inter'] tw-text-[1.15rem] tw-leading-[150%] tw-text-[#B9C8DE]"
                  style={{
                    color: "#B9C8DE",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1.125rem",
                    lineHeight: "160%",
                  }}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
