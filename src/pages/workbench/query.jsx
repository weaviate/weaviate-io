import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.id === 'query');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Query | Weaviate Workbench"
        description="Work interactively with Weaviate Cloud clusters using GraphQL."
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
                  {app.released === 'no' ? (
                    <div className={styles.comingSoon}>Coming Soon</div>
                  ) : (
                    <Link to="https://console.weaviate.cloud/">
                      <button className={styles.installButton}>
                        Open in Weaviate Cloud
                      </button>
                    </Link>
                  )}
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
                      The Query tool in Weaviate Cloud enables users to query
                      data using GraphQL, making it easier to interact with data
                      within your clusters.The Query tool enables the following
                      functionality:
                    </p>
                    <ul>
                      <li>Syntax highlighting</li>
                      <li>Intelligent type ahead</li>
                      <li>Automatic completion for queries and variables</li>
                      <li>
                        Real-time error highlighting and reporting for queries
                        and variables
                      </li>
                    </ul>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional details</h3>
                    <p>
                      Availabilty: <strong>Available Now</strong>
                    </p>
                    <p>
                      <Link to="/developers/wcs/console">Read Docs</Link>
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
