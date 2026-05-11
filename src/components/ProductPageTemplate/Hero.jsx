import React from 'react';
import Link from '@docusaurus/Link';

export default function Hero() {
  return (
    <section className="tw-relative tw-overflow-hidden tw-bg-[#111111] tw-py-20 lg:tw-py-20">
      <div className="container">
        <div className="tw-grid tw-items-center tw-gap-12 lg:tw-grid-cols-[0.9fr_1.1fr] lg:tw-gap-20">
          <div>
            <h1 className="tw-mb-8 tw-font-['Plus_Jakarta_Sans'] tw-text-[3rem] tw-font-semibold tw-leading-[130%] tw-tracking-[-0.03em]">
              <span className="tw-block tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-bg-clip-text tw-text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                Engram:
              </span>

              <span className="tw-block tw-text-[#DDEBF2]">
                Memory Built for AI Agents
              </span>
            </h1>

            <p className="tw-mb-12 tw-max-w-2xl tw-font-['Inter'] tw-text-xl tw-leading-relaxed tw-text-[#b8c4d4] md:tw-text-2xl">
              A fully managed API for building agents that remember, learn, and
              continually improve over time.
            </p>

            <div className="tw-flex tw-flex-wrap tw-gap-5">
              <Link
                to="/contact"
                className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#e8f3fb] tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-text-[#111111] hover:tw-no-underline"
              >
                Request early access
              </Link>

              <Link
                to="https://docs.weaviate.io/agents"
                className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/40 tw-bg-transparent tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-white tw-no-underline tw-transition hover:tw--translate-y-0.5 hover:tw-border-white hover:tw-bg-white/10 hover:tw-text-white hover:tw-no-underline"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: '0.375rem',
                  border: '0.5px solid #ECF4F8',
                }}
              >
                Documentation
              </Link>
            </div>
          </div>

          <div className="tw-relative">
            <div className="tw-absolute tw-inset-0 tw-rounded-[1.875rem] tw-bg-[linear-gradient(48deg,#68FFA8_-4.58%,#00B7E2_86.47%)] tw-opacity-20" />

            <div className="tw-relative tw-rounded-[1.875rem] tw-border tw-border-white/10 tw-bg-[linear-gradient(48deg,rgba(104,255,168,0.16)_-4.58%,rgba(0,183,226,0.22)_86.47%)] tw-p-6 tw-shadow-[0_28px_90px_rgba(0,0,0,0.35)] md:tw-p-10">
              <img
                src="/img/site/2026/engram-header-diagram.svg"
                alt="Engram memory architecture diagram"
                className="tw-h-auto tw-w-full tw-rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
