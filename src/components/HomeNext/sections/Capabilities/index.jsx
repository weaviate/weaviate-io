import React from 'react';
import Link from '@docusaurus/Link';

const capabilityCards = [
  {
    title: 'Vector Database',
    description:
      'Store, index, and search high-dimensional vectors at any scale. The foundation for search, RAG, and agents.',
    icon: '/img/site/2026/vector-database-icon.svg',
    to: '/platform',
    gradient:
      'linear-gradient(48deg, rgba(0,254,107,0.3) 13.81%, rgba(0,183,226,0.3) 92.18%)',
    hoverGlow: 'rgba(0, 254, 107, 0.16)',
  },
  {
    title: 'Query Agent',
    description:
      'Ask questions in natural language. Query Agent translates intent into optimized database queries automatically.',
    icon: '/img/site/2026/query-agent-icon.svg',
    to: '/product/query-agent',
    gradient:
      'linear-gradient(123deg, rgba(38,214,255,0.3) 12.44%, rgba(215,122,255,0.3) 109.26%)',
    hoverGlow: 'rgba(95, 180, 255, 0.16)',
  },
  {
    title: 'Embeddings',
    description:
      'Built-in vector generation from text, images, and more. No external embedding pipeline required.',
    icon: '/img/site/2026/embeddings-icon.svg',
    to: '/product/embeddings',
    gradient:
      'linear-gradient(140deg, rgba(117,251,174,0.3) 8.61%, rgba(182,248,116,0.3) 94.4%)',
    hoverGlow: 'rgba(182, 248, 116, 0.14)',
  },
  {
    title: 'Engram',
    description:
      'Create personalized AI experiences that learn and adapt to each user over time.',
    icon: '/img/site/2026/engram-icon.svg',
    to: '/product',
    gradient:
      'linear-gradient(48deg, rgba(104,255,168,0.3) -4.58%, rgba(0,183,226,0.3) 86.47%)',
    hoverGlow: 'rgba(80, 230, 190, 0.14)',
  },
];

export default function Capabilities() {
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
            Platform Services
          </p>

          <h2
            className="tw-mt-4 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.5rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Everything you need to build with AI
          </h2>

          <p
            className="tw-mt-5 tw-max-w-3xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Four core capabilities, one unified platform - deployment-agnostic
            and open source.
          </p>
        </div>

        <div className="tw-mt-12 tw-grid tw-gap-6 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {capabilityCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="tw-group tw-relative tw-block tw-overflow-hidden tw-rounded-[28px] tw-p-8 tw-text-white tw-no-underline tw-transition-all tw-duration-300 hover:tw--translate-y-1 hover:tw-scale-[1.01]"
              style={{
                background: card.gradient,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.16)`,
              }}
            >
              <div
                className="tw-pointer-events-none tw-absolute tw-inset-0 tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100"
                style={{
                  background: `radial-gradient(circle at top left, ${card.hoverGlow} 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0) 70%)`,
                }}
                aria-hidden="true"
              />

              <div
                className="tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-[28px] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                aria-hidden="true"
              />

              <div className="tw-relative tw-flex tw-min-h-[290px] tw-flex-col">
                <div className="tw-mb-8 tw-flex tw-items-start tw-justify-between">
                  <div className="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-transition-transform tw-duration-300 group-hover:tw-scale-105">
                    <img
                      src={card.icon}
                      alt=""
                      aria-hidden="true"
                      className="tw-h-16 tw-w-16 tw-object-contain"
                    />
                  </div>
                </div>

                <h3
                  className="tw-m-0 tw-text-[1.25rem] tw-font-semibold tw-leading-tight tw-transition-colors tw-duration-300 group-hover:tw-text-white"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: '#ECF4F8',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="tw-mt-4 tw-text-[16px] tw-leading-7 tw-text-[#C7D4E3] tw-transition-colors tw-duration-300 group-hover:tw-text-[#E5EDF5]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.description}
                </p>

                <span
                  className="tw-mt-auto tw-pt-6 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-white/0 tw-transition-all tw-duration-300 group-hover:tw-text-white/70"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
