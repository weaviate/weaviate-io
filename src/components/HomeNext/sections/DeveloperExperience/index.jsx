import Link from '@docusaurus/Link';
import React, { useMemo, useState } from 'react';
import CodeTabs from '../CodeBlock';

const PANEL_MIN_HEIGHT = 630;

const navItems = [
  {
    id: 'quickstart',
    title: 'Quickstart',
    icon: '/img/site/2026/Quickstart-2.svg',
    iconActive: '/img/site/2026/Quickstart.svg',
    iconPressed: '/img/site/2026/Quickstart-3.svg',
    description:
      'Use SDKs for Python, Go, TypeScript, or JavaScript, or connect to GraphQL or REST APIs.',
  },
  {
    id: 'agent-skills',
    title: 'Agent Skills',
    icon: '/img/site/2026/Agent-Skills-2.svg',
    iconActive: '/img/site/2026/Agent-Skills.svg',
    iconPressed: '/img/site/2026/Agent-Skills-3.svg',
    description:
      'Ship adaptive workflows with built-in skills and contextual memory.',
  },
  {
    id: 'cloud-tools',
    title: 'Cloud Console & Tools',
    icon: '/img/site/2026/Cloud-Tools-2.svg',
    iconActive: '/img/site/2026/Cloud-Tools.svg',
    iconPressed: '/img/site/2026/Cloud-Tools-3.svg',
    description:
      'Manage your data directly in Cloud Console. Simplify development and confidently deploy enterprise-ready AI applications.',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: '/img/site/2026/Deployment-2.svg',
    iconActive: '/img/site/2026/Deployment.svg',
    iconPressed: '/img/site/2026/Deployment-3.svg',
    description:
      'Run shared, dedicated, or self-hosted based on your compliance needs.',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: '/img/site/2026/Integrations-2.svg',
    iconActive: '/img/site/2026/Integrations.svg',
    iconPressed: '/img/site/2026/Integrations-3.svg',
    description:
      'Connect model providers, orchestration frameworks, and data pipelines.',
  },
  {
    id: 'developer-resources',
    title: 'Developer Resources',
    icon: '/img/site/2026/Developer-Resources-2.svg',
    iconActive: '/img/site/2026/Developer-Resources.svg',
    iconPressed: '/img/site/2026/Developer-Resources-3.svg',
    description:
      'Docs, tutorials, examples, and learning tracks for every team stage.',
  },
  {
    id: 'demos',
    title: 'Explore Demos',
    icon: '/img/site/2026/Explore-Demos-2.svg',
    iconActive: '/img/site/2026/Explore-Demos.svg',
    iconPressed: '/img/site/2026/Explore-Demos-3.svg',
    description:
      "Check out our favorite Weaviate projects! We've hand picked the best to showcase AI innovation and creativity.",
  },
];

function PanelShell({ children }) {
  return (
    <div className="tw-relative tw-min-h-[420px] tw-overflow-hidden tw-rounded-[28px] tw-border tw-border-[#2a2f3f] tw-bg-[#14161c] tw-shadow-[0_24px_80px_rgba(0,0,0,0.34)] lg:tw-min-h-[630px]">
      <div className="panel-fade-in tw-h-full tw-bg-[#14161c]">{children}</div>
    </div>
  );
}

