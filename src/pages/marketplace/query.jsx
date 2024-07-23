import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.id === 'query');
  const [activeTab, setActiveTab] = useState('Overview');

  if (!app) return <div>App not found</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <>
            <div className={styles.imageContainer}>
              <div className={styles.overviewImage}>
                <img src={'/img/site/' + app.overviewImage1} alt={app.name} />
              </div>
              <div className={styles.overviewImage}>
                <img src={'/img/site/' + app.overviewImage2} alt={app.name} />
              </div>
            </div>
            <div className={styles.tabBottomContent}>
              <p>{app.longDescription}</p>
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
                  <strong>Languages:</strong>
                </p>
                <ul>
                  {app.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );
      case 'Configuration':
      case 'Examples':
      case 'Support':
        return <p>No content available for this tab yet.</p>;
      case 'Related':
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="custom-page noBG">
      <Layout
        title="Query | Weaviate Marketplace"
        description="A browser-based GraphQL IDE that lets users work interactively with their clusters."
      >
        <MetaSEO />

        <div className={styles.appContainer}>
          <div className={`${styles.sidebar} ${styles.mini}`}>
            <Link to="/marketplace" className={styles.backButton}>
              Marketplace
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
                  <button className={styles.installButton}>Install</button>
                )}
              </div>
            </div>
            <div className={styles.appDivider} />
            <div className={styles.appDetailContent}>
              <div className={styles.overviewContent}>
                <div className={styles.tabContent}>
                  <div className={styles.tabButtons}>
                    {[
                      'Overview',
                      'Configuration',
                      'Examples',
                      'Support',
                      'Related',
                    ].map((tab) => (
                      <button
                        key={tab}
                        className={activeTab === tab ? styles.active : ''}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className={styles.tabContentBody}>
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>

            {activeTab === 'Related' ? null : (
              <>
                <div className={styles.appDivider} />
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
              </>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
