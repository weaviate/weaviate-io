import Link from '@docusaurus/Link';
import React, { useMemo, useState } from 'react';

const useCaseItems = [
  {
    id: 'stackai',
    name: 'StackAI',
    logo: '/img/site/HP-logos/stack-ai.svg',
    logoAlt: 'StackAI',
    category: 'E-COMMERCE',
    stats: [
      { value: '99.9%', label: 'Faster turnaround' },
      { value: '10×', label: 'Improved processing output' },
      { value: '90%+', label: 'Accuracy' },
    ],
    quote:
      "The biggest benefit of using Weaviate isn't just the technology – it's the team behind it. The level of support we receive through their engineering team and support channels has been company-saving help.",
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
  {
    id: 'factset',
    name: 'FACTSET',
    logo: '/img/site/HP-logos/factset.svg',
    logoAlt: 'FACTSET',
    category: 'FINANCIAL SERVICES',
    stats: [
      { value: '40%', label: 'Faster retrieval' },
      { value: '3×', label: 'Research efficiency' },
      { value: '99.9%', label: 'Service reliability' },
    ],
    quote:
      'Weaviate helped us unify retrieval and ranking in a way that made our AI search experiences faster, more reliable, and easier to evolve.',
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
  {
    id: 'bunq',
    name: 'bunq',
    logo: '/img/site/HP-logos/bunq.svg',
    logoAlt: 'bunq',
    category: 'FINTECH',
    stats: [
      { value: '85%', label: 'Better search relevance' },
      { value: '2×', label: 'Team velocity' },
      { value: '24/7', label: 'Production availability' },
    ],
    quote:
      'Weaviate gave us the flexibility to build more intelligent product experiences while keeping performance and developer speed high.',
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    logo: '/img/site/HP-logos/stackoverflow.svg',
    logoAlt: 'Stack Overflow',
    category: 'DEVELOPER TOOLS',
    stats: [
      { value: '10×', label: 'Improved processing output' },
      { value: '90%+', label: 'Accuracy' },
      { value: '99.9%', label: 'Faster turnaround' },
    ],
    quote:
      'Weaviate made it possible to power more relevant knowledge retrieval at scale, while reducing complexity across our AI stack.',
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
  {
    id: 'ltk',
    name: 'LTK',
    logo: '/img/site/HP-logos/build-ltk-logo.svg',
    logoAlt: 'LTK',
    category: 'CREATOR COMMERCE',
    stats: [
      { value: '4×', label: 'Faster discovery' },
      { value: '92%', label: 'Recommendation accuracy' },
      { value: 'Millions', label: 'Items indexed' },
    ],
    quote:
      'With Weaviate, we were able to create more personalized discovery experiences that scale with both our catalog and our audience.',
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
  {
    id: 'gsk',
    name: 'GSK',
    logo: '/img/site/HP-logos/gsk.svg',
    logoAlt: 'GSK',
    category: 'HEALTHCARE',
    stats: [
      { value: '70%', label: 'Faster insight access' },
      { value: '3×', label: 'Search precision' },
      { value: 'Enterprise', label: 'Ready deployment' },
    ],
    quote:
      'Weaviate helped us structure and retrieve complex scientific knowledge in a way that made our internal AI experiences far more useful.',
    ctaLabel: 'Read Case Study',
    ctaTo: '/case-studies',
  },
];

function LogoButton({ item, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tw-flex tw-h-[56px] tw-items-center tw-justify-center tw-rounded-xl tw-border tw-px-5 tw-transition ${
        isActive
          ? 'tw-border-[#343949] tw-bg-[#17191f]'
          : 'tw-border-transparent tw-bg-transparent hover:tw-border-[#2a2f3f] hover:tw-bg-[#13161c]'
      }`}
      aria-pressed={isActive}
      aria-label={item.name}
    >
      <img
        src={item.logo}
        alt={item.logoAlt}
        className="tw-max-h-[30px] tw-w-auto tw-max-w-[140px] tw-object-contain tw-opacity-90"
      />
    </button>
  );
}

export default function UseCases() {
  const [activeId, setActiveId] = useState(useCaseItems[0].id);

  const activeItem = useMemo(
    () => useCaseItems.find((item) => item.id === activeId) || useCaseItems[0],
    [activeId],
  );

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
            USE CASES
          </p>

          <h2
            className="tw-m-0 tw-max-w-5xl tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.75rem] lg:tw-text-[3rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Innovative companies of all sizes power AI experiences with Weaviate
          </h2>

          <p
            className="tw-mt-6 tw-max-w-4xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            With over 20M open source downloads and thousands of customers,
            Weaviate is a core piece of the stack for leading startups,
            scale-ups, and enterprises.
          </p>
        </div>

        <div className="tw-mt-12 tw-rounded-[32px] tw-bg-[#18191d] tw-p-6 md:tw-p-8 lg:tw-p-10">
          <div className="tw-grid tw-gap-3 tw-border-b tw-border-[#2a2f3f] tw-pb-8 md:tw-grid-cols-3 xl:tw-grid-cols-6">
            {useCaseItems.map((item) => (
              <LogoButton
                key={item.id}
                item={item}
                isActive={item.id === activeItem.id}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>

          <div className="tw-mt-8 tw-grid tw-gap-8 lg:tw-grid-cols-[260px_1px_minmax(0,1fr)] lg:tw-gap-10">
            <div className="tw-grid tw-gap-8 sm:tw-grid-cols-3 lg:tw-grid-cols-1">
              {activeItem.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="tw-m-0 tw-text-[52px] tw-font-semibold tw-leading-none"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      background:
                        'linear-gradient(180deg, #38D6FF 0%, #A78BFA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="tw-m-0 tw-mt-2 tw-max-w-[180px] tw-text-[18px] tw-leading-7 tw-text-[#DDEBF2]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="tw-hidden tw-w-px tw-bg-[linear-gradient(180deg,rgba(167,139,250,0.2)_0%,rgba(167,139,250,0.6)_50%,rgba(167,139,250,0.2)_100%)] lg:tw-block" />

            <div>
              <p
                className="tw-m-0 tw-text-[14px] tw-font-medium tw-uppercase tw-tracking-[0.12em] tw-text-[#A4B3CC]"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                {activeItem.category}
              </p>

              <blockquote
                className="tw-m-0 tw-mt-5 tw-max-w-4xl tw-text-[32px] tw-font-normal tw-leading-[1.32] md:tw-text-[38px] lg:tw-text-[42px]"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background:
                    'linear-gradient(90deg, #38D6FF 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                “{activeItem.quote}”
              </blockquote>

              <div className="tw-mt-8">
                <Link
                  to={activeItem.ctaTo}
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#0D0F14] tw-px-6 tw-py-4 tw-text-[18px] tw-font-medium tw-text-white tw-no-underline tw-transition hover:tw-bg-[#131722]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {activeItem.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
