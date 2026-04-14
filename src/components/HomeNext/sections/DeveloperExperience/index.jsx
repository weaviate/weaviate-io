import Link from '@docusaurus/Link';
import React, { useMemo, useState } from 'react';

const navItems = [
  {
    id: 'quickstart',
    title: 'Quickstart',
    icon: '/img/site/2026/quickstart-icon.svg',
    iconActive: '/img/site/2026/quickstart-icon.svg',
    description:
      'Use SDKs for Python, Go, TypeScript, or JavaScript, or connect to GraphQL or REST APIs.',
  },
  {
    id: 'agent-skills',
    title: 'Agent Skills',
    icon: '/img/site/2026/query-agent-icon.svg',
    iconActive: '/img/site/2026/query-agent-icon.svg',
    description:
      'Ship adaptive workflows with built-in skills and contextual memory.',
  },
  {
    id: 'cloud-tools',
    title: 'Cloud Tools',
    icon: '/img/site/2026/vector-database-icon.svg',
    iconActive: '/img/site/2026/vector-database-icon.svg',
    description:
      'Manage clusters, observability, and access from a unified workspace.',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: '/img/site/2026/engram-icon.svg',
    iconActive: '/img/site/2026/engram-icon.svg',
    description:
      'Run shared, dedicated, or self-hosted based on your compliance needs.',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: '/img/site/2026/embeddings-icon.svg',
    iconActive: '/img/site/2026/embeddings-icon.svg',
    description:
      'Connect model providers, orchestration frameworks, and data pipelines.',
  },
  {
    id: 'developer-resources',
    title: 'Developer Resources',
    icon: '/img/site/2026/query-agent-icon.svg',
    iconActive: '/img/site/2026/query-agent-icon.svg',
    description:
      'Docs, tutorials, examples, and learning tracks for every team stage.',
  },
];

const codeTabs = [
  {
    id: 'search',
    label: 'SEARCH',
    code: `# Select collection
collection = client.collections.get("SupportTickets")

# Pure vector search
response = collection.query.near_vector(
    near_vector=[0.1, 0.1, 0.1],
    limit=5
)

# Semantic search
response = collection.query.near_text(
    query="login issues after OS upgrade",
    limit=5
)

# Hybrid search (vector + keyword)
response = collection.query.hybrid(
    query="login issues after OS upgrade",
    alpha=0.75,
    limit=5
)`,
  },
  {
    id: 'vectorize',
    label: 'VECTORIZER',
    code: `collection = client.collections.create(
    name="SupportTickets",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(
        model="text-embedding-3-large"
    )
)

collection.data.insert_many([
    {"title": "Login issue", "body": "MFA fails on iOS"},
    {"title": "Billing question", "body": "Invoice mismatch in March"}
])`,
  },
  {
    id: 'rag',
    label: 'RAG',
    code: `result = collection.generate.near_text(
    query="Summarize unresolved support issues",
    grouped_task="Create a concise digest for support leadership",
    limit=6
)

print(result.generated)`,
  },
  {
    id: 'tenants',
    label: 'TENANTS',
    code: `collection.tenants.create([
    Tenant(name="acme"),
    Tenant(name="globex")
])

acme = client.collections.use("SupportTickets", tenant="acme")
globex = client.collections.use("SupportTickets", tenant="globex")`,
  },
  {
    id: 'index',
    label: 'INDEX',
    code: `collection = client.collections.create(
    name="SupportTickets",
    vector_index_config=Configure.VectorIndex.hnsw(
        ef_construction=256,
        max_connections=64
    ),
    inverted_index_config=Configure.InvertedIndex(
        bm25_k1=1.2,
        bm25_b=0.75
    )
)`,
  },
  {
    id: 'agents',
    label: 'AGENTS',
    code: `assistant = client.agents.create(
    name="SupportTriage",
    skills=["query", "summarize", "route"],
    memory=MemoryConfig(window="30d")
)

assistant.run("Route urgent OAuth incidents to engineering")`,
  },
];

