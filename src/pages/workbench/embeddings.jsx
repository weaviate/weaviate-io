import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { MetaSEO } from '/src/theme/MetaSEO';
import appData from '/data/apps.json';
import styles from '/src/components/Marketplace/styles.module.scss';
import AppCard from '/src/components/Marketplace/card';

const modelCardStyles = {
  section: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  categoryTitle: {
    color: '#130c49',
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '20px',
    marginTop: '30px',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    padding: '24px',
    width: '320px',
    boxShadow: '0px 4px 12px 0px rgba(22, 27, 45, 0.08)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  cardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  snowflakeIcon: {
    background: '#e3f2fd',
  },
  modernvbertIcon: {
    background: '#f3e5f5',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: '700',
    color: '#130c49',
  },
  cardSubtitle: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#6b7c93',
  },
  cardBullets: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 16px 0',
  },
  bullet: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '0.875rem',
    color: '#130c49',
  },
  bulletIcon: {
    color: '#61bd73',
    fontWeight: 'bold',
    marginTop: '2px',
  },
  learnMore: {
    color: '#130c49',
    fontSize: '0.875rem',
    fontWeight: '500',
    textDecoration: 'underline',
  },
  defaultBadge: {
    background: '#61bd73',
    color: '#fff',
    fontSize: '0.625rem',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '600',
    marginLeft: '8px',
  },
};

function ModelCard({ icon, iconStyle, title, subtitle, bullets, learnMoreUrl, isDefault }) {
  return (
    <div style={modelCardStyles.card}>
      <div style={modelCardStyles.cardHeader}>
        <div style={{ ...modelCardStyles.cardIcon, ...iconStyle }}>
          {icon}
        </div>
        <div>
          <h4 style={modelCardStyles.cardTitle}>
            {title}
            {isDefault && <span style={modelCardStyles.defaultBadge}>Default</span>}
          </h4>
          <p style={modelCardStyles.cardSubtitle}>{subtitle}</p>
        </div>
      </div>
      <ul style={modelCardStyles.cardBullets}>
        {bullets.map((bullet, index) => (
          <li key={index} style={modelCardStyles.bullet}>
            <span style={modelCardStyles.bulletIcon}>•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link to={learnMoreUrl} style={modelCardStyles.learnMore}>
        Learn more
      </Link>
    </div>
  );
}

export default function QueryPage() {
  const app = appData.find((app) => app.name === 'Embeddings');

  if (!app) return <div>App not found</div>;

  return (
    <div className="custom-page noBG">
      <Layout
        title="Embeddings | Weaviate Workbench"
        description="Build personalized, multi-modal recommendations with simple interface."
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
                  <p>{app.longDescription}</p>
                  <div className={styles.installButtons}>
                    {app.released === 'yes' ? (
                      <Link to="/go/console">
                        <button className={styles.installButton}>
                          Open in Weaviate Cloud
                        </button>
                      </Link>
                    ) : (
                      <Link to="https://events.weaviate.io/embeddings-preview">
                        <button className={styles.installButton}>
                          Request Preview Access
                        </button>
                      </Link>
                    )}
                    <Link to="https://docs.weaviate.io/cloud/embeddings">
                      <button className={styles.docButton}>
                        Read the Docs
                      </button>
                    </Link>
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <div className={styles.overviewImage}>
                    <img
                      className={`${styles.smallScreen} ${styles.embeddings}`}
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
                      Weaviate Embeddings is a service in Weaviate Cloud that
                      simplifies the creation and management of vector
                      embeddings. With Weaviate Embeddings, developers can
                      access to various embedding models without needing to send
                      data to an external provider.
                    </p>
                    <ul>
                      <li>
                        <strong>Fast, flexible development:</strong> Simply
                        operations with one less API and vendor to manage.
                        Choose between class-leading OSS and proprietary models.
                      </li>
                      <li>
                        <strong>Freedom from rate limits:</strong> Bring models
                        closer to your data to reduce latency. Enable limitless
                        embeddings per second without artificial constraints.
                      </li>
                      <li>
                        <strong>GPU-powered and cost-efficient:</strong>{' '}
                        Maximize performance while managing costs with simple,
                        pay-as-you-go pricing.
                      </li>
                    </ul>
                  </div>

                  <div className={styles.additionalInfo}>
                    <h3>Additional Details and Pricing</h3>
                    <p>
                      Snowflake arctic-embed 1.5 = <strong>$0.025</strong> per
                      1M tokens<br></br>Snowflake arctic-embed 2.0 ={' '}
                      <strong>$0.040</strong> per 1M tokens<br></br>
                      ModernVBERT colmodernvbert = <strong>$0.065</strong> per
                      1M tokens
                    </p>
                  </div>
                </div>
              </div>

              <div style={modelCardStyles.section}>
                <h3>Available Models</h3>

                <h4 style={modelCardStyles.categoryTitle}>Text Embedding Models</h4>
                <div style={modelCardStyles.cardsContainer}>
                  <ModelCard
                    icon="❄️"
                    iconStyle={modelCardStyles.snowflakeIcon}
                    title="Arctic L v2.0"
                    subtitle="Snowflake"
                    isDefault={true}
                    bullets={[
                      'Multilingual support',
                      'Up to 8,192 tokens',
                      'Best for big-scale, complex retrieval',
                    ]}
                    learnMoreUrl="https://docs.weaviate.io/cloud/embeddings"
                  />
                  <ModelCard
                    icon="❄️"
                    iconStyle={modelCardStyles.snowflakeIcon}
                    title="Arctic M v1.5"
                    subtitle="Snowflake"
                    bullets={[
                      'English support',
                      'Up to 512 tokens',
                      'Best for fast, lightweight retrieval',
                    ]}
                    learnMoreUrl="https://docs.weaviate.io/cloud/embeddings"
                  />
                </div>

                <h4 style={modelCardStyles.categoryTitle}>Multimodal Models</h4>
                <div style={modelCardStyles.cardsContainer}>
                  <ModelCard
                    icon="🔮"
                    iconStyle={modelCardStyles.modernvbertIcon}
                    title="ColModernVBERT"
                    subtitle="ModernVBERT"
                    bullets={[
                      'English support',
                      'Supports images and document pages',
                      'Query text limit: 8,092 tokens',
                      'Best for visual documents (PDFs, slides, invoices) without OCR preprocessing',
                    ]}
                    learnMoreUrl="https://docs.weaviate.io/cloud/embeddings"
                  />
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
