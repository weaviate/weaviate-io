// src/pages/product/integrations/google-cloud-platform.jsx
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
  } = item;

  // 👇 handle both "cta" and "ctas" keys from JSON
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
          ctas={ctas} // ✅ now populated
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
                <article className={`${hub.card} ${css.bigCard}`}>
                  <section id="overview" className={css.section}>
                    <h2>Overview</h2>
                    <p>{overview}</p>
                  </section>

                  <section id="how-it-works" className={css.section}>
                    <h2>How it works</h2>
                    <p>
                      Explain marketplaces, auth, endpoints, data flow, etc.
                    </p>
                  </section>

                  <section id="setup" className={css.section}>
                    <h2>Setup</h2>
                    <ol className={css.steps}>
                      <li>Deploy Weaviate via GCP Marketplace.</li>
                      <li>Configure networking & credentials.</li>
                      <li>Connect to Vertex AI / AI Studio and test.</li>
                    </ol>
                  </section>

                  <section id="resources" className={css.section}>
                    <h2>Resources</h2>
                    <ul>
                      <li>
                        <a href={link}>Weaviate docs for GCP</a>
                      </li>
                      {resources.map((r) => (
                        <li key={r.url}>
                          <a href={r.url}>{r.title}</a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </article>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
