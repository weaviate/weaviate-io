import React, { useState } from 'react';
import Link from '@docusaurus/Link';

const navGroups = {
  Product: [
    {
      title: 'Overview',
      items: [
        { label: 'Vector Database', to: '/platform' },
        { label: 'Embeddings', to: '/product/embeddings' },
        { label: 'Integrations', to: '/product/integrations' },
        { label: 'All Products', to: '/product' },
        { label: 'Previews', to: '/product-previews' },
        { label: 'Engram', to: '/product' },
      ],
    },
    {
      title: 'Agents',
      items: [
        { label: 'Query Agent', to: '/product/query-agent' },
        { label: 'Transformation Agent', to: '/product/transformation-agent' },
        { label: 'Personalization Agent', to: '/product/personalization-agent' },
      ],
    },
    {
      title: 'Deployment',
      items: [
        { label: 'Shared Cloud', to: '/deployment/shared' },
        { label: 'Dedicated Cloud', to: '/deployment/dedicated' },
        { label: 'Enablement', to: '/deployment/enablement' },
      ],
    },
  ],
  Solutions: [
    {
      title: 'Use Cases',
      items: [
        { label: 'RAG', to: '/rag' },
        { label: 'Hybrid Search', to: '/hybrid-search' },
        { label: 'Agentic AI', to: '/agentic-ai' },
        { label: 'Cost Performance Optimization', to: '/cost-performance-optimization' },
      ],
    },
    {
      title: 'By Industry',
      items: [
        { label: '💰 Financial Services', to: '/case-studies' },
        { label: '🏥 Healthcare', to: '/case-studies' },
        { label: '🛒 E-commerce', to: '/case-studies' },
        { label: '💻 Technology', to: '/case-studies' },
        { label: '🎓 Education', to: '/case-studies' },
        { label: '⚖️ Legal', to: '/case-studies' },
      ],
    },
    {
      title: 'Examples',
      items: [
        { label: 'Case Studies', to: '/case-studies' },
        { label: 'Demos', to: '/community/demos' },
      ],
    },
  ],
  Developers: [
    {
      title: 'Build',
      items: [
        { label: 'Weaviate Database Docs', to: 'https://docs.weaviate.io/weaviate' },
        { label: 'Weaviate Cloud Docs', to: 'https://docs.weaviate.io/cloud' },
        { label: 'Weaviate Deployment Docs', to: 'https://docs.weaviate.io/deploy' },
        { label: 'Weaviate Agents Docs', to: 'https://docs.weaviate.io/agents' },
        { label: 'GitHub', to: 'https://github.com/weaviate/weaviate' },
      ],
    },
    {
      title: 'Learn',
      items: [
        { label: 'Learning Center', to: '/learn' },
        { label: 'Blog', to: '/blog' },
        { label: 'Academy', to: 'https://academy.weaviate.io/' },
        { label: 'Knowledge Cards', to: '/learn/knowledgecards' },
        { label: 'Paper Reviews', to: '/papers' },
        { label: 'Podcasts', to: '/podcast' },
      ],
    },
    {
      title: 'Engage',
      items: [
        { label: 'Events & Webinars', to: '/community/events' },
        { label: 'Weaviate Hero Program', to: '/community' },
        { label: 'Forum', to: 'https://forum.weaviate.io/' },
      ],
    },
  ],
  Company: [
    {
      title: 'About',
      items: [
        { label: 'Company', to: '/company/about-us' },
        { label: 'Careers', to: '/company/careers' },
        { label: 'Remote', to: '/company/remote' },
        { label: 'Playbook', to: '/company/playbook' },
        { label: 'Investors', to: '/company/investors' },
        { label: 'Contact Us', to: '/contact' },
      ],
    },
    {
      title: 'Partners',
      items: [
        { label: 'Overview', to: '/partners' },
        { label: 'AWS', to: '/partners/aws' },
        { label: 'Google Cloud', to: '/partners/gcp' },
        { label: 'Snowflake', to: '/partners/snowflake' },
        { label: 'Databricks', to: '/partners/databricks' },
      ],
    },
  ],
};

const mainLinks = [
  { label: 'Product', to: '/product', showCaret: true },
  { label: 'Solutions', to: '/rag', showCaret: true },
  { label: 'Developers', to: '/learn', showCaret: true },
  { label: 'Company', to: '/company/about-us', showCaret: true },
  { label: 'Pricing', to: '/pricing', showCaret: false },
];

const actionLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Log in', to: '/go/console' },
];