function QuickstartPanel() {
  const [activeCodeTab, setActiveCodeTab] = useState(codeTabs[0].id);

  const selectedTab = useMemo(
    () => codeTabs.find((tab) => tab.id === activeCodeTab) || codeTabs[0],
    [activeCodeTab],
  );

  return (
    <div className="tw-space-y-4">
      <div
        className="tw-relative tw-overflow-hidden tw-rounded-[24px] tw-border tw-border-[#2a2f3f]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,14,22,0.22) 0%, rgba(10,14,22,0.18) 100%), url('/img/site/2026/quickstart-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="tw-p-4 md:tw-p-6 lg:tw-p-7">
          <div className="tw-ml-0 md:tw-ml-8 lg:tw-ml-10 tw-max-w-[640px] tw-overflow-hidden tw-rounded-[22px] tw-border tw-border-[#241f31] tw-bg-[#130d1d]/96 tw-shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="tw-flex tw-flex-wrap tw-gap-2 tw-border-b tw-border-[#2b2437] tw-px-4 tw-py-3 md:tw-gap-3 md:tw-px-5">
              {codeTabs.map((tab) => {
                const isActive = tab.id === selectedTab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCodeTab(tab.id)}
                    className={`tw-rounded-md tw-border tw-px-3 tw-py-1.5 tw-text-[11px] tw-font-semibold tw-tracking-[0.06em] tw-transition md:tw-text-xs ${
                      isActive
                        ? 'tw-border-[#2ecf95]/35 tw-bg-[#11151d] tw-text-[#7cf09f]'
                        : 'tw-border-[#d9dde4]/20 tw-bg-[#f3f5f8] tw-text-[#7f8ca6] hover:tw-text-[#59657e]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <pre className="tw-m-0 tw-overflow-x-auto tw-bg-transparent tw-px-5 tw-py-5 md:tw-px-6 md:tw-py-6">
              <code
                className="tw-text-[14px] tw-leading-8 tw-text-[#d6dff0]"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
                }}
              >
                {selectedTab.code}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="tw-flex tw-flex-wrap tw-gap-3">
        <Link
          to="/go/console"
          className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#63e689] tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-[#0a1512] tw-no-underline tw-transition hover:tw-bg-[#7df09d]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Try Weaviate Cloud
        </Link>

        <Link
          to="https://docs.weaviate.io/weaviate/quickstart"
          className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-lg tw-border tw-border-[#39425b] tw-bg-transparent tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-[#d6ddef] tw-no-underline tw-transition hover:tw-border-[#4a5574] hover:tw-text-white"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Weaviate Quickstart
        </Link>
      </div>
    </div>
  );
}

function AgentSkillsPanel() {
  return (
    <div className="tw-rounded-[24px] tw-border tw-border-[#2a2f3f] tw-bg-[#111622] tw-p-6 md:tw-p-8">
      <h3
        className="tw-m-0 tw-text-2xl tw-font-semibold tw-leading-tight tw-text-[#e7effa]"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        Agent Skills for production workflows
      </h3>

      <p
        className="tw-mt-4 tw-max-w-3xl tw-text-base tw-leading-8 tw-text-[#b7c2da]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Build robust AI systems with reusable skill primitives for retrieval,
        personalization, and orchestration. Start with proven patterns, then
        tailor behavior to your data and stack.
      </p>

      <div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-3">
        <Link
          to="/blog/weaviate-agent-skills"
          className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-lg tw-bg-[#63e689] tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-[#0a1512] tw-no-underline tw-transition hover:tw-bg-[#7df09d]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Explore Agent Skills
        </Link>

        <Link
          to="https://docs.weaviate.io/agents"
          className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-lg tw-border tw-border-[#39425b] tw-bg-transparent tw-px-6 tw-py-3 tw-text-sm tw-font-semibold tw-text-[#d6ddef] tw-no-underline tw-transition hover:tw-border-[#4a5574] hover:tw-text-white"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Read Agent Docs
        </Link>
      </div>
    </div>
  );
}

function PlaceholderPanel({ title }) {
  return (
    <div className="tw-rounded-[24px] tw-border tw-border-[#2a2f3f] tw-bg-[#111622] tw-p-6 md:tw-p-8">
      <h3
        className="tw-m-0 tw-text-2xl tw-font-semibold tw-leading-tight tw-text-[#e7effa]"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        {title}
      </h3>

      <p
        className="tw-mt-4 tw-max-w-2xl tw-text-base tw-leading-8 tw-text-[#b7c2da]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Content for this panel is coming in the next pass. Start with Quickstart
        or Agent Skills to preview the new interaction model.
      </p>
    </div>
  );
}

export default function DeveloperExperience() {
  const [activeNav, setActiveNav] = useState(navItems[0].id);

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
          className="tw-mt-4 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08] tw-text-white md:tw-text-[2.5rem]"
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

        <div className="tw-mt-10 tw-grid tw-gap-6 lg:tw-grid-cols-[280px_minmax(0,1fr)] xl:tw-grid-cols-[300px_minmax(0,1fr)]">
          <div className="tw-space-y-3">
            {navItems.map((item) => {
              const isActive = item.id === activeItem.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`tw-w-full tw-rounded-2xl tw-border tw-text-left tw-transition ${
                    isActive
                      ? 'tw-border-[#2ecf95] tw-bg-[linear-gradient(180deg,#171a1f_0%,#131720_100%)] tw-px-5 tw-py-5'
                      : 'tw-border-[#2a2f3f] tw-bg-[#15171b] tw-px-4 tw-py-4 hover:tw-border-[#3c445a]'
                  }`}
                >
                  {isActive ? (
                    <>
                      <div className="tw-inline-flex tw-h-11 tw-w-11 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-[#2ecf95]/40 tw-bg-[#11151c]">
                        <img
                          src={item.iconActive}
                          alt=""
                          aria-hidden="true"
                          className="tw-h-5 tw-w-5 tw-object-contain"
                        />
                      </div>

                      <p
                        className="tw-m-0 tw-mt-4 tw-text-[18px] tw-font-semibold tw-leading-tight tw-text-[#edf4ff]"
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
                      <div className="tw-inline-flex tw-h-10 tw-w-10 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-[#31384b] tw-bg-[#0f1520]">
                        <img
                          src={item.icon}
                          alt=""
                          aria-hidden="true"
                          className="tw-h-5 tw-w-5 tw-object-contain"
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

          <div>
            {activeItem.id === 'quickstart' ? <QuickstartPanel /> : null}
            {activeItem.id === 'agent-skills' ? <AgentSkillsPanel /> : null}
            {activeItem.id !== 'quickstart' &&
            activeItem.id !== 'agent-skills' ? (
              <PlaceholderPanel title={activeItem.title} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
