import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';

const footerGroups = {
  Product: [
    { label: 'Vector Database', to: '/platform' },
    { label: 'Embeddings', to: '/product/embeddings' },
    { label: 'Query Agent', to: '/product/query-agent' },
    { label: 'Integrations', to: '/product/integrations' },
    { label: 'Engram', to: '/product/engram' },
    { label: 'Product Previews', to: '/product-previews' },
    { label: 'Shared Cloud', to: '/deployment/shared' },
    { label: 'Dedicated Cloud', to: '/deployment/dedicated' },
    { label: 'Weaviate Assurance', to: '/product/assurance' },
    { label: 'DigitalOcean', to: '/product/digitalocean-managed-weaviate' },
    { label: 'Pricing', to: '/pricing' },
  ],
  Solutions: [
    { label: 'RAG', to: '/rag' },
    { label: 'Hybrid Search', to: '/hybrid-search' },
    { label: 'Agentic AI', to: '/agentic-ai' },
    { label: 'Cost Performance Optimization', to: '/cost-performance-optimization' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Weaviate Playground', to: 'https://playground.weaviate.io/' },
  ],
  Developers: [
    { label: 'Weaviate Database Docs', to: 'https://docs.weaviate.io/weaviate' },
    { label: 'Weaviate Cloud Docs', to: 'https://docs.weaviate.io/cloud' },
    { label: 'Weaviate Deployment Docs', to: 'https://docs.weaviate.io/deploy' },
    { label: 'Weaviate Agents Docs', to: 'https://docs.weaviate.io/agents' },
    { label: 'LLM / Agent guides', to: 'https://weaviate.io/llms.txt' },
    { label: 'GitHub', to: 'https://github.com/weaviate/weaviate' },
    { label: 'Learning Center', to: '/learn' },
    { label: 'Blog', to: '/blog' },
    { label: 'Academy', to: 'https://academy.weaviate.io/' },
    { label: 'Knowledge Cards', to: '/learn/knowledgecards' },
    { label: 'Paper Reviews', to: '/papers' },
    { label: 'Podcasts', to: '/podcast' },
    { label: 'Events & Webinars', to: '/community/events' },
    { label: 'Weaviate Hero Program', to: '/community' },
    { label: 'Forum', to: 'https://forum.weaviate.io/' },
  ],
  Company: [
    { label: 'Company', to: '/company/about-us' },
    { label: 'Careers', to: '/company/careers' },
    { label: 'Remote', to: '/company/remote' },
    { label: 'Playbook', to: '/company/playbook' },
    { label: 'Investors', to: '/company/investors' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Partners Overview', to: '/partners' },
    { label: 'AWS', to: '/partners/aws' },
    { label: 'Google Cloud', to: '/partners/gcp' },
    { label: 'Snowflake', to: '/partners/snowflake' },
    { label: 'Databricks', to: '/partners/databricks' },
    { label: 'Security', to: '/security' },
    { label: 'Terms & Policies', to: '/service' },
    { label: 'Report a Vulnerability', to: '/security-report' },
  ],
};

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/weaviate/weaviate',
    image: '/img/site/2026/github-logo.svg',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@Weaviate',
    image: '/img/site/2026/youtube-logo.svg',
  },
  {
    label: 'Community',
    href: '/community',
    icon: 'fa-regular fa-book-open',
  },
  {
    label: 'X',
    href: 'https://x.com/weaviate_io',
    image: '/img/site/2026/x-logo.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/weaviate-io',
    image: '/img/site/2026/linkedin-logo.svg',
  },
];

const BEEHIIV_EMBED_URL =
  'https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true';

