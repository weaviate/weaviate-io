import React from 'react';
import SplitImageSlider from '../SplitImageSlider';

const featureItems = [
  {
    id: 'ai-first',
    title: 'AI-first features under one roof',
    description:
      'Avoid separate systems and complex data pipelines. Write less custom code and build AI apps faster.',
    icon: '/img/site/2026/why-weaviate-icon-01.svg',
  },
  {
    id: 'billion-scale',
    title: 'Billion-scale architecture',
    description:
      'Adapt to any workload. Scale seamlessly as you grow up or out, all while optimizing costs.',
    icon: '/img/site/2026/why-weaviate-icon-02.svg',
  },
  {
    id: 'partner',
    title: 'A partner in innovation',
    description:
      'Fuel your AI products with cutting-edge features and first-class support from our global team of experts.',
    icon: '/img/site/2026/why-weaviate-icon-03.svg',
  },
  {
    id: 'builders',
    title: 'Where the AI builders build',
    description:
      'Get AI database tutorials, training, courses, resources, and support for builders of all levels.',
    icon: '/img/site/2026/why-weaviate-icon-04.svg',
  },
];

const enterpriseItems = [
  'Security & governance',
  'Global scalability',
  'Multi-tenancy',
  'Observability',
  'High availability',
  'RBAC, SOC 2, and HIPAA',
];

function FeatureCard({ item }) {
  return (
    <div className="tw-relative tw-overflow-hidden tw-rounded-[24px] tw-border tw-border-white/35 tw-bg-white/12 tw-p-6 tw-backdrop-blur-[14px]">
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_100%)]" />
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-white/40" />
      <div className="tw-pointer-events-none tw-absolute tw-left-[-10%] tw-top-[-10%] tw-h-32 tw-w-32 tw-rounded-full tw-bg-white/10 tw-blur-2xl" />

      <div className="tw-relative tw-flex tw-items-start tw-gap-4">
        <div className="tw-inline-flex tw-h-12 tw-w-12 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[14px] tw-bg-[#0A0E13] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <img
            src={item.icon}
            alt=""
            aria-hidden="true"
            className="tw-h-7 tw-w-7 tw-object-contain"
          />
        </div>

        <div>
          <h3
            className="tw-m-0 tw-text-[1.05rem] tw-font-semibold tw-leading-[1.2] tw-text-[##DDEBF2] md:tw-text-[1.1rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            {item.title}
          </h3>

          <p
            className="tw-m-0 tw-mt-4 tw-text-[0.875rem] tw-leading-6 tw-text-[#ECF4F8]"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#ECF4F8',
              lineHeight: '1.225rem ',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function EnterpriseCard() {
  return (
    <div className="tw-relative tw-overflow-hidden tw-rounded-[24px] tw-border tw-border-white/35 tw-bg-white/12 tw-p-6 tw-backdrop-blur-[14px]">
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_100%)]" />
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-white/40" />
      <div className="tw-pointer-events-none tw-absolute tw-left-[-10%] tw-top-[-10%] tw-h-32 tw-w-32 tw-rounded-full tw-bg-white/10 tw-blur-2xl" />

      <div className="tw-relative tw-flex tw-items-start tw-gap-4">
        <div className="tw-inline-flex tw-h-12 tw-w-12 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[14px] tw-bg-[#0A0E13] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <img
            src="/img/site/2026/why-weaviate-icon-05.svg"
            alt=""
            aria-hidden="true"
            className="tw-h-7 tw-w-7 tw-object-contain"
          />
        </div>

        <div className="tw-w-full">
          <h3
            className="tw-m-0 tw-text-[1.25rem] tw-font-semibold tw-leading-tight tw-text-[#DDEBF2]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Production-ready for Enterprise
          </h3>

          <p
            className="tw-m-0 tw-mt-4 tw-text-[14px] tw-leading-6 tw-text-[#ECF4F8]"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#ECF4F8',
              lineHeight: '1.225rem ',
            }}
          >
            Meet enterprise requirements and run securely in our cloud or yours.
          </p>

          <div className="tw-mt-6 tw-grid tw-gap-x-8 tw-gap-y-3 md:tw-grid-cols-2">
            {enterpriseItems.map((item) => (
              <div key={item} className="tw-flex tw-items-start tw-gap-3">
                <span className="tw-mt-[2px] tw-inline-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center">
                  <img
                    src="/img/site/2026/tick-icon.svg"
                    alt=""
                    aria-hidden="true"
                    className="tw-h-4 tw-w-4 tw-object-contain"
                  />
                </span>

                <span
                  className="tw-text-[14px] tw-leading-6 tw-text-[#ECF4F8]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#ECF4F8',
                    lineHeight: '1.225rem',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyWeaviate() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 md:tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-5xl">
          <p
            className="tw-m-0 tw-mb-6 tw-text-[1rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#43E2C5',
            }}
          >
            WHY WEAVIATE?
          </p>

          <h2
            className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.75rem] lg:tw-text-[3rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Easy start, boundless scale, deploy anywhere
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-4xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            One foundation for search, RAG, agents, and everything that comes
            next.
          </p>
        </div>

        <div
          className="tw-mt-12 tw-rounded-[32px] tw-p-5 md:tw-p-6 lg:tw-p-7"
          style={{
            background:
              'linear-gradient(135deg, #107BA3 0%, #18A5A6 35%, #10A66B 100%)',
          }}
        >
          <div className="tw-grid tw-gap-6 xl:tw-grid-cols-[1fr_0.95fr]">
            <div className="tw-space-y-4">
              <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                {featureItems.map((item) => (
                  <FeatureCard key={item.id} item={item} />
                ))}
              </div>

              <EnterpriseCard />
            </div>

            <div className="tw-min-h-[680px] tw-overflow-hidden tw-rounded-[24px]">
              <SplitImageSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
