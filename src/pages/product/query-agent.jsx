import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';
import { useEffect } from 'react';

function GuideflowEmbed({ iframeId = 'dr973w8bnp' }) {
  React.useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://app.guideflow.com/assets/opt.js"]'
    );
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://app.guideflow.com/assets/opt.js';
      s.async = true;
      s.setAttribute('data-cookieconsent', 'ignore');
      s.setAttribute('data-iframe-id', iframeId);
      document.body.appendChild(s);
    } else {
      if (!existing.getAttribute('data-iframe-id')) {
        existing.setAttribute('data-iframe-id', iframeId);
      }
      window.dispatchEvent(new Event('guideflow:check'));
    }
  }, [iframeId]);

  return (
    <div className={styles.guideflowHero}>
      <iframe
        id={iframeId}
        src={`https://app.guideflow.com/embed/${iframeId}`}
        title="Guideflow"
        allow="clipboard-read; clipboard-write"
        allowFullScreen
      />
    </div>
  );
}

export default function QueryPage() {
  const app = appData.find((app) => app.name === 'Query Agent');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Query Agent | Weaviate Agents"
        description="Query your data in Weaviate using simple human language."
      >
        <MetaSEO />
        <div className="container">
          <div className={styles.breadCrumbs}>
            <Link to="/product">
              <div className={styles.home} />
            </Link>
            <div className={styles.arrow} />
            <span>
              {app.category}: <Link to={app.url}>{app.name}</Link>
            </span>
          </div>
          <div className={styles.appContainer}>
            <div className={`${styles.sidebar} ${styles.mini}`}>
              <Link to="/product" className={styles.backButton}>
                Workbench
              </Link>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.appDetailHeader}>
                <img src={'/img/site/' + app.image} alt={app.name} />
                <div>
                  <h1>{app.name}</h1>
                  <p>{app.description}</p>
                  <div className={styles.installButtons}>
                    {app.released === 'yes' ? (
                      <Link to="https://console.weaviate.cloud/">
                        <button className={styles.installButton}>
                          Try Free
                        </button>
                      </Link>
                    ) : (
                      <Link to="https://docs.weaviate.io/agents/query/usage">
                        <button className={styles.installButton}>
                          Try Free
                        </button>
                      </Link>
                    )}
                    <Link to="https://docs.weaviate.io/agents/query">
                      <button className={styles.docButton}>
                        Read the Docs
                      </button>
                    </Link>
                  </div>
                </div>

                <div className={styles.mediaSlot}>
                  <GuideflowEmbed iframeId="dr973w8bnp" />
                </div>
              </div>

              <div className={styles.appDetailContent}>
                <div className={styles.tabBottomContent}>
                  <div>
                    <h3>Overview</h3>

                    <p>
                      Weaviate’s <strong>Query Agent</strong> is a
                      Weaviate-native data agent that turns natural-language
                      questions into precise database operations, making full
                      use of dynamic filters, cross-collection routing, query
                      optimization, and aggregations. It returns accurate and
                      relevant results with source citations.
                    </p>
                    <p>
                      It replaces manual query construction and ad-hoc logic
                      with runtime, context-aware planning that optimizes and
                      executes queries across user collections. It supports two
                      modes:
                    </p>
                    <ul>
                      <li>
                        <strong>Ask mode:</strong> for developers building
                        agentic applications that require conversational
                        interactions and answers backed by data stored in
                        Weaviate.
                      </li>
                      <li>
                        <strong>Search mode:</strong> for developers who need
                        out of the box, high quality information retrieval with
                        strong recall and controlled precision.
                      </li>
                    </ul>
                    <p>
                      The Query Agent can be accessed through Python and
                      TypeScript client SDKs to integrate retrieval directly
                      into applications, or via the Weaviate Cloud Console for
                      fast exploration, validation, and experimentation.
                    </p>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Query Agent is Generally Available</h3>
                    <p>
                      <Link to="/blog/query-agent-generally-available">
                        <u>Read more</u>
                      </Link>{' '}
                      in the announcement about how the interface to databases
                      is shifting with the introduction of agentic retrievers,
                      domain experts that use Weaviate’s APIs with your data.
                    </p>
                    <p>
                      <Link to="https://console.weaviate.cloud/">
                        <button
                          className={`${styles.installButton} ${styles.sideButton}`}
                        >
                          Try Free
                        </button>
                      </Link>{' '}
                      <br></br>Available as a 14-day free Weaviate Cloud sandbox
                      trial. No credit card required.
                    </p>
                    <p>
                      <Link to="https://events.weaviate.io/weaviate-agents-newsletter">
                        <button
                          className={`${styles.installButton} ${styles.sideButton}`}
                        >
                          Subscribe to Weaviate Agents newsletter
                        </button>
                      </Link>{' '}
                      <br></br>Stay up to date with the latest news, product
                      updates, and best practices for the Query Agent and other
                      Weaviate Agents.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.appDivider} />
              <div className={styles.relatedApps}>
                <h3>Related Products</h3>
                <div className={styles.cardContainer}>
                  {appData
                    .filter(
                      (relatedApp) =>
                        relatedApp.category === app.category &&
                        relatedApp.id !== app.id
                    )
                    .map((relatedApp) => (
                      <AppCard key={relatedApp.id} app={relatedApp} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
