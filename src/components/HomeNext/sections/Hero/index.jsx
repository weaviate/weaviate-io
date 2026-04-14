import React from 'react';

export default function Hero() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-pb-8 tw-pt-8 md:tw-pb-10 md:tw-pt-24 lg:tw-pb-12 lg:tw-pt-14">
      <div className="tw-mx-auto tw-max-w-7xl">
        <div
          className="tw-relative tw-overflow-hidden tw-rounded-[34px] tw-border tw-border-white/10 tw-bg-[#111111] tw-bg-cover tw-bg-center tw-p-8 md:tw-p-12 lg:tw-p-16"
          style={{
            backgroundImage: "url('/img/site/2026/weaviate-bg-2026.jpg')",
          }}
        >
          <div
            className="tw-absolute tw-inset-0 tw-bg-black/15"
            aria-hidden="true"
          />

          <div className="tw-relative tw-mx-auto tw-max-w-3xl tw-text-center">
            <div className="tw-inline-flex tw-items-center tw-gap-3 tw-rounded-full tw-border tw-border-white/20 tw-bg-white/10 tw-px-3 tw-py-2 tw-backdrop-blur-md tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <span
                className="tw-inline-flex tw-items-center tw-rounded-full tw-bg-black/40 tw-px-2.5 tw-py-1 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-[0.16em]"
                style={{
                  background:
                    'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                New
              </span>

              <span className="tw-text-[13px] tw-font-medium tw-tracking-[0.06em] tw-text-white/90 md:tw-text-sm">
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
              className="tw-mt-6 tw-text-4xl tw-font-semibold tw-leading-[1.05] md:tw-text-6xl lg:tw-text-[4.35rem]"
              style={{
                color: '#F5F7FA',
                fontFamily: '"Fields Display", "Times New Roman", serif',
                fontWeight: 600,
                lineHeight: 1.02,
              }}
            >
              Design, build and ship complete AI experiences
            </h1>

            <p
              className="tw-mx-auto tw-mt-6 tw-max-w-2xl tw-text-base tw-leading-8 md:tw-text-lg"
              style={{
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              Vector search, RAG, and memory - all in one open-source platform.
            </p>

            <div className="tw-mt-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-3">
              <a
                href="/go/console"
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-white tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-slate-900 tw-transition hover:tw-bg-slate-100"
              >
                Start building
              </a>

              <a
                href="/docs"
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/30 tw-bg-black/25 tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-transition hover:tw-bg-black/40"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
