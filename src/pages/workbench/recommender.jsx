import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

export default function QueryPage() {
  const app = appData.find((app) => app.id === 'recommender');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Recommender Service| Weaviate Workbench"
        description="Build personalized, multi-modal recommendations with simple interface."
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
                        Request beta access
                      </button>
                    </Link>
                  )}
                </div>
                <div className={styles.imageContainer}>
                  <div className={styles.overviewImage}>
                    <img
                      className={styles.smallScreen}
                      src={'/img/site/' + app.overviewImage1}
                      alt={app.name}
                    />
                    <img
                      className={styles.smallScreen}
                      src={'/img/site/' + app.overviewImage2}
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
                      Our Recommender service simplifies the development of
                      recommendation systems for a variety of use cases. It
                      offers a fully managed, low-code interface that enables
                      real-time recommendations that adapt dynamically to user
                      events. Additionally, it offers users configurable
                      endpoints for custom item-to-item, item-to-user, and
                      user-to-user recommendation scenarios. Teams with limited
                      machine-learning expertise can build highly personalised,
                      scalable recommenders for AI-driven customer experiences.
                    </p>
                    <ul>
                      <li>
                        Simple client interface for managing and creating custom
                        recommendations
                      </li>
                      <li>
                        Multi-modal representations of item-level data objects.
                      </li>
                      <li>
                        Personalized user recommendation and search based on
                        past events and interactions
                      </li>
                      <li>
                        Configurable endpoints for different recommendation
                        scenarios
                      </li>
                    </ul>
                    <strong>Private Beta</strong>
                    <p>
                      We’re actively looking for customers to join our private
                      beta. If you’re interested, please let us know.{' '}
                    </p>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional details</h3>
                    <p>
                      Availabilty: <strong>Private beta</strong>
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
