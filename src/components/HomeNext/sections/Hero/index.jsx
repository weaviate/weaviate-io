import React from 'react';

export default function Hero() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-pb-8 tw-pt-8 md:tw-pb-10 md:tw-pt-16 lg:tw-pb-12 lg:tw-pt-10">
      <div className="tw-mx-auto tw-max-w-7xl">
        <div
          className="
            tw-relative tw-overflow-hidden tw-rounded-[34px]
            tw-border tw-border-white/10
            tw-bg-[#111111] tw-bg-cover tw-bg-center
            tw-px-6 tw-py-8
            md:tw-px-10 md:tw-py-10
            lg:tw-px-16 lg:tw-py-12
            tw-min-h-[400px] md:tw-min-h-[450px] lg:tw-min-h-[450px]
            tw-shadow-[0_20px_80px_rgba(0,0,0,0.32)]
          "
          style={{
            backgroundImage: "url('/img/site/2026/weaviate-bg-2026.jpg')",
          }}
        >
          <div
            className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.1)_38%,rgba(0,0,0,0.2)_100%)]"
            aria-hidden="true"
          />

          <div
            className="tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-[34px] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            aria-hidden="true"
          />

          <div className="tw-relative tw-flex tw-min-h-[360px] md:tw-min-h-[380px] lg:tw-min-h-[400px] tw-items-center tw-justify-center">
            <div className="tw-mx-auto tw-max-w-[880px] tw-text-center">
              <div className="tw-inline-flex tw-items-center tw-gap-3 tw-rounded-full tw-border tw-border-white/20 tw-bg-[rgba(150,180,200,0.16)] tw-px-3 tw-py-2 tw-backdrop-blur-md tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                <span className="tw-inline-flex tw-items-center tw-rounded-full tw-bg-[#0B1114] tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-[0.16em] tw-text-[#6EF2A3]">
                  New
                </span>

                <span
                  className="tw-text-[13px] tw-font-medium tw-tracking-[0.01em] tw-text-white/90 md:tw-text-[15px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Weaviate Engram - Personalized AI experiences
                </span>

                <img
                  src="/img/site/2026/weaviate-arrow-2026.svg"
                  alt=""
                  aria-hidden="true"
                  className="tw-h-4 tw-w-4 tw-shrink-0"
                />
              </div>

              <h1
                className="tw-mx-auto tw-mt-7 tw-max-w-[860px] tw-text-[2.7rem] tw-font-semibold tw-leading-[0.98] md:tw-text-[3.9rem] lg:tw-text-[4.25rem]"
                style={{
                  color: '#F5F7FA',
                  fontFamily: '"Fields Display", "Times New Roman", serif',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                Design, build and ship complete AI experiences
              </h1>

              <p
                className="tw-mx-auto tw-mt-5 tw-max-w-[720px] tw-text-[17px] tw-leading-8 md:tw-text-[19px]"
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Vector search, RAG, and memory - all in one open-source
                platform.
              </p>

              <div className="tw-mt-9 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4">
                <a
                  href="/go/console"
                  className="tw-inline-flex tw-min-w-[224px] tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#F1F5F9] tw-px-8 tw-py-4 tw-text-[16px] tw-font-semibold tw-text-slate-900 tw-no-underline tw-transition hover:tw-bg-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Start building
                </a>

                <a
                  href="/docs"
                  className="tw-inline-flex tw-min-w-[224px] tw-items-center tw-justify-center tw-rounded-[10px] tw-border tw-border-white/10 tw-bg-[rgba(10,12,18,0.78)] tw-px-8 tw-py-4 tw-text-[16px] tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw-bg-[rgba(10,12,18,0.92)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
