import Link from '@docusaurus/Link';
import React from 'react';

const cards = [
  {
    id: 'cloud',
    title: 'Start with Cloud',
    description: [
      'Free tier',
      'Usage based pricing',
      'Enterprise options',
      'Support',
    ],
    image: '/img/site/2026/get-started-cloud-bg.png',
    tickIcon: '/img/site/2026/cloud-tick.svg',
    ctaLabel: 'See pricing',
    ctaTo: '/pricing',
    imageGradient:
      'linear-gradient(135deg, rgba(71, 201, 255, 0.55) 0%, rgba(207, 135, 255, 0.45) 100%)',
    buttonGradient: 'linear-gradient(123deg, #26D6FF 12.44%, #D77AFF 109.26%)',
    borderColor: '#26D6FF',
  },
  {
    id: 'byoc',
    title: 'Build on your own',
    description: [
      'Sign up for cloud',
      'Create your first dataset',
      'Connect an LLM',
      'Build your AI app',
    ],
    image: '/img/site/2026/get-started-byoc-bg.png',
    tickIcon: '/img/site/2026/byoc-tick.svg',
    ctaLabel: 'Start building',
    ctaTo: 'https://docs.weaviate.io/weaviate/quickstart',
    imageGradient:
      'linear-gradient(135deg, rgba(0, 254, 107, 0.45) 0%, rgba(0, 183, 226, 0.35) 100%)',
    buttonGradient: 'linear-gradient(48deg, #00FE6B 13.81%, #00B7E2 92.18%)',
    borderColor: '#00FE6B',
  },
];

function GetStartedCard({ card }) {
  return (
    <div
      className="tw-overflow-hidden tw-rounded-[28px] tw-border tw-bg-[#141414] tw-shadow-[0_10px_40px_rgba(0,0,0,0.18)]"
      style={{ borderColor: card.borderColor }}
    >
      <div className="tw-grid md:tw-grid-cols-[250px_minmax(0,1fr)]">
        <div className="tw-relative tw-min-h-[260px] tw-overflow-hidden">
          {/* Base image */}
          <img
            src={card.image}
            alt=""
            aria-hidden="true"
            className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover"
          />

          {/* Main gradient (colour wash) */}
          <div
            className="tw-absolute tw-inset-0"
            style={{
              background: card.imageGradient,
              mixBlendMode: 'overlay',
              opacity: 0.9,
            }}
          />

          {/* Depth / dark fade (matches design) */}
          <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(8,12,18,0.2)_0%,rgba(8,12,18,0.6)_100%)]" />

          {/* Subtle edge glow (nice polish) */}
          <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-ring-1 tw-ring-white/10" />
        </div>

        <div className="tw-flex tw-flex-col tw-justify-between tw-p-8 md:tw-p-10">
          <div>
            <h3
              className="tw-m-0 tw-text-[2rem] tw-font-semibold tw-leading-[1.1] tw-text-[#DDEBF2]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#DDEBF2',
              }}
            >
              {card.title}
            </h3>

            <div className="tw-mt-10 tw-space-y-4">
              {card.description.map((item) => (
                <div key={item} className="tw-flex tw-items-start tw-gap-4">
                  <img
                    src={card.tickIcon}
                    alt=""
                    aria-hidden="true"
                    className="tw-mt-1 tw-h-6 tw-w-6 tw-shrink-0 tw-object-contain"
                  />

                  <span
                    className="tw-text-[1rem] tw-leading-8 tw-text-[#DDEBF2]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="tw-mt-10">
            <Link
              to={card.ctaTo}
              className="tw-inline-flex tw-w-full tw-items-center tw-justify-center tw-rounded-[10px] tw-px-6 tw-py-4 tw-text-[1rem] tw-font-semibold tw-text-[#081012] tw-no-underline tw-transition hover:tw-opacity-95"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: card.buttonGradient,
              }}
            >
              {card.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetStarted() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-16 md:tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p
            className="tw-m-0 tw-mb-6 tw-text-[1rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#43E2C5',
            }}
          >
            GET STARTED
          </p>

          <h2
            className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.75rem] lg:tw-text-[3rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Let&apos;s build together
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-4xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Spin up a cluster, point it at your data, and go. Weaviate can take
            care of embeddings, ranking, and auto-scaling so you can ship
            features, not infrastructure.
          </p>
        </div>

        <div className="tw-mt-12 tw-grid tw-gap-6 xl:tw-grid-cols-2">
          {cards.map((card) => (
            <GetStartedCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