function MegaMenu({ sections }) {
  return (
    <div className="tw-absolute tw-left-1/2 tw-top-full tw-z-50 tw-w-[920px] tw-max-w-[calc(100vw-48px)] tw--translate-x-1/2 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#111317] tw-p-6 tw-shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="tw-grid tw-gap-8 md:tw-grid-cols-2 xl:tw-grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <p
              className="tw-mb-4 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-[0.12em]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                background: 'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {section.title}
            </p>

            <ul className="tw-m-0 tw-list-none tw-space-y-3 tw-p-0">
              {section.items.map((item) => {
                const isExternal = item.to.startsWith('http');

                if (isExternal) {
                  return (
                    <li key={item.label} className="tw-m-0 tw-list-none tw-p-0">
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noreferrer"
                        className="tw-text-[15px] tw-leading-6 tw-text-[#D5DEEE] tw-no-underline tw-transition hover:tw-text-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.label} className="tw-m-0 tw-list-none tw-p-0">
                    <Link
                      to={item.to}
                      className="tw-text-[15px] tw-leading-6 tw-text-[#D5DEEE] tw-no-underline tw-transition hover:tw-text-white"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-[#1f2128] tw-bg-[#090b10]/95 tw-backdrop-blur">
      <div className="tw-mx-auto tw-flex tw-h-20 tw-max-w-[1320px] tw-items-center tw-px-6 lg:tw-px-10">
        <Link to="/" className="tw-shrink-0" aria-label="Weaviate home">
          <img
            src="/img/site/2026/weaviate-logo-2-colours-dark-green.svg"
            alt="Weaviate"
            className="tw-h-5 tw-w-auto"
          />
        </Link>

        <nav className="tw-ml-auto tw-hidden tw-flex-1 tw-justify-center lg:tw-flex">
          <ul className="tw-m-0 tw-flex tw-list-none tw-items-center tw-gap-10 tw-p-0">
            {mainLinks.map((link) => {
              const hasMenu = !!navGroups[link.label];

              return (
              <li
  key={link.label}
  className="tw-relative tw-m-0 tw-list-none tw-p-0 tw-pb-4"
  onMouseEnter={() => hasMenu && setOpenMenu(link.label)}
  onMouseLeave={() => hasMenu && setOpenMenu(null)}
>
                  <Link
                    to={link.to}
                    className="tw-inline-flex tw-items-center tw-gap-1 tw-text-[14px] tw-font-normal tw-text-[#B9C8DE] tw-no-underline tw-transition hover:tw-text-white"
                    style={{ fontFamily: 'Inter, sans-serif', lineHeight: '163.8%' }}
                  >
                    {link.label}
                    {link.showCaret ? (
                      <span className="tw-text-[10px] tw-text-[#8b95ad]" aria-hidden="true">
                        ▼
                      </span>
                    ) : null}
                  </Link>

                  {hasMenu && openMenu === link.label ? (
                    <MegaMenu sections={navGroups[link.label]} />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="tw-ml-auto tw-hidden tw-items-center tw-gap-8 lg:tw-ml-0 lg:tw-flex">
          <Link
            to="https://github.com/weaviate/weaviate"
            className="tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-text-[#B9C8DE] tw-transition hover:tw-text-white"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github tw-text-[18px]" aria-hidden="true" />
          </Link>

          {actionLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="tw-inline-flex tw-items-center tw-text-[14px] tw-font-normal tw-text-[#B9C8DE] tw-no-underline tw-transition hover:tw-text-white"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '163.8%' }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/go/console"
            className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#6BE38C] tw-px-5 tw-py-2.5 tw-text-[14px] tw-font-medium tw-text-[#081012] tw-no-underline tw-transition hover:tw-bg-[#7ced9d]"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '163.8%' }}
          >
            Try now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((v) => !v)}
          className="tw-ml-auto tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-[#2b3040] tw-text-[#c8d0df] lg:tw-hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span className="tw-text-xl">{isMobileOpen ? '×' : '☰'}</span>
        </button>
      </div>

      {isMobileOpen ? (
        <div className="tw-border-t tw-border-[#1f2128] tw-bg-[#090b10] lg:tw-hidden">
          <div className="tw-mx-auto tw-max-w-[1320px] tw-space-y-2 tw-px-6 tw-py-5">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="tw-block tw-rounded-md tw-px-2 tw-py-2 tw-text-base tw-font-medium tw-text-[#d7ddeb] tw-no-underline hover:tw-bg-[#11141d]"
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}

            <div className="tw-mt-3 tw-border-t tw-border-[#1f2128] tw-pt-3">
              <Link
                to="https://github.com/weaviate/weaviate"
                className="tw-block tw-rounded-md tw-px-2 tw-py-2 tw-text-base tw-font-medium tw-text-[#d7ddeb] tw-no-underline hover:tw-bg-[#11141d]"
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                GitHub
              </Link>

              <Link
                to="/contact"
                className="tw-block tw-rounded-md tw-px-2 tw-py-2 tw-text-base tw-font-medium tw-text-[#d7ddeb] tw-no-underline hover:tw-bg-[#11141d]"
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Contact
              </Link>

              <Link
                to="/go/console"
                className="tw-block tw-rounded-md tw-px-2 tw-py-2 tw-text-base tw-font-medium tw-text-[#d7ddeb] tw-no-underline hover:tw-bg-[#11141d]"
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Log in
              </Link>

              <Link
                to="/go/console"
                className="tw-mt-2 tw-inline-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#6BE38C] tw-px-5 tw-py-3 tw-text-base tw-font-semibold tw-text-[#081012] tw-no-underline"
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Try now
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
} 