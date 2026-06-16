import React from "react";
import Link from "@docusaurus/Link";

export default function CTA() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div
          className="tw-relative tw-flex tw-min-h-[320px] tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-[1.875rem] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-px-6 tw-py-12"
          style={{
            backgroundImage: "url('/img/site/2026/engram-cta-bg.png')",
          }}
        >
          <div className="tw-relative tw-z-10 tw-flex tw-max-w-[760px] tw-flex-col tw-items-center tw-text-center">
            <h2
              className="tw-m-0"
              style={{
                color: "#DDEBF2",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: "120%",
                letterSpacing: "-0.04em",
              }}
            >
              Talk to us about your enterprise deployment
            </h2>

            <p
              className="tw-m-0 tw-mt-7 tw-max-w-[720px]"
              style={{
                color: "#DDEBF2",
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: "160%",
              }}
            >
              Our team will help you scope the right deployment model, plan, and
              support level for your workloads.
            </p>

            <Link
              to="/pricing#contact-sales"
              className="tw-mt-10 tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-px-10 tw-py-4 tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition-all hover:tw--translate-y-0.5 hover:tw-text-[#111111] hover:tw-no-underline"
              style={{
                background:
                  "linear-gradient(48deg, #00FE6B 13.81%, #00B7E2 92.18%)",
                color: "#111111",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
