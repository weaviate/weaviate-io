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

function MegaMenu({ sections, menuLabel }) {
  const positionClass =
    menuLabel === 'Product' || menuLabel === 'Solutions'
      ? 'tw-left-0 tw-translate-x-[8px]'
      : 'tw-left-1/2 tw--translate-x-1/2';

  return (
    <div
      className={`tw-absolute tw-top-full tw-z-50 tw-w-[920px] tw-max-w-[calc(100vw-48px)] tw-pt-4 ${positionClass}`}
    >
      <div
        className="
          tw-relative tw-overflow-hidden tw-rounded-[24px]
          tw-border tw-border-white/8
          tw-bg-[rgba(8,10,16,0.88)]
          tw-shadow-[0_24px_80px_rgba(0,0,0,0.42)]
          tw-backdrop-blur-[16px]
          tw-supports-[backdrop-filter]:tw-bg-[rgba(8,10,16,0.82)]
          tw-p-7
          tw-animate-[menuFadeIn_160ms_ease-out]
          tw-origin-top
        "
      >
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-rounded-[24px] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]" />
        <div className="tw-pointer-events-none tw-absolute tw-left-0 tw-right-0 tw-top-0 tw-h-20 tw-bg-[radial-gradient(circle_at_top,rgba(67,226,197,0.05),transparent_68%)]" />

        <div className="tw-relative tw-grid tw-gap-8 md:tw-grid-cols-2 xl:tw-grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <p
                className="tw-mb-4 tw-text-[12px] tw-font-semibold tw-uppercase tw-tracking-[0.14em]"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background:
                    'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {section.title}
              </p>

              <ul className="tw-m-0 tw-list-none tw-space-y-1.5 tw-p-0">
                {section.items.map((item) => {
                  const isExternal = item.to.startsWith('http');
                  const itemClasses =
                    'tw-group tw-flex tw-items-center tw-justify-between tw-rounded-xl tw-px-3 tw-py-2.5 tw-text-[15px] tw-leading-6 tw-text-[#D5DEEE] tw-no-underline tw-transition-all tw-duration-150 hover:tw-bg-white/4 hover:tw-text-white';

                  const content = (
                    <>
                      <span>{item.label}</span>
                      <span className="tw-translate-x-[-4px] tw-opacity-0 tw-transition-all tw-duration-150 group-hover:tw-translate-x-0 group-hover:tw-opacity-100 tw-text-[#7BE7C7]">
                        →
                      </span>
                    </>
                  );

                  if (isExternal) {
                    return (
                      <li key={item.label} className="tw-m-0 tw-list-none tw-p-0">
                        <a
                          href={item.to}
                          target="_blank"
                          rel="noreferrer"
                          className={itemClasses}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label} className="tw-m-0 tw-list-none tw-p-0">
                      <Link
                        to={item.to}
                        className={itemClasses}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const [hoveredMobileItem, setHoveredMobileItem] = useState(null);

  const getMobileItemStyles = (label, isActive = false) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'block',
    width: '100%',
    color: isActive || hoveredMobileItem === label ? '#00FE6B' : '#d7ddeb',
    background: isActive || hoveredMobileItem === label ? '#11141d' : 'transparent',
  });

  const getMobileArrowStyles = (label, isActive = false) => ({
    color: isActive || hoveredMobileItem === label ? '#00FE6B' : '#8b95ad',
  });

  const resetMobileMenus = () => {
    setIsMobileOpen(false);
    setOpenMobileMenu(null);
    setHoveredMobileItem(null);
  };

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
          <ul className="tw-m-0 tw-flex tw-list-none tw-items-center tw-gap-3 tw-p-0">
            {mainLinks.map((link) => {
              const hasMenu = !!navGroups[link.label];
              const isOpen = openMenu === link.label;

              return (
                <li
                  key={link.label}
                  className="tw-relative tw-m-0 tw-list-none tw-p-0"
                  onMouseEnter={() => hasMenu && setOpenMenu(link.label)}
                  onMouseLeave={() => hasMenu && setOpenMenu(null)}
                >
                  <Link
                    to={link.to}
                    className={`
                      tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full
                      tw-px-4 tw-py-2.5
                      tw-text-[14px] tw-font-normal tw-no-underline tw-transition-all tw-duration-150
                      ${
                        isOpen
                          ? 'tw-bg-white/6 tw-text-white'
                          : 'tw-text-[#B9C8DE] hover:tw-bg-white/4 hover:tw-text-white'
                      }
                    `}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '163.8%',
                    }}
                  >
                    {link.label}
                    {link.showCaret ? (
                      <span
                        className={`tw-text-[10px] tw-transition-transform tw-duration-150 ${
                          isOpen ? 'tw-rotate-180 tw-text-white' : 'tw-text-[#8b95ad]'
                        }`}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    ) : null}
                  </Link>

                  {hasMenu && isOpen ? (
                    <MegaMenu sections={navGroups[link.label]} menuLabel={link.label} />
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
          onClick={() => {
            setIsMobileOpen((v) => {
              const next = !v;
              if (!next) {
                setOpenMobileMenu(null);
                setHoveredMobileItem(null);
              }
              return next;
            });
          }}
          className="
            tw-ml-auto tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center
            tw-rounded-[12px] tw-border tw-border-white/10
            tw-bg-[#12161f]
            tw-text-[#B9C8DE]
            tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
            tw-transition
            hover:tw-border-white/15 hover:tw-text-white
            lg:tw-hidden
          "
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span
            className={`tw-text-[22px] tw-leading-none tw-transition-colors ${
              isMobileOpen ? 'tw-text-[#DDEBF2]' : 'tw-text-[#B9C8DE]'
            }`}
          >
            {isMobileOpen ? '×' : '☰'}
          </span>
        </button>
      </div>

      {isMobileOpen ? (
        <div className="tw-border-t tw-border-[#1f2128] tw-bg-[#090b10] lg:tw-hidden">
          <div className="tw-mx-auto tw-max-w-[1320px] tw-space-y-2 tw-px-6 tw-py-5">
            {mainLinks.map((link) => {
              const hasMenu = !!navGroups[link.label];
              const isExpanded = openMobileMenu === link.label;

              if (!hasMenu) {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-no-underline tw-transition"
                    onMouseEnter={() => setHoveredMobileItem(link.label)}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    onFocus={() => setHoveredMobileItem(link.label)}
                    onBlur={() => setHoveredMobileItem(null)}
                    onClick={resetMobileMenus}
                    style={getMobileItemStyles(link.label)}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileMenu((prev) =>
                        prev === link.label ? null : link.label
                      )
                    }
                    onMouseEnter={() => setHoveredMobileItem(link.label)}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                    onFocus={() => setHoveredMobileItem(link.label)}
                    onBlur={() => setHoveredMobileItem(null)}
                    className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-left tw-transition"
                    style={{
                      ...getMobileItemStyles(link.label, isExpanded),
                      border: 'none',
                    }}
                    aria-expanded={isExpanded}
                  >
                    <span className="tw-text-[16px] tw-font-medium">{link.label}</span>
                    <span
                      className={`tw-text-[12px] tw-transition-transform tw-duration-200 ${
                        isExpanded ? 'tw-rotate-180' : ''
                      }`}
                      style={getMobileArrowStyles(link.label, isExpanded)}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className="mobile-accordion-panel tw-mt-2 tw-space-y-4 tw-rounded-[14px] tw-bg-[#0d1119] tw-px-4 tw-py-4">
                      {navGroups[link.label].map((section) => (
                        <div key={section.title}>
                          <p
                            className="tw-m-0 tw-mb-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-[0.14em]"
                            style={{
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              background:
                                'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {section.title}
                          </p>

                          <div className="tw-space-y-1">
                            {section.items.map((item) => {
                              const isExternal = item.to.startsWith('http');

                              if (isExternal) {
                                return (
                                  <a
                                    key={item.label}
                                    href={item.to}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="tw-flex tw-items-center tw-justify-between tw-rounded-[10px] tw-px-3 tw-py-2.5 tw-text-[14px] tw-text-[#C8D3E6] tw-no-underline tw-transition hover:tw-bg-white/4 hover:tw-text-white"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    <span>{item.label}</span>
                                    <span className="tw-text-[#7BE7C7]">↗</span>
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={item.label}
                                  to={item.to}
                                  className="tw-flex tw-items-center tw-justify-between tw-rounded-[10px] tw-px-3 tw-py-2.5 tw-text-[14px] tw-text-[#C8D3E6] tw-no-underline tw-transition hover:tw-bg-white/4 hover:tw-text-white"
                                  onClick={resetMobileMenus}
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  <span>{item.label}</span>
                                  <span className="tw-text-[#7BE7C7]">→</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="tw-mt-3 tw-border-t tw-border-[#1f2128] tw-pt-3">
              <Link
                to="https://github.com/weaviate/weaviate"
                className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-no-underline tw-transition"
                onMouseEnter={() => setHoveredMobileItem('GitHub')}
                onMouseLeave={() => setHoveredMobileItem(null)}
                onFocus={() => setHoveredMobileItem('GitHub')}
                onBlur={() => setHoveredMobileItem(null)}
                onClick={resetMobileMenus}
                style={getMobileItemStyles('GitHub')}
              >
                GitHub
              </Link>

              <Link
                to="/contact"
                className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-no-underline tw-transition"
                onMouseEnter={() => setHoveredMobileItem('Contact')}
                onMouseLeave={() => setHoveredMobileItem(null)}
                onFocus={() => setHoveredMobileItem('Contact')}
                onBlur={() => setHoveredMobileItem(null)}
                onClick={resetMobileMenus}
                style={getMobileItemStyles('Contact')}
              >
                Contact
              </Link>

              <Link
                to="/go/console"
                className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-no-underline tw-transition"
                onMouseEnter={() => setHoveredMobileItem('Log in')}
                onMouseLeave={() => setHoveredMobileItem(null)}
                onFocus={() => setHoveredMobileItem('Log in')}
                onBlur={() => setHoveredMobileItem(null)}
                onClick={resetMobileMenus}
                style={getMobileItemStyles('Log in')}
              >
                Log in
              </Link>

              <Link
                to="/go/console"
                className="tw-mt-2 tw-inline-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#6BE38C] tw-px-5 tw-py-3 tw-text-base tw-font-semibold tw-text-[#081012] tw-no-underline"
                onClick={resetMobileMenus}
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