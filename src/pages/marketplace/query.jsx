import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import KnowledgeHeader from '/src/components/Marketplace/Knowledgeheader';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.id === 'query');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate Knowledge Cards"
        description="Unlock the power of vector search. Our guides will help you conquer vector embeddings and build better AI applications."
      >
        <MetaSEO img="og/content/knowledgecards.jpg" />

        <div className={styles.appContainer}>
          <div className={styles.sidebar}>
            <Link to="/marketplace" className={styles.backButton}>
              Back to Marketplace
            </Link>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.appDetailHeader}>
              <img src={`/img/apps/${app.image}`} alt={app.name} />
              <div>
                <h1>{app.name}</h1>
                <p>{app.description}</p>
                <button className={styles.installButton}>Install</button>
              </div>
            </div>
            <div className={styles.appDetailContent}>
              <div className={styles.tabContent}>
                <h2>Overview</h2>
                <img src={`/img/apps/${app.image}`} alt={app.name} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse...
                </p>
              </div>
              <div className={styles.additionalInfo}>
                <h3>Additional info</h3>
                <p>
                  <strong>Pricing:</strong> {app.price}
                </p>
                <p>
                  <strong>Version:</strong> {app.version}
                </p>
                <p>
                  <strong>Updated:</strong> {app.updated}
                </p>
                <p>
                  <strong>Size:</strong> {app.size}
                </p>
                <p>
                  <strong>Languages:</strong> {app.languages.join(', ')}
                </p>
              </div>
            </div>
            <div className={styles.relatedApps}>
              <h3>Related Apps</h3>
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
      </Layout>
    </div>
  );
}
