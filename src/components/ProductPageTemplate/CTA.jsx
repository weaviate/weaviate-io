import React from 'react';
import Link from '@docusaurus/Link';

export default function CTA() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-16 lg:tw-py-20">
      <div
        className="tw-relative tw-mx-auto tw-max-w-[1320px] tw-overflow-hidden tw-rounded-[2rem] tw-p-8 md:tw-p-12 lg:tw-p-14"
        style={{
          background:
            'linear-gradient(48deg, #00fe6b75 13.81%, #00B7E2 92.18%)',
        }}
      >
        <div className="tw-absolute tw-inset-0 tw-bg-black/55" />

        <div className="tw-relative tw-grid tw-items-center tw-gap-10 lg:tw-grid-cols-[220px_1fr_auto] lg:tw-gap-16">
          <div className="tw-flex tw-justify-center lg:tw-justify-start">
            <div className="tw-flex tw-h-[220px] tw-w-[220px] tw-items-center tw-justify-center tw-rounded-[2rem] tw-bg-[#171717] tw-p-8">
              <img
                src="/img/site/2026/engram-cta-logo.svg"
                alt="Engram logo"
                className="tw-h-auto tw-w-full tw-max-w-[150px]"
              />
            </div>
          </div>

          <div className="tw-max-w-3xl">
            <h2
              className="tw-m-0"
              style={{
                color: '#DDEBF2',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '2.5rem',
                fontWeight: 600,
                lineHeight: '140%',
              }}
            >
              Give your agents memory that works in production
            </h2>

            <p
              className="tw-m-0 tw-mt-8"
              style={{
                color: '#B9C8DE',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: '140%',
              }}
            >
              Sign up for early access to Engram, share feedback, and help shape
              what we build next.
            </p>
          </div>

          <div className="tw-flex tw-justify-start lg:tw-justify-end">
            <Link
              to="/product-previews"
              className="tw-inline-flex tw-min-h-[60px] tw-items-center tw-justify-center tw-rounded-[0.75rem] tw-bg-[#E8EEF5] tw-px-8 tw-text-center tw-no-underline tw-transition-all tw-duration-300 hover:tw--translate-y-0.5 hover:tw-bg-white hover:tw-no-underline"
              style={{
                color: '#171717',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 600,
              }}
            >
              Request early access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
