import React from "react";
import Link from "@docusaurus/Link";

const cards = [
  {
    badge: "SOC2",
    title: "SOC 2 Type II",
    text: "Independently audited via Drata. See our",
    link: {
      href: "https://trust.weaviate.io/",
      label: "Trust Portal.",
    },
  },
  {
    badge: "HIPAA",
    title: "HIPAA compliant",
    text: "Available on Enterprise Cloud (AWS) for regulated healthcare workloads.",
  },
];

export default function SecurityCompliance() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p className="tw-m-0 tw-mb-8 tw-font-['Plus_Jakarta_Sans'] tw-text-base tw-font-semibold tw-uppercase tw-text-[#43E2C5]">
            Security & Compliance
          </p>

          <h2 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2.5rem] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
            Built for your security review
          </h2>

          <p className="tw-m-0 tw-mt-8 tw-max-w-3xl tw-font-['Inter'] tw-text-xl tw-leading-[160%] tw-text-[#B9C8DE]">
            Enterprise-grade security controls and certifications across managed
            and self-hosted deployments.
          </p>
        </div>

        <div className="tw-mt-20 tw-grid tw-gap-8 lg:tw-grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="tw-group tw-relative tw-overflow-hidden tw-rounded-[2rem] tw-border tw-border-white/8 tw-bg-[#1A1A1A] tw-p-10 tw-shadow-[0_24px_80px_rgba(0,0,0,0.28)] tw-transition-all tw-duration-300 hover:tw--translate-y-1 hover:tw-border-[#00FE6B]/20"
            >
              <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle_at_top_left,rgba(0,254,107,0.12),transparent_38%),linear-gradient(135deg,rgba(0,254,107,0.04),rgba(0,183,226,0.06))]" />

              <div className="tw-relative tw-flex tw-items-center tw-gap-10 max-sm:tw-flex-col max-sm:tw-items-start">
                <div className="tw-flex tw-h-[112px] tw-w-[112px] tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[24px] tw-border tw-border-[#00FE6B]/20 tw-bg-[#12351F]/70 tw-font-['Plus_Jakarta_Sans'] tw-text-[2.4rem] tw-font-semibold tw-tracking-[-0.06em] tw-text-[#43E2C5]">
                  {card.badge}
                </div>

                <div>
                  <h3 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-font-semibold tw-leading-[120%] tw-tracking-[-0.04em] tw-text-[#DDEBF2]">
                    {card.title}
                  </h3>

                  <p className="tw-m-0 tw-mt-5 tw-font-['Inter']  tw-leading-[160%] tw-text-[#B9C8DE]">
                    {card.text}
                    {card.link ? (
                      <>
                        {" "}
                        <Link
                          to={card.link.href}
                          className="tw-text-[#63E689] tw-no-underline hover:tw-underline"
                        >
                          {card.link.label}
                        </Link>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
