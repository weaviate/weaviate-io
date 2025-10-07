import React from 'react';
import Layout from '@theme/Layout';
import partners from '/data/partners.json';
import hub from '/src/components/PartnersMarketplace/styles.module.scss';
import css from '/src/components/PartnersMarketplace/IntegrationDetail/styles.module.scss';
import IntegrationHeader from '/src/components/PartnersMarketplace/IntegrationDetail/Header';

const slug = 'google-cloud-platform';
const getSlug = (s) => s.toLowerCase().replace(/\s+/g, '-');

export default function GcpIntegrationPage() {
  const item = partners.find((p) => getSlug(p.name) === slug);
  if (!item) {
    return (
      <Layout title="Not found">
        <div className="container">
          <p>Integration not found.</p>
        </div>
      </Layout>
    );
  }

  const {
    name,
    image,
    description,
    tags = [],
    link,
    overview = 'Full overview text…',
    resources = [],
    resourcesGroups = [],
  } = item;

  const ctas = item.ctas || item.cta || [];

  return (
    <div className="custom-page noBG">
      <Layout title={`${name} Integration`} description={description}>
        <IntegrationHeader
          name={name}
          image={image}
          description={description}
          tags={tags}
          docsUrl={link}
          ctas={ctas}
        />

        <div className={css.pageBg}>
          <div className="container">
            <div className={hub.cardsFilterContainer}>
              <nav className={`${hub.sideFilter} ${css.sideNav}`}>
                <h3>On this page</h3>
                <ul>
                  <li>
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#how-it-works">How it works</a>
                  </li>
                  <li>
                    <a href="#setup">Setup</a>
                  </li>
                  <li>
                    <a href="#resources">Resources</a>
                  </li>
                </ul>
              </nav>
              <main className={hub.mainContent}>
                <div className={css.panelGrid}>
                  {/* Overview */}
                  <section id="overview" className={`${hub.card} ${css.panel}`}>
                    <h2 className={css.panelTitle}>Overview</h2>
                    <p>{overview}</p>
                  </section>
                  <section
                    id="how-it-works"
                    className={`${hub.card} ${css.panel}`}
                  >
                    <h2 className={css.panelTitle}>How it works</h2>
                    <p>
                      Explain marketplaces, auth, endpoints, and typical data
                      flow between Weaviate and GCP services (Vertex AI, AI
                      Studio). Replace this with your copy.
                    </p>
                  </section>
                  <section
                    id="setup"
                    className={`${hub.card} ${css.panel} ${css.panelWide}`}
                  >
                    <h2 className={css.panelTitle}>Setup</h2>
                    <ol className={css.steps}>
                      <li>Deploy Weaviate via GCP Marketplace.</li>
                      <li>Configure networking & credentials.</li>
                      <li>Connect to Vertex AI / AI Studio and test.</li>
                    </ol>
                  </section>

                  <section
                    id="resources"
                    className={`${css.section} ${css.panelWide}`}
                  >
                    <h2>Resources</h2>
                    <h3 className={css.groupLabel}>Hands-on Learning</h3>
                    <div className={css.resGrid}>
                      {[
                        {
                          title:
                            'Build a multimodal application using Gemini Flash',
                          desc: 'Use Weaviate and Gemini Flash to build a multimodal application.',
                          type: 'Notebook',
                          url: '#',
                        },
                        {
                          title: 'BigQuery and Weaviate',
                          desc: 'Sync data between BigQuery and Weaviate using DSPy.',
                          type: 'Notebook',
                          url: '#',
                        },
                        {
                          title: 'Semantic Search with Gemini Ultra',
                          desc: 'How to use Weaviate and Gemini Ultra for semantic search.',
                          type: 'Notebook',
                          url: '#',
                        },
                        {
                          title: 'Weaviate Query Agent with Gemini API',
                          desc: 'Use the Query Agent as a tool with the Gemini API.',
                          type: 'Notebook',
                          url: '#',
                        },
                        {
                          title: 'Weaviate Query Agent with Vertex AI',
                          desc: 'Use the Query Agent as a tool with Vertex AI.',
                          type: 'Notebook',
                          url: '#',
                        },
                        {
                          title: 'Deploy a Weaviate vector database on GKE',
                          desc: 'Tutorial to deploy a Weaviate cluster on Google Kubernetes Engine (GKE).',
                          type: 'Guide',
                          url: '#',
                        },
                        {
                          title:
                            'Personalized Product Descriptions with Weaviate and the Gemini API',
                          desc: 'Embed your data, run semantic search, call the Gemini API, and store the results in Weaviate.',
                          type: 'Notebook',
                          url: '#',
                        },
                      ].map((r) => (
                        <a key={r.title} href={r.url} className={css.resCard}>
                          <div className={css.resTopRow}>
                            <span
                              className={[
                                css.pill,
                                r.type === 'Notebook' && css.pillNotebook,
                                r.type === 'Guide' && css.pillGuide,
                                r.type === 'Blog' && css.pillBlog,
                              ]
                                .filter(Boolean)
                                .join(' ')}
                            >
                              {r.type}
                            </span>
                          </div>
                          <h4 className={css.resTitle}>{r.title}</h4>
                          <p className={css.resDesc}>{r.desc}</p>
                          <span className={css.resCta}>Open →</span>
                        </a>
                      ))}
                    </div>
                    <h3 className={css.groupLabel}>Read & Listen</h3>
                    <div className={css.resGrid}>
                      {[
                        {
                          title:
                            'Weaviate on Vertex AI RAG Engine: Building RAG Applications on Google Cloud',
                          desc: 'Learn how to build RAG applications on Google Cloud using the new RAG Engine on Vertex AI.',
                          type: 'Blog',
                          url: '#',
                        },
                      ].map((r) => (
                        <a key={r.title} href={r.url} className={css.resCard}>
                          <div className={css.resTopRow}>
                            <span
                              className={[css.pill, css.pillBlog].join(' ')}
                            >
                              {r.type}
                            </span>
                          </div>
                          <h4 className={css.resTitle}>{r.title}</h4>
                          <p className={css.resDesc}>{r.desc}</p>
                          <span className={css.resCta}>Read →</span>
                        </a>
                      ))}
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