function panelBaseStyle(backgroundImage) {
  return {
    backgroundColor: '#14161c',
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
}

function QuickstartPanel() {
  return (
    <div
      className="tw-relative tw-flex tw-min-h-[420px] lg:tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(48deg, rgb(0 254 107 / 30%) 13.81%, rgb(0 183 226 / 30%) 92.18%), url('/img/site/2026/quickstart-bg.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-w-full tw-max-w-[720px] tw-rounded-[24px] tw-border tw-border-[#241d31] tw-bg-[#130d1d]/95 tw-shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <CodeTabs />
        </div>
      </div>
    </div>
  );
}

function AgentSkillsPanel() {
  return (
    <div
      className="tw-relative tw-flex tw-min-h-[420px] lg:tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(123deg, rgba(38,214,255,0.22) 12.44%, rgba(215,122,255,0.22) 109.26%), url('/img/site/2026/agents-devex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-w-full tw-max-w-[760px]">
          <div className="tw-overflow-hidden tw-rounded-[20px] tw-border tw-border-[#1f2532] tw-bg-[#141414] tw-shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
            <div className="tw-relative tw-aspect-[16/10] tw-w-full tw-bg-[#111]">
              <video
                className="tw-h-full tw-w-full tw-object-cover tw-bg-[#111]"
                controls
                preload="none"
                poster="/img/site/2026/agent-skills-demo.png"
              >
                <source
                  src="/img/site/2026/agent-skills-demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.12)_100%)]" />
            </div>
          </div>

          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            <Link
              to="/blog/weaviate-agent-skills"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#DDEBF2] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#111111] tw-no-underline tw-transition hover:tw-opacity-90"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Explore Skills
            </Link>

            <Link
              to="https://docs.weaviate.io/agents"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#111111] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#DDEBF2] tw-no-underline tw-transition hover:tw-bg-[#1b1b1b]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Prompt library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideflowEmbed({ iframeId = 'dr973w8bnp' }) {
  React.useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://app.guideflow.com/assets/opt.js"]',
    );

    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://app.guideflow.com/assets/opt.js';
      s.async = true;
      s.setAttribute('data-cookieconsent', 'ignore');
      s.setAttribute('data-iframe-id', iframeId);
      document.body.appendChild(s);
    } else {
      existing.setAttribute('data-iframe-id', iframeId);
      window.dispatchEvent(new Event('guideflow:check'));
    }
  }, [iframeId]);

  return (
    <div className="tw-relative tw-w-full tw-overflow-hidden tw-rounded-[16px] tw-border tw-border-white/10 tw-bg-[#0E1420] tw-shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
      <div className="tw-aspect-[16/9] tw-w-full tw-bg-[#0E1420]">
        <iframe
          id={iframeId}
          src={`https://app.guideflow.com/embed/${iframeId}`}
          title="Guideflow walkthrough"
          allow="clipboard-read; clipboard-write"
          allowFullScreen
          className="tw-h-full tw-w-full tw-border-0 tw-bg-[#0E1420]"
        />
      </div>
    </div>
  );
}

