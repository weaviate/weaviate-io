import React, { useState } from 'react';
import Link from '@docusaurus/Link';

const navGroups = {
  Product: [
    {
      title: 'Platform Services',
      items: [
        {
          label: 'Vector Database',
          to: '/platform',
          children: [
            { label: 'Embeddings', to: '/product/embeddings' },
            { label: 'Query Agent', to: '/product/query-agent/' },
            { label: 'Integrations', to: '/product/integrations' },
          ],
        },
        { label: 'Engram', to: '/product/engram/' },
        { label: 'Product Previews', to: '/product-previews/' },
      ],
    },
    {
      title: 'Deployment Options',
      items: [
        { label: 'Shared Cloud', to: '/deployment/shared/' },
        { label: 'Dedicated Cloud', to: '/deployment/dedicated/' },
      ],
    },
  ],
  Solutions: [
    {
      title: 'Use Cases',
      items: [
        { label: 'RAG', to: '/rag/' },
        { label: 'Hybrid Search', to: '/hybrid-search/' },
        { label: 'Agentic AI', to: '/agentic-ai/' },
        {
          label: 'Cost Performance Optimization',
          to: '/cost-performance-optimization/',
        },
      ],
    },
    {
      title: 'Examples',
      items: [
        { label: 'Case Studies', to: '/case-studies/' },
        {
          label: 'Weaviate Playground',
          to: 'https://playground.weaviate.io/',
        },
      ],
    },
  ],
  Developers: [
    {
      title: 'Build',
      items: [
        {
          label: 'Weaviate Database Docs',
          to: 'https://docs.weaviate.io/weaviate',
        },
        {
          label: 'Weaviate Cloud Docs',
          to: 'https://docs.weaviate.io/cloud',
        },
        {
          label: 'Weaviate Deployment Docs',
          to: 'https://docs.weaviate.io/deploy',
        },
        {
          label: 'Weaviate Agents Docs',
          to: 'https://docs.weaviate.io/agents',
        },
        {
          label: 'Engram Docs',
          to: 'https://docs.weaviate.io/engram',
        },
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

const isExternalLink = (to) => /^https?:\/\//i.test(to);

function SmartLink({ to, children, ...props }) {
  if (isExternalLink(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

function MegaMenu({ sections, menuLabel }) {
  const isThreeColumn = sections.length >= 3;

  const widthClass = isThreeColumn
    ? 'tw-w-[min(920px,calc(100vw-64px))]'
    : 'tw-w-[min(640px,calc(100vw-64px))]';

  const gridClass = isThreeColumn
    ? 'md:tw-grid-cols-2 xl:tw-grid-cols-3'
    : 'md:tw-grid-cols-2';

  const positionClass =
    menuLabel === 'Product'
      ? 'tw-left-0 tw-translate-x-[8px]'
      : 'tw-left-1/2 tw--translate-x-1/2';

  return (
    <div
      className={`tw-absolute tw-top-full tw-z-50 ${widthClass} tw-pt-4 ${positionClass}`}
    >
      <div
        className="tw-relative tw-overflow-hidden tw-rounded-[24px] tw-border tw-border-white/8 tw-bg-[rgba(3,5,9,0.96)] tw-p-7 tw-shadow-[0_24px_90px_rgba(0,0,0,0.62)] tw-backdrop-blur-[20px]"
        style={{
          animation: 'menuFadeIn 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        <div className={`tw-relative tw-grid tw-gap-8 ${gridClass}`}>
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
                {section.items.map((item) => (
                  <li key={item.label} className="tw-m-0 tw-list-none tw-p-0">
                    <SmartLink
                      to={item.to}
                      className="tw-group tw-flex tw-items-center tw-justify-between tw-rounded-xl tw-px-3 tw-py-2.5 tw-text-[15px] tw-leading-6 tw-text-[#D5DEEE] tw-no-underline tw-transition-all tw-duration-150 hover:tw-bg-white/4 hover:tw-text-white"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>{item.label}</span>
                      <span className="tw-translate-x-[-4px] tw-text-[#7BE7C7] tw-opacity-0 tw-transition-all tw-duration-150 group-hover:tw-translate-x-0 group-hover:tw-opacity-100">
                        {isExternalLink(item.to) ? '↗' : '→'}
                      </span>
                    </SmartLink>

                    {item.children?.length ? (
                      <ul className="tw-m-0 tw-ml-4 tw-mt-1 tw-list-none tw-border-l tw-border-white/10 tw-p-0 tw-pl-3">
                        {item.children.map((child) => (
                          <li
                            key={child.label}
                            className="tw-m-0 tw-list-none tw-p-0"
                          >
                            <SmartLink
                              to={child.to}
                              className="tw-block tw-rounded-lg tw-px-3 tw-py-2 tw-text-[14px] tw-leading-6 tw-text-[#AEBBD1] tw-no-underline tw-transition hover:tw-bg-white/4 hover:tw-text-white"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {child.label}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
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
    background:
      isActive || hoveredMobileItem === label ? '#11141d' : 'transparent',
  });

  const resetMobileMenus = () => {
    setIsMobileOpen(false);
    setOpenMobileMenu(null);
    setHoveredMobileItem(null);
  };

  return (
    <>
      <div
        className="navbar"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '80px',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      />

      <header className="tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-[#1f2128] tw-bg-[#090b10]/95 tw-backdrop-blur">
        <div className="tw-mx-auto tw-flex tw-h-20 tw-max-w-[1320px] tw-items-center tw-px-6 lg:tw-px-10">
          <Link to="/" className="tw-shrink-0" aria-label="Weaviate home">
            <img
              src="/img/site/2026/weaviate-logo-2-colours-dark-green.svg"
              alt="Weaviate"
              className="tw-h-5 tw-w-auto"
            />
          </Link>

          <nav className="tw-ml-auto tw-hidden tw-flex-1 tw-justify-center xl:tw-flex">
            <ul className="tw-m-0 tw-flex tw-list-none tw-items-center tw-gap-2 tw-p-0">
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
                      className={`tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-px-4 tw-py-2.5 tw-text-[14px] tw-font-normal tw-no-underline tw-transition-all tw-duration-150 ${
                        isOpen
                          ? 'tw-bg-white/6 tw-text-white'
                          : 'tw-text-[#B9C8DE] hover:tw-bg-white/4 hover:tw-text-white'
                      }`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '163.8%',
                      }}
                    >
                      {link.label}
                      {link.showCaret ? (
                        <span
                          className={`tw-text-[10px] tw-transition-transform tw-duration-150 ${
                            isOpen
                              ? 'tw-rotate-180 tw-text-white'
                              : 'tw-text-[#8b95ad]'
                          }`}
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      ) : null}
                    </Link>

                    {hasMenu && isOpen ? (
                      <MegaMenu
                        sections={navGroups[link.label]}
                        menuLabel={link.label}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="tw-ml-auto tw-hidden tw-items-center tw-gap-8 lg:tw-ml-0 xl:tw-flex">
            <a
              href="https://github.com/weaviate/weaviate"
              target="_blank"
              rel="noreferrer"
              className="tw-inline-flex tw-h-5 tw-w-5 tw-items-center tw-justify-center tw-text-[#B9C8DE] tw-transition hover:tw-text-white"
              aria-label="GitHub"
            >
              <i
                className="fa-brands fa-github tw-text-[18px]"
                aria-hidden="true"
              />
            </a>

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
                if (!next) setOpenMobileMenu(null);
                return next;
              });
            }}
            className="tw-ml-auto tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-[12px] tw-border tw-border-white/10 tw-bg-[#12161f] tw-text-[#B9C8DE] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] tw-transition hover:tw-border-white/15 hover:tw-text-white xl:tw-hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span className="tw-text-[22px] tw-leading-none">
              {isMobileOpen ? '×' : '☰'}
            </span>
          </button>
        </div>

        {isMobileOpen ? (
          <div
            className="tw-relative tw-max-h-[calc(100vh-80px)] tw-overflow-y-auto tw-overscroll-contain tw-border-t tw-border-[#1f2128] tw-bg-[#090b10] xl:tw-hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="tw-mx-auto tw-max-w-[1320px] tw-space-y-2 tw-px-6 tw-py-5 tw-pb-10">
              {mainLinks.map((link) => {
                const hasMenu = !!navGroups[link.label];
                const isExpanded = openMobileMenu === link.label;

                if (!hasMenu) {
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-no-underline tw-transition"
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
                      className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-left tw-transition"
                      style={{
                        ...getMobileItemStyles(link.label, isExpanded),
                        border: 'none',
                      }}
                      aria-expanded={isExpanded}
                    >
                      <span className="tw-text-[16px] tw-font-medium">
                        {link.label}
                      </span>
                      <span
                        className={`tw-ml-2 tw-text-[12px] tw-transition-transform tw-duration-200 ${
                          isExpanded ? 'tw-rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </button>

                    {isExpanded ? (
                      <div className="tw-mt-2 tw-space-y-4 tw-rounded-[14px] tw-bg-[#0d1119] tw-px-4 tw-py-4">
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
                              {section.items.map((item) => (
                                <div key={item.label}>
                                  <SmartLink
                                    to={item.to}
                                    className="tw-flex tw-items-center tw-justify-between tw-rounded-[10px] tw-px-3 tw-py-2.5 tw-text-[14px] tw-text-[#C8D3E6] tw-no-underline tw-transition hover:tw-bg-white/4 hover:tw-text-white"
                                    onClick={resetMobileMenus}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    <span>{item.label}</span>
                                    <span className="tw-text-[#7BE7C7]">
                                      {isExternalLink(item.to) ? '↗' : '→'}
                                    </span>
                                  </SmartLink>

                                  {item.children?.length ? (
                                    <div className="tw-ml-4 tw-mt-1 tw-border-l tw-border-white/10 tw-pl-3">
                                      {item.children.map((child) => (
                                        <SmartLink
                                          key={child.label}
                                          to={child.to}
                                          className="tw-block tw-rounded-[10px] tw-px-3 tw-py-2 tw-text-[13px] tw-text-[#AEBBD1] tw-no-underline tw-transition hover:tw-bg-white/4 hover:tw-text-white"
                                          onClick={resetMobileMenus}
                                          style={{
                                            fontFamily: 'Inter, sans-serif',
                                          }}
                                        >
                                          {child.label}
                                        </SmartLink>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              <div className="tw-mt-3 tw-border-t tw-border-[#1f2128] tw-pt-3">
                <SmartLink
                  to="https://github.com/weaviate/weaviate"
                  className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#d7ddeb] tw-no-underline tw-transition"
                  onClick={resetMobileMenus}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  GitHub
                </SmartLink>

                <Link
                  to="/contact"
                  className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#d7ddeb] tw-no-underline tw-transition"
                  onClick={resetMobileMenus}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact
                </Link>

                <Link
                  to="/go/console"
                  className="tw-block tw-rounded-[14px] tw-px-4 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#d7ddeb] tw-no-underline tw-transition"
                  onClick={resetMobileMenus}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Log in
                </Link>

                <Link
                  to="/go/console"
                  className="tw-mx-auto tw-mt-4 tw-flex tw-w-[86%] tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#6BE38C] tw-px-5 tw-py-3 tw-text-base tw-font-semibold tw-text-[#081012] tw-no-underline"
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
    </>
  );
}