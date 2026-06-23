import React from "react";
import Link from "@docusaurus/Link";
import TrustedBy from "./TrustedBy";

export default function Hero() {
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
                Weaviate for Enterprise
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
                AI infrastructure your enterprise can depend on
              </h1>

              <p
                className="tw-mt-8 tw-max-w-2xl tw-text-xl tw-leading-relaxed md:tw-text-2xl"
                style={{
                  color: "#B9C8DE",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                From dedicated cloud deployments to enterprise SLAs backed by
                our core engineering team — everything you need to run
                mission-critical AI workloads in production.
              </p>

              <div className="tw-mt-12 tw-flex tw-flex-wrap tw-gap-5">
                <Link
                  to="/pricing#contact-sales"
                  className="tw-inline-flex tw-min-h-[58px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
                >
                  Contact Sales
                </Link>

                <Link
                  to="/pricing"
                  className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/40 tw-bg-transparent tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-border-white hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    borderRadius: "0.375rem",
                    border: "0.5px solid #ECF4F8",
                  }}
                >
                  View Pricing
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