function CloudToolsPanel() {
  return (
    <div
      className="tw-relative tw-flex tw-min-h-[420px] lg:tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(48deg, rgb(0 254 107 / 22%) 13.81%, rgb(0 183 226 / 22%) 92.18%), url('/img/site/2026/cloud-devex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-w-full tw-max-w-[880px]">
          <GuideflowEmbed iframeId="dr973w8bnp" />

          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            <Link
              to="/go/console"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#DDEBF2] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#111111] tw-no-underline tw-transition hover:tw-opacity-90"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Try Cloud Console
            </Link>

            <Link
              to="https://docs.weaviate.io/cloud"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#111111] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#DDEBF2] tw-no-underline tw-transition hover:tw-bg-[#1b1b1b]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cloud Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeploymentPanel() {
  const sharedCloud = [
    'Fully-managed SaaS on shared infrastructure',
    'Automatic scalability based on vector memory',
    'Simple one-click cluster management',
    'Consumption-based pricing (vector dimensions, storage, backups)',
    'Available across five cloud regions',
    '99.5% - 99.9% uptime SLA',
  ];

  const dedicatedCloud = [
    'Dedicated instance with isolated infrastructure',
    'Enhanced security and compliance (SOC II, HIPAA)',
    'Predictable performance with dedicated resources',
    '99.9% - 99.95% uptime SLA',
    'Dedicated Success Manager included',
    '24/7 professional support',
  ];

  return (
    <div
      className="tw-relative tw-flex tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(135deg, rgba(124,123,255,0.25) 0%, rgba(168,85,247,0.25) 100%), url('/img/site/2026/deployment-devex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.12)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-grid tw-w-full tw-max-w-[900px] tw-items-stretch tw-gap-6 md:tw-grid-cols-2">
          <div className="tw-flex tw-h-full tw-flex-col tw-rounded-[24px] tw-border tw-border-white/15 tw-bg-[#141414] tw-p-6 tw-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="tw-rounded-[16px] tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-p-4">
              <h3
                className="tw-m-0 tw-text-[20px] tw-font-semibold tw-text-[#111]"
                style={{ fontWeight: 700, lineHeight: '130%', color: '#111' }}
              >
                Shared Cloud
              </h3>
            </div>

            <div className="tw-mt-6 tw-flex-1 tw-space-y-4">
              {sharedCloud.map((item) => (
                <div key={item} className="tw-flex tw-items-start tw-gap-3">
                  <span className="tw-mt-1 tw-inline-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[4px] tw-text-[#081012]">
                    <img
                      src="/img/site/2026/byoc-tick.svg"
                      width="16"
                      height="16"
                      loading="lazy"
                      decoding="async"
                      alt=""
                      aria-hidden="true"
                      className="tw-h-4 tw-w-4"
                    />
                  </span>
                  <p className="tw-m-0 tw-text-[14px] tw-leading-6 tw-text-[#DDEBF2]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/go/console"
              className="tw-mt-6 tw-block tw-w-full tw-rounded-[10px] tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-py-3 tw-text-center tw-text-[15px] tw-font-semibold tw-text-[#081012] tw-no-underline hover:tw-opacity-95"
            >
              Start building for free
            </Link>
          </div>

          <div className="tw-flex tw-h-full tw-flex-col tw-rounded-[24px] tw-border tw-border-white/15 tw-bg-[#141414] tw-p-6 tw-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="tw-rounded-[16px] tw-bg-[linear-gradient(123deg,#26D6FF_12.44%,#D77AFF_109.26%)] tw-p-4">
              <h3
                className="tw-m-0 tw-text-[20px] tw-font-semibold tw-text-[#111]"
                style={{ fontWeight: 700, lineHeight: '130%', color: '#111' }}
              >
                Dedicated Cloud
              </h3>
            </div>

            <div className="tw-mt-6 tw-flex-1 tw-space-y-4">
              {dedicatedCloud.map((item) => (
                <div key={item} className="tw-flex tw-items-start tw-gap-3">
                  <span className="tw-mt-1 tw-inline-flex tw-h-5 tw-w-5 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-[4px] tw-text-[#081012]">
                    <img
                      src="/img/site/2026/cloud-tick.svg"
                      alt=""
                      aria-hidden="true"
                      className="tw-h-4 tw-w-4"
                    />
                  </span>
                  <p className="tw-m-0 tw-text-[14px] tw-leading-6 tw-text-[#DDEBF2]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/pricing"
              className="tw-mt-6 tw-block tw-w-full tw-rounded-[10px] tw-bg-[linear-gradient(123deg,#26D6FF_12.44%,#D77AFF_109.26%)] tw-py-3 tw-text-center tw-text-[15px] tw-font-semibold tw-text-[#081012] tw-no-underline hover:tw-opacity-95"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsPanel() {
  return (
    <div
      className="tw-relative tw-flex tw-min-h-[420px] lg:tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(48deg, rgb(0 254 107 / 20%) 13.81%, rgb(0 183 226 / 20%) 92.18%), url('/img/site/2026/integrations-devrex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-w-full tw-max-w-[920px]">
          <div className="tw-flex tw-justify-center">
            <img
              src="/img/site/2026/integrations-devrex-diagram.png"
              alt="Weaviate integrations ecosystem diagram"
              width="880"
              height="500"
              loading="lazy"
              decoding="async"
              className="tw-h-auto tw-w-full tw-max-w-[880px] tw-object-contain"
            />
          </div>

          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            <Link
              to="/integrations"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#DDEBF2] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#111111] tw-no-underline tw-transition hover:tw-opacity-90"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Explore Integrations
            </Link>

            <Link
              to="https://docs.weaviate.io/weaviate/model-providers"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#111111] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#DDEBF2] tw-no-underline tw-transition hover:tw-bg-[#1b1b1b]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Model Providers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeveloperResourcesPanel() {
  const resources = [
    {
      title: 'Docs',
      desc: 'Find the right documentation and resources.',
      link: 'https://docs.weaviate.io',
    },
    {
      title: 'Academy',
      desc: 'Explore our comprehensive course library.',
      link: '/academy',
    },
    {
      title: 'Blog',
      desc: 'Read latest news and insights from our experts.',
      link: '/blog',
    },
    {
      title: 'Learn',
      desc: 'A learning resources hub for builders of all levels.',
      link: '/learn',
    },
    {
      title: 'Demos',
      desc: 'Example projects and demo apps built with Weaviate.',
      link: '/developers/weaviate/demos',
    },
    {
      title: 'Ebooks',
      desc: 'In-depth resources to help you deepen your knowledge.',
      link: '/ebooks',
    },
    {
      title: 'Podcast',
      desc: 'Interviews with industry leaders and experts.',
      link: '/podcast',
    },
    {
      title: 'Forum',
      desc: 'Share your experience and get help from community.',
      link: 'https://forum.weaviate.io',
    },
  ];

  return (
    <div
      className="tw-relative tw-flex tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(123deg, rgba(124,123,255,0.25) 0%, rgba(38,214,255,0.18) 100%), url('/img/site/2026/Developer-Resources-devrex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.12)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-grid tw-w-full tw-max-w-[920px] tw-gap-6 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
          {resources.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="tw-group tw-relative tw-flex tw-h-full tw-flex-col tw-justify-between tw-rounded-[20px] tw-bg-[linear-gradient(140deg,rgba(255,255,255,0.25),rgba(255,255,255,0.05))] tw-p-[1px] tw-shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] tw-transition tw-no-underline hover:tw-bg-[linear-gradient(140deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))]"
            >
              <div className="tw-h-full tw-rounded-[19px] tw-bg-[rgba(255,255,255,0.08)] tw-p-5 tw-backdrop-blur-md transition hover:tw-bg-[rgba(255,255,255,0.12)]">
                <div>
                  <div className="tw-mb-4 tw-inline-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg">
                    <img
                      src="/img/site/2026/Developer-Resources.svg"
                      alt=""
                      className="tw-h-8 tw-w-8"
                    />
                  </div>

                  <h3
                    className="tw-m-0 tw-text-[20px] tw-font-semibold tw-text-white"
                    style={{
                      color: '#ffffff',
                      fontWeight: 600,
                      lineHeight: '130%',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="tw-mt-2 tw-text-[14px] tw-leading-6 tw-text-[#d6def2]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemosPanel() {
  return (
    <div
      className="tw-relative tw-flex tw-min-h-[420px] lg:tw-min-h-[630px] tw-h-full tw-overflow-hidden tw-p-6 md:tw-p-8"
      style={panelBaseStyle(
        "linear-gradient(123deg, rgba(38,214,255,0.20) 0%, rgba(124,123,255,0.22) 100%), url('/img/site/2026/demos-devrex-panel.jpg')",
      )}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.10)_100%)]" />

      <div className="tw-relative tw-flex tw-w-full tw-items-center tw-justify-center">
        <div className="tw-w-full tw-max-w-[920px]">
          <div className="tw-flex tw-justify-center">
            <img
              src="/img/site/2026/demos-screenshot.png"
              alt="Weaviate Playground demos overview"
              width="880"
              height="500"
              loading="lazy"
              decoding="async"
              className="tw-h-auto tw-w-full tw-max-w-[600px] tw-object-contain"
            />
          </div>

          <div className="tw-mt-6 tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            <Link
              to="/developers/weaviate/demos"
              className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-[10px] tw-bg-[#111111] tw-px-8 tw-py-3 tw-text-[16px] tw-font-medium tw-text-[#DDEBF2] tw-no-underline tw-transition hover:tw-bg-[#1b1b1b]"
              style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
            >
              Visit Weaviate Playground to view all the demos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPanel({ title }) {
  return (
    <div className="tw-rounded-[24px] tw-border tw-border-[#2a2f3f] tw-bg-[#1A1A1A] tw-p-6 md:tw-p-8">
      <h3
        className="tw-m-0 tw-text-2xl tw-font-semibold tw-leading-tight tw-text-[#DDEBF2]"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          color: '#DDEBF2',
        }}
      >
        {title}
      </h3>

      <p
        className="tw-mt-4 tw-max-w-2xl tw-text-base tw-leading-8 tw-text-[#b7c2da]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Content.
      </p>
    </div>
  );
}

// Main layout changes only — keep your existing panel functions above this unchanged

export default function DeveloperExperience() {
  const [activeNav, setActiveNav] = useState(navItems[0].id);
  const [pressedNav, setPressedNav] = useState(null);

  const activeItem = useMemo(
    () => navItems.find((item) => item.id === activeNav) || navItems[0],
    [activeNav],
  );

  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-16 lg:tw-py-20">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <p
          className="tw-m-0 tw-mb-6 tw-text-[1rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em]"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: '#43E2C5',
          }}
        >
          DEVELOPER EXPERIENCE
        </p>

        <h2
          className="tw-mt-4 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] md:tw-text-[2.5rem]"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            color: '#DDEBF2',
          }}
        >
          Production-ready AI applications, faster
        </h2>

        <p
          className="tw-mt-5 tw-max-w-4xl tw-text-[18px] tw-leading-8 tw-text-[#B9C8DE]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Spin up a cluster, point it at your data, and go. Weaviate can take
          care of embeddings, ranking, and auto-scaling so you can ship
          features, not infrastructure.
        </p>

        {/* Mobile pill nav */}
        <div className="tw-mt-8 tw-flex tw-gap-3 tw-overflow-x-auto tw-pb-3 lg:tw-hidden">
          {navItems.map((item) => {
            const isActive = item.id === activeItem.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className="tw-flex tw-shrink-0 tw-items-center tw-gap-2 tw-rounded-full tw-border tw-px-4 tw-py-3 tw-text-sm tw-transition"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  borderColor: isActive ? '#68FFA8' : 'rgba(255,255,255,0.1)',
                  background: isActive ? '#11141d' : '#1A1A1A',
                  color: isActive ? '#68FFA8' : '#d0d8ea',
                }}
              >
                <img
                  src={isActive ? item.iconActive : item.icon}
                  alt=""
                  aria-hidden="true"
                  className="tw-h-5 tw-w-5"
                />
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="tw-mt-6 lg:tw-mt-10 lg:tw-grid lg:tw-items-start lg:tw-gap-6 lg:tw-grid-cols-[300px_minmax(0,1fr)] xl:tw-grid-cols-[312px_minmax(0,1fr)]">
          {/* Desktop side nav */}
          <div className="tw-hidden tw-space-y-3 lg:tw-block">
            {navItems.map((item) => {
              const isActive = item.id === activeItem.id;
              const isPressed = pressedNav === item.id;

              const currentIcon = isActive
                ? item.iconActive
                : isPressed
                  ? item.iconPressed
                  : item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  onMouseDown={() => setPressedNav(item.id)}
                  onMouseUp={() => setPressedNav(null)}
                  onMouseLeave={() => setPressedNav(null)}
                  className={`tw-group tw-w-full tw-rounded-[24px] tw-border tw-text-left tw-transition-all tw-duration-200 ${
                    isActive
                      ? 'tw-border-[#68FFA8]/70 tw-bg-[linear-gradient(180deg,#171a1f_0%,#131720_100%)] tw-px-6 tw-py-6 tw-shadow-[0_0_0_1px_rgba(104,255,168,0.08),0_18px_40px_rgba(0,0,0,0.18)]'
                      : 'tw-border-transparent tw-bg-[#1A1A1A] tw-px-5 tw-py-5 hover:tw-border-[#31384b] hover:tw-bg-[#1d1d1d]'
                  }`}
                >
                  {isActive ? (
                    <>
                      <div className="tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-[#2ecf95]/35">
                        <img
                          src={currentIcon}
                          alt=""
                          aria-hidden="true"
                          className="tw-h-6 tw-w-6 tw-object-contain"
                        />
                      </div>

                      <p
                        className="tw-m-0 tw-mt-4 tw-text-[18px] tw-font-semibold tw-leading-tight"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          color: '#DDEBF2',
                        }}
                      >
                        {item.title}
                      </p>

                      <p
                        className="tw-mt-2 tw-text-[14px] tw-leading-7 tw-text-[#b7c3db]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.description}
                      </p>
                    </>
                  ) : (
                    <div className="tw-flex tw-items-center tw-gap-4">
                      <div className="tw-inline-flex tw-h-11 tw-w-11 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-[#31384b] tw-transition-colors tw-duration-200 group-hover:tw-border-[#3d4760]">
                        <img
                          src={currentIcon}
                          alt=""
                          aria-hidden="true"
                          className="tw-h-6 tw-w-6 tw-object-contain"
                        />
                      </div>

                      <p
                        className="tw-m-0 tw-text-[16px] tw-font-normal tw-leading-tight tw-text-[#d0d8ea]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.title}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="tw-self-start lg:tw-sticky lg:tw-top-28">
            <PanelShell>
              {activeItem.id === 'quickstart' ? <QuickstartPanel /> : null}
              {activeItem.id === 'agent-skills' ? <AgentSkillsPanel /> : null}
              {activeItem.id === 'cloud-tools' ? <CloudToolsPanel /> : null}
              {activeItem.id === 'deployment' ? <DeploymentPanel /> : null}
              {activeItem.id === 'integrations' ? <IntegrationsPanel /> : null}
              {activeItem.id === 'demos' ? <DemosPanel /> : null}
              {activeItem.id === 'developer-resources' ? (
                <DeveloperResourcesPanel />
              ) : null}
            </PanelShell>
          </div>
        </div>
      </div>
    </section>
  );
}
