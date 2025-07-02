import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.name === 'Personalization Agent');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Personalization Agent | Weaviate Workbench"
        description="Dynamically personalize experiences based on user behavior."
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
                      <Link to="https://events.weaviate.io/weaviate-agents">
                        <button className={styles.installButton}>
                          Sign up for updates
                        </button>
                      </Link>
                    ) : (
                      <Link to="https://weaviate.io/developers/agents/personalization/usage">
                        <button className={styles.installButton}>
                          Public Preview
                        </button>
                      </Link>
                    )}
                    <Link to="https://weaviate.io/developers/agents/personalization">
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
                      Weaviate’s <strong>Personalization Agent</strong> learns
                      user behavior and can personalize any experience. 
                    </p>
                    <ul>
                      <li>
                        <strong>Deliver tailored results in real-time:</strong>{' '}
                        Automatically curate search results based on each user’s
                        interactions.
                      </li>
                      <li>
                        <strong>Understand each recommendation:</strong> As user
                        experiences adapt, your team gets natural language
                        explanations for each recommendation.
                      </li>
                      <li>
                        <strong>Simplify development:</strong> Go beyond static,
                        rules-based recommendations and get smart, LLM-based
                        personalization out of the box.
                      </li>
                    </ul>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional details</h3>
                    <p>
                      Availability:{' '}
                      <Link to="https://weaviate.io/developers/agents/personalization/usage">
                        <strong>
                          <u>Public Preview in Weaviate Cloud</u>
                        </strong>
                      </Link>
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
