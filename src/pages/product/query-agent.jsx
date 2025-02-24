import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.name === 'Query Agent');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Query Agent | Weaviate Workbench"
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
                    {app.released === 'no' ? (
                      <Link to="https://events.weaviate.io/weaviate-agents">
                        <button className={styles.installButton}>
                          Sign up for updates
                        </button>
                      </Link>
                    ) : (
                      <Link to="https://console.weaviate.cloud/">
                        <button className={styles.installButton}>
                          Open in Weaviate Cloud
                        </button>
                      </Link>
                    )}
                    <Link to="/developers/agents/query">
                      <button className={styles.docButton}>
                        Read the Docs
                      </button>
                    </Link>
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <div className={styles.overviewImage}>
                    <img
                      src={'/img/site/' + app.overviewImage1}
                      alt={app.name}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.appDetailContent}>
                <div className={styles.tabBottomContent}>
                  <div>
                    <h3>Overview</h3>

                    <p>
                      Weaviate’s <strong>Query Agent</strong> allows users
                      within your organization to use a natural language prompt
                      to query your database. The Agent will determine the data
                      sources to use and all the searches and aggregations that
                      are needed to answer the prompt. All the user needs to do
                      is ask a question or set of questions. 
                    </p>
                    <ul>
                      <li>
                        <strong>Get insights faster:</strong> Identify risks,
                        opportunities, and threats in your data more easily.
                      </li>
                      <li>
                        <strong>Spend less time on syntax:</strong> Ask
                        questions of your data using  natural language prompts,
                        and let Weaviate handle the rest. 
                      </li>
                      <li>
                        <strong>Democratize data access:</strong> Enable more
                        teams within your organization to run queries without
                        waiting on a technical resource. 
                      </li>
                    </ul>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional details</h3>
                    <p>
                      Availability:{' '}
                      <strong>
                        <u>Coming Soon</u>
                      </strong>
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
