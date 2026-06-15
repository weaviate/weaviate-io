import Link from '@docusaurus/Link';
import React, { useMemo, useState } from 'react';

const exampleCategories = [
  { id: 'hybrid-search', label: 'Hybrid Search' },
  { id: 'rag', label: 'RAG' },
  { id: 'agentic-ai', label: 'Agentic AI' },
  { id: 'personalized-experiences', label: 'Personalized Experiences' },
];

const exampleItems = {
  'hybrid-search': [
    {
      id: 'hybrid-demo-1',
      title: 'SearchFlow',
      subtitle: 'Hybrid Search Experience',
      image: '/img/site/2026/elysia-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'hybrid-demo-2',
      title: 'Verba',
      subtitle: 'Grounded Search Assistant',
      image: '/img/site/2026/verba-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'hybrid-demo-3',
      title: 'BookRecs',
      subtitle: 'Recommendation + Retrieval',
      image: '/img/site/2026/bookrecs-icon.svg',
      to: '/community/demos',
    },
  ],
  rag: [
    {
      id: 'rag-demo-1',
      title: 'Verba',
      subtitle: 'The Golden RAGtriever',
      image: '/img/site/2026/verba-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'rag-demo-2',
      title: 'Elysia',
      subtitle: 'Agentic RAG Framework',
      image: '/img/site/2026/elysia-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'rag-demo-3',
      title: 'BookRecs',
      subtitle: 'Book Recommendation System',
      image: '/img/site/2026/bookrecs-icon.svg',
      to: '/community/demos',
    },
  ],
  'agentic-ai': [
    {
      id: 'agentic-demo-1',
      title: 'Elysia',
      subtitle: 'Agentic RAG Framework',
      image: '/img/site/2026/elysia-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'agentic-demo-2',
      title: 'Verba',
      subtitle: 'The Golden RAGtriever',
      image: '/img/site/2026/verba-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'agentic-demo-3',
      title: 'BookRecs',
      subtitle: 'Book Recommendation System',
      image: '/img/site/2026/bookrecs-icon.svg',
      to: '/community/demos',
    },
  ],
  'personalized-experiences': [
    {
      id: 'personal-demo-1',
      title: 'BookRecs',
      subtitle: 'Personalized Book Discovery',
      image: '/img/site/2026/bookrecs-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'personal-demo-2',
      title: 'Elysia',
      subtitle: 'Adaptive Knowledge Experience',
      image: '/img/site/2026/elysia-icon.svg',
      to: '/community/demos',
    },
    {
      id: 'personal-demo-3',
      title: 'Verba',
      subtitle: 'Personalized Retrieval Flows',
      image: '/img/site/2026/verba-icon.svg',
      to: '/community/demos',
    },
  ],
};

function CategoryButton({ item, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tw-inline-flex tw-min-h-[64px] tw-items-center tw-justify-center tw-rounded-2xl tw-border tw-px-6 tw-py-4 tw-text-center tw-text-[18px] tw-font-normal tw-transition ${
        isActive
          ? 'tw-border-[#26D6FF] tw-border-solid tw-border-[0.5px] tw-bg-[#111111] tw-text-white tw-shadow-[inset_0_0_0_1px_rgba(167,139,250,0.35)]'
          : 'tw-border-[#3A324A] tw-border-none tw-bg-[#18191D] tw-text-[#C7D2E2] hover:tw-border-[#534766] hover:tw-text-white'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {item.label}
    </button>
  );
}

function ExampleCard({ item }) {
  return (
    <article className="tw-flex tw-h-full tw-flex-col tw-rounded-[28px] tw-bg-[#18191D] tw-p-8 md:tw-p-10">
      <div>
        <h3
          className="tw-m-0 tw-text-[2.25rem] tw-font-semibold tw-leading-none tw-text-[#DDEBF2]"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: '#DDEBF2',
          }}
        >
          {item.title}
        </h3>

        <p
          className="tw-m-0 tw-mt-6 tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {item.subtitle}
        </p>
      </div>

      <div className="tw-mt-10 tw-flex tw-flex-1 tw-items-end tw-justify-center">
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          className="tw-h-auto tw-max-h-[280px] tw-w-full tw-max-w-[320px] tw-object-contain"
        />
      </div>

      <div className="tw-mt-8 tw-flex tw-justify-end">
        <Link
          to={item.to}
          className="tw-text-[18px] tw-font-normal tw-text-[#DDEBF2] tw-underline tw-underline-offset-4 tw-transition hover:tw-text-white"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Start Demo
        </Link>
      </div>
    </article>
  );
}

export default function Examples() {
  const [activeCategory, setActiveCategory] = useState('agentic-ai');

  const cards = useMemo(
    () => exampleItems[activeCategory] || exampleItems['agentic-ai'],
    [activeCategory],
  );

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
            EXAMPLES
          </p>

          <h2
            className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.75rem] lg:tw-text-[3rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Explore apps built with Weaviate
          </h2>

          <p
            className="tw-m-0 tw-mt-6 tw-max-w-3xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Example projects and demo apps powered by Weaviate.
          </p>
        </div>

        <div className="tw-mt-12 tw-grid tw-gap-4 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          {exampleCategories.map((category) => (
            <CategoryButton
              key={category.id}
              item={category}
              isActive={category.id === activeCategory}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        <div className="tw-mt-10 tw-grid tw-gap-6 xl:tw-grid-cols-3">
          {cards.map((item) => (
            <ExampleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
