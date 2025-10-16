import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import partners from '/data/partners.json';
import hub from '/src/components/PartnersMarketplace/styles.module.scss';
import css from '/src/components/PartnersMarketplace/IntegrationDetail/styles.module.scss';
import IntegrationHeader from '/src/components/PartnersMarketplace/IntegrationDetail/Header';

const slug = 'amazon-web-services';
const getSlug = (s) => s.toLowerCase().replace(/\s+/g, '-');

export default function AwsIntegrationPage() {
  const item = partners.find((p) => getSlug(p.name) === slug);
  if (!item) {
    return (
      <Layout title="Not found">
        <div className="container">
          <p>Integration not found.</p>
        </div>
      </Layout>
    );
  }

  const {
    name,
    image,
    description,
    tags = [],
    link,
    overview = 'Full overview text…',
    resourcesGroups = [], // use group data if present
  } = item;

  const ctas = item.ctas || item.cta || [];

  const renderResGroups = () => {
    if (!resourcesGroups?.length) return null;

    return resourcesGroups.map((group) => (
      <div key={group.title}>
        <h3 className={css.groupLabel} id={getSlug(group.title)}>
          {group.title}
        </h3>
        <div className={css.resGrid}>
          {(group.items || []).map((r) => {
            const pillClass =
              r.type === 'Notebook'
                ? css.pillNotebook
                : r.type === 'Guide'
                ? css.pillGuide
                : r.type === 'Blog'
                ? css.pillBlog
                : null;

            return (
              <a key={r.topic} href={r.url} className={css.resCard}>
                <div className={css.resTopRow}>
                  <span
                    className={[css.pill, pillClass].filter(Boolean).join(' ')}
                  >
                    {r.type || 'Open'}
                  </span>
                </div>
                <h4 className={css.resTitle}>{r.topic}</h4>
                {r.description && (
                  <p className={css.resDesc}>{r.description}</p>
                )}
                <span className={css.resCta}>
                  {r.type === 'Blog' ? 'Read →' : 'Open →'}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="custom-page noBG">
      <Layout title={`${name} Integration`} description={description}>
        <IntegrationHeader
          name={name}
          image={image}
          description={description}
          tags={tags}
          docsUrl={link}
          ctas={ctas}
        />

        <div className={css.pageBg}>
          <div className="container">
            <div className={hub.cardsFilterContainer}>
              <nav className={`${hub.sideFilter} ${css.sideNav}`}>
                <Link className={hub.sideNavLink} to="/product/integrations">
                  ← All Integrations
                </Link>
                <h3>On this page</h3>
                <ul>
                  <li>
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#how-it-works">AWS and Weaviate</a>
                  </li>
                  <li>
                    <a href="#setup">Setup</a>
                  </li>
                  <li>
                    <a href="#resources">Resources</a>
                  </li>
                </ul>
              </nav>

              <main className={hub.mainContent}>
                <div className={css.panelGrid}>
                  {/* Overview */}
                  <section id="overview" className={`${hub.card} ${css.panel}`}>
                    <h2 className={css.panelTitle}>Overview</h2>
                    <p>{overview}</p>
                  </section>

                  {/* How it works */}
                  <section
                    id="how-it-works"
                    className={`${hub.card} ${css.panel}`}
                  >
                    <h2 className={css.panelTitle}>AWS and Weaviate</h2>
                    <p>
                      Weaviate integrates with AWS infrastructure and services
                      like{' '}
                      <Link to="https://aws.amazon.com/sagemaker/">
                        SageMaker
                      </Link>{' '}
                      and{' '}
                      <Link to="https://aws.amazon.com/bedrock/">
                        Amazon Bedrock
                      </Link>
                      <ol>
                        <li>
                          <Link to="https://docs.weaviate.io/deploy/installation-guides/aws-marketplace">
                            Deploy Weaviate from AWS Marketplace
                          </Link>
                        </li>
                        <li>
                          <Link to="https://docs.weaviate.io/weaviate/model-providers/aws">
                            Run embedding and generative models on SageMaker and
                            Bedrock
                          </Link>
                        </li>
                      </ol>
                    </p>
                  </section>

                  {/* Setup */}
                  <section
                    id="setup"
                    className={`${hub.card} ${css.panel} ${css.panelWide}`}
                  >
                    <h2 className={css.panelTitle}>Setup</h2>
                    <ol className={css.steps}>
                      <li>Deploy Weaviate via AWS Marketplace.</li>
                      <li>Configure networking, IAM roles & credentials.</li>
                      <li>Connect to Bedrock and/or SageMaker and test.</li>
                    </ol>
                  </section>

                  {/* Resources */}
                  <section
                    id="resources"
                    className={`${css.section} ${css.panelWide}`}
                  >
                    <h2>Resources</h2>
                    <div className={css.sectionDesc}>
                      <p>The resources are broken into categories:</p>
                      <ol>
                        <li>
                          <Link to="#hands-on-learning">
                            Hands on Learning:
                          </Link>{' '}
                          Build your technical understanding with end-to-end
                          tutorials.
                        </li>
                        <li>
                          <Link to="#read-and-listen">Read and Listen:</Link>{' '}
                          Develop your conceptual understanding of these
                          technologies.
                        </li>
                      </ol>
                    </div>

                    {renderResGroups()}
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
