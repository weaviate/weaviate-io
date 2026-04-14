import React from 'react';

const capabilityCards = [
  {
    title: 'Vector Database',
    description:
      'Store, index, and search high-dimensional vectors at any scale. The foundation for search, RAG, and agents.',
    icon: '/img/site/2026/vector-database-icon.svg',
    gradient:
      'linear-gradient(48deg, rgba(0,254,107,0.3) 13.81%, rgba(0,183,226,0.3) 92.18%)',
  },
  {
    title: 'Query Agent',
    description:
      'Ask questions in natural language. Query Agent translates intent into optimized database queries automatically.',
    icon: '/img/site/2026/query-agent-icon.svg',
    gradient:
      'linear-gradient(123deg, rgba(38,214,255,0.3) 12.44%, rgba(215,122,255,0.3) 109.26%)',
  },
  {
    title: 'Embeddings',
    description:
      'Built-in vector generation from text, images, and more. No external embedding pipeline required.',
    icon: '/img/site/2026/embeddings-icon.svg',
    gradient:
      'linear-gradient(140deg, rgba(117,251,174,0.3) 8.61%, rgba(182,248,116,0.3) 94.4%)',
  },
  {
    title: 'Engram',
    description:
      'Create personalized AI experiences that learn and adapt to each user over time.',
    icon: '/img/site/2026/engram-icon.svg',
    gradient:
      'linear-gradient(48deg, rgba(104,255,168,0.3) -4.58%, rgba(0,183,226,0.3) 86.47%)',
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
            <div
              key={card.title}
              className="tw-rounded-[28px] tw-p-8 tw-text-white"
              style={{
                background: card.gradient,
              }}
            >
              <div className="tw-mb-8 tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center">
                <img
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  className="tw-h-16 tw-w-16 tw-object-contain"
                />
              </div>

              <h3
                className="tw-m-0 tw-text-[1.25rem] tw-font-semibold tw-leading-tight tw-text-[#ECF4F8]"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: '#ECF4F8',
                }}
              >
                {card.title}
              </h3>

              <p
                className="tw-mt-4 tw-text-[16px] tw-leading-7 tw-text-[#B9C8DE]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
