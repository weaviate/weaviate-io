import React from "react";
import Link from "@docusaurus/Link";

export default function CTA() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div
          className="
        tw-relative
        tw-overflow-hidden
        tw-min-h-[300px]
        tw-flex
        tw-items-center
        tw-justify-center
        tw-bg-cover
        tw-bg-center
        tw-bg-no-repeat
        tw-rounded-[1.875rem]
      "
          style={{
            backgroundImage: "url('/img/site/2026/engram-cta-bg.png')",
          }}
        >
          <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-items-center tw-text-center">
            <h2
              className="tw-m-0 tw-max-w-[700px]"
              style={{
                color: "#DDEBF2",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 600,
                lineHeight: "120%",
              }}
            >
              Give your agents memory
              <br />
              that works in production
            </h2>

            <Link
              to="https://console.weaviate.io/signup"
              className="
            tw-mt-10
            tw-inline-flex
            tw-items-center
            tw-justify-center
            tw-rounded-xl
            tw-px-10
            tw-py-4
            tw-font-semibold
            tw-text-[#111]
            tw-no-underline
            tw-transition-all
            hover:tw--translate-y-0.5
            hover:tw-no-underline
            hover:tw-text-[#111]
          "
              style={{
                background:
                  "linear-gradient(48deg, #00FE6B 13.81%, #00B7E2 92.18%)",
                textcolor: "#111",
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
