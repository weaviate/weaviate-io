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
        title="Transformation Agent | Weaviate Products"
        description="Automatically improve your dataset with a single prompt."
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
                      <Link to="https://weaviate.io/developers/agents/transformation/usage">
                        <button className={styles.installButton}>
                          Public Preview
                        </button>
                      </Link>
                    )}
                    <Link to="https://weaviate.io/developers/agents/transformation">
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
                      automatically update data, create new properties, add new
                      data, and more.
                    </p>
                    <ul>
                      <li>
                        <strong>Simplify data engineering tasks:</strong>{' '}
                        Transform your dataset with the power of prompts and
                        pre-trained LLMs.
                      </li>
                      <li>
                        <strong>Improve the quality of your data:</strong> Clean
                        and organize your dataset to make it more reliable.
                      </li>
                      <li>
                        <strong>Augment your dataset:</strong> Translate,
                        classify, or create new content based on existing
                        objects.
                      </li>
                    </ul>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional details</h3>
                    <p>
                      Availability:{' '}
                      <Link to="https://weaviate.io/developers/agents/transformation/usage">
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
