import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.name === 'Transformation Agent');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Transformation Agent | Weaviate Workbench"
        description="Automatically improve your dataset with a single prompt."
      >
        <MetaSEO />
        <div className="container">
          <div className={styles.breadCrumbs}>
            <Link to="/workbench">
              <div className={styles.home} />
            </Link>
            <div className={styles.arrow} />
            <span>
              {app.category}: <Link to={app.url}>{app.name}</Link>
            </span>
          </div>
          <div className={styles.appContainer}>
            <div className={`${styles.sidebar} ${styles.mini}`}>
              <Link to="/workbench" className={styles.backButton}>
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
                    <Link to="/developers/agents/transformation">
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
                      Weaviate’s <strong>Transformation Agent</strong> lets you
                      manipulate your data using simple prompts. Based on the
                      instructions you give it, it uses a pre-trained LLM to
                      automate CRUD operations to update data, create new
                      properties, add new data, and more.
                    </p>
                    <ul>
                      <li>
                        <strong>Have confidence in your data:</strong> Clean and
                        tag raw data, reduce inconsistencies, and make data more
                        reliable.
                      </li>
                      <li>
                        <strong>Make your data richer:</strong> Generate and
                        enrich metadata, infer missing values, and improve
                        completeness.
                      </li>
                      <li>
                        <strong>Reduce manual data preparation:</strong> Instead
                        of manually writing rules, automatically categorize,
                        label, and preprocess data to save time and effort.
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
