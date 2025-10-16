import React from 'react';
import Link from '@docusaurus/Link';
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
                <Link className={hub.sideNavLink} to="/product/integrations">
                  ← All Integrations
                </Link>
                <h3>On this page</h3>
                <ul>
                  <li>
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#how-it-works">GCP and Weaviate</a>
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
                    <h2 className={css.panelTitle}>GCP and Weaviate</h2>
                    <p>
                      Weaviate integrates with GCP infrastructure and services
                      like Google{' '}
                      <Link to="https://ai.google.dev/aistudio">
                        Gemini API
                      </Link>{' '}
                      and{' '}
                      <Link to="https://cloud.google.com/vertex-ai">
                        Vertex AI
                      </Link>
                      .
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
                    <div className={css.sectionDesc}>
                      <p>The resources are broken into categories:</p>
                      <ol>
                        <li>
                          <Link to="#hands-on-learning">
                            Hands on Learning:
                          </Link>{' '}
                          Build your technical understanding with end-to-end
                          tutorials.
                        </li>
                        <li>
                          <Link to="#read-and-listen">Read and Listen:</Link>{' '}
                          Develop your conceptual understanding of these
                          technologies.
                        </li>
                      </ol>
                    </div>
                    <h3 className={css.groupLabel} id="hands-on-learning">
                      Hands-on Learning
                    </h3>
                    <div className={css.resGrid}>
                      {[
                        {
                          title:
                            'Build a multimodal application using Gemini Flash',
                          desc: 'This notebook shows you how to use Weaviate and Gemini Flash to build a multimodal application.',
                          type: 'Notebook',
                          url: 'https://github.com/weaviate/recipes/blob/main/integrations/cloud-hyperscalers/google/gemini/multimodal-and-gemini-flash/NY-Roadshow-Gemini.ipynb',
                        },
                        {
                          title: 'BigQuery and Weaviate',
                          desc: 'Sync data between BigQuery and Weaviate using DSPy.',
                          type: 'Notebook',
                          url: 'https://github.com/weaviate/recipes/blob/main/integrations/cloud-hyperscalers/google/bigquery/BigQuery-Weaviate-DSPy-RAG.ipynb',
                        },
                        {
                          title: 'Semantic Search with Gemini Ultra',
                          desc: 'This notebook shows you how to use Weaviate and Gemini Ultra.',
                          type: 'Notebook',
                          url: 'https://github.com/weaviate/recipes/blob/main/integrations/cloud-hyperscalers/google/gemini/gemini-ultra/gemini-ultra-weaviate.ipynb',
                        },
                        {
                          title: 'Weaviate Query Agent with Gemini API',
                          desc: 'Use the Query Agent as a tool with the Gemini API.',
                          type: 'Notebook',
                          url: 'https://github.com/weaviate/recipes/blob/main/integrations/cloud-hyperscalers/google/agents/gemini-api-query-agent.ipynb',
                        },
                        {
                          title: 'Weaviate Query Agent with Vertex AI',
                          desc: 'Use the Query Agent as a tool with Vertex AI.',
                          type: 'Notebook',
                          url: 'https://github.com/weaviate/recipes/blob/main/integrations/cloud-hyperscalers/google/agents/vertex-ai-query-agent.ipynb',
                        },
                        {
                          title: 'Deploy a Weaviate vector database on GKE',
                          desc: 'This tutorial shows you how to deploy a Weaviate vector database cluster on Google Kubernetes Engine (GKE).',
                          type: 'Guide',
                          url: 'https://cloud.google.com/kubernetes-engine/docs/tutorials/deploy-weaviate',
                        },
                        {
                          title:
                            'Personalized Product Descriptions with Weaviate and the Gemini API',
                          desc: 'Learn how to embed your data, run a semantic search, make a generative call to the Gemini API and store the output back in your database.',
                          type: 'Notebook',
                          url: 'https://github.com/google-gemini/cookbook/blob/main/examples/weaviate/personalized_description_with_weaviate_and_gemini_api.ipynb',
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
                    <h3 className={css.groupLabel} id="read-and-listen">
                      Read & Listen
                    </h3>
                    <div className={css.resGrid}>
                      {[
                        {
                          title:
                            'Weaviate on Vertex AI RAG Engine: Building RAG Applications on Google Cloud',
                          desc: 'Learn how to build RAG Applications on Google Cloud using the new RAG Engine on Vertex AI.',
                          type: 'Blog',
                          url: 'https://weaviate.io/blog/google-rag-api',
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