function CookieSettingsButton() {
  return (
    <button
      id="cookie-settings"
      type="button"
      className="tw-text-left tw-text-[14px] tw-leading-7 tw-text-[#B6BED0] tw-transition hover:tw-text-white"
      style={{
        fontFamily: 'Inter, sans-serif',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      Cookie Settings
    </button>
  );
}

function FooterLink({ item }) {
  const isExternal = item.to.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={item.to}
        target="_blank"
        rel="noreferrer"
        className="tw-text-[14px] tw-leading-7 tw-text-[#B6BED0] tw-transition hover:tw-text-white"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      className="tw-text-[14px] tw-leading-7 tw-text-[#B6BED0] tw-transition hover:tw-text-white"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {item.label}
    </Link>
  );
}

function LinkGroup({ title, items }) {
  return (
    <div>
      <p
        className="tw-mb-3 tw-text-[20px] tw-font-semibold"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          background: 'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </p>
      <div className="tw-flex tw-flex-col">
        {items.map((item) => (
          <FooterLink key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  useEffect(() => {
    const cookieBtn = document.getElementById('cookie-settings');

    const handleClick = () => {
      if (window.Cookiebot) {
        window.Cookiebot.renew();
      } else {
        console.warn('Cookiebot is not loaded.');
      }
    };

    if (cookieBtn) {
      cookieBtn.addEventListener('click', handleClick);
    }

    return () => {
      if (cookieBtn) {
        cookieBtn.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <footer className="tw-border-t tw-border-[#1f2128] tw-bg-[#090b10] tw-py-14 md:tw-py-16">
      <div className="tw-mx-auto tw-grid tw-max-w-[1320px] tw-gap-12 tw-px-6 lg:tw-grid-cols-[420px_minmax(0,1fr)] lg:tw-gap-14 lg:tw-px-10">
        <div>
          <Link to="/" className="tw-inline-block" aria-label="Weaviate home">
            <img
              src="/img/site/2026/weaviate-logo-2-colours-dark-green.svg"
              alt="Weaviate"
              className="tw-h-4 tw-w-auto"
            />
          </Link>

          <div
            className="tw-mt-8 tw-text-[1.125rem] tw-font-semibold tw-leading-tight"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#DDEBF2',
            }}
          >
            Get the developer newsletter
          </div>

          <p
            className="tw-mt-4 tw-max-w-[360px] tw-text-[14px] tw-leading-6 tw-text-[#B9C8DE]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Product updates, how-tos, community spotlights, and more. Delivered monthly to your inbox.
          </p>

          <div className="tw-mt-6 tw-max-w-[400px] tw-overflow-hidden tw-rounded-xl tw-border tw-border-[#2a2f3f] tw-bg-[#05070b]">
            <iframe
              src={BEEHIIV_EMBED_URL}
              title="Newsletter signup"
              data-test-id="beehiiv-embed"
              frameBorder="0"
              scrolling="no"
              className="tw-h-[53px] tw-w-full"
              style={{ margin: 0, backgroundColor: 'transparent' }}
            ></iframe>
          </div>

          <p
            className="tw-mt-4 tw-max-w-[400px] tw-text-[13px] tw-leading-6 tw-text-[#8A93A9]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Please provide your email address if you&apos;d like to receive our monthly developer newsletter. You can unsubscribe at any time.
          </p>

          <div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="tw-inline-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-[#343b4f] tw-bg-[#0b0e15] tw-text-[#D5DCEE] tw-transition hover:tw-border-[#4a536b] hover:tw-text-white"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={item.label}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="tw-h-5 tw-w-5 tw-object-contain"
                  />
                ) : (
                  <i className={item.icon} aria-hidden="true" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="tw-grid tw-gap-10 md:tw-grid-cols-2 xl:tw-grid-cols-4">
          <LinkGroup title="Product" items={footerGroups.Product} />
          <LinkGroup title="Solutions" items={footerGroups.Solutions} />
          <LinkGroup title="Developers" items={footerGroups.Developers} />
          <div className="tw-space-y-9">
            <LinkGroup title="Company" items={footerGroups.Company} />
            <div>
              <p
                className="tw-mb-3 tw-text-[20px] tw-font-semibold"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: 'linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Preferences
              </p>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}