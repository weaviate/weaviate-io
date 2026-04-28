// src/pages/product/integrations/boomi.jsx
import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import partners from "/data/partners.json";
import hub from "/src/components/PartnersMarketplace/styles.module.scss";
import css from "/src/components/PartnersMarketplace/IntegrationDetail/styles.module.scss";
import IntegrationHeader from "/src/components/PartnersMarketplace/IntegrationDetail/Header";

const slug = "boomi";
const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-");
const getGroupId = (title = "") => {
  const normalized = title.toLowerCase().trim();

  if (
    normalized === "hands on learning" ||
    normalized === "hands-on-learning"
  ) {
    return "hands-on-learning";
  }

  if (
    normalized === "read and listen" ||
    normalized === "read-and-listen" ||
    normalized === "read & listen"
  ) {
    return "read-and-listen";
  }

  return slugify(title);
};

export default function BoomiIntegrationPage() {
  const item = partners.find((p) => (p.slug || slugify(p.name)) === slug);
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
    cta: ctasFromOldField,
    ctas,
    company = "Vendor",
    howItWorks = "",
    setup = [],
    resourcesGroups = [],
  } = item;

  const finalCtas = ctas || ctasFromOldField || [];

  const pillClass = (t) =>
    t === "Notebook"
      ? css.pillNotebook
      : t === "Guide"
        ? css.pillGuide
        : t === "Blog"
          ? css.pillBlog
          : undefined;

  const renderGroups = () =>
    (resourcesGroups || []).map((group) => (
      <div key={group.title}>
        <h3 className={css.groupLabel} id={getGroupId(group.title)}>
          {group.title}
        </h3>
        <div className={css.resGrid}>
          {(group.items || []).map((r, i) => {
            const title = r.topic || r.title || "Untitled";
            const desc = r.description || r.desc;
            const type = r.type || "Open";
            return (
              <a
                key={`${slugify(title)}-${i}`}
                href={r.url}
                className={css.resCard}
              >
                <div className={css.resTopRow}>
                  <span
                    className={[css.pill, pillClass(type)]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {type}
                  </span>
                </div>
                <h4 className={css.resTitle}>{title}</h4>
                {desc && <p className={css.resDesc}>{desc}</p>}
                <span className={css.resCta}>
                  {type === "Blog" ? "Read →" : "Open →"}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    ));

  return (
    <div className="custom-page noBG">
      <Layout title={`${name} Integration`} description={description}>
        <IntegrationHeader
          name={name}
          image={image}
          description={description}
          tags={tags}
          docsUrl={link}
          ctas={finalCtas}
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
                    <a href="#how-it-works">{company} and Weaviate</a>
                  </li>
                  <li>
                    <a href="#resources">Resources</a>
                  </li>
                </ul>
              </nav>

              <main className={hub.mainContent}>
                {/* Overview  */}
                {description && (
                  <section id="overview" className={css.section}>
                    <h2>Overview</h2>
                    <p>{description}</p>
                  </section>
                )}

                {/* Company + Weaviate  */}
                <section id="how-it-works" className={css.section}>
                  <h2>{company} and Weaviate</h2>
                  <p dangerouslySetInnerHTML={{ __html: howItWorks }} />
                </section>

                {/* Resources */}
                <section id="resources" className={css.section}>
                  <h2>Resources</h2>
                  <div className={css.sectionDesc}>
                    <p>The resources are broken into categories:</p>
                    <ol>
                      <li>
                        <a href="#hands-on-learning">Hands on Learning:</a>{" "}
                        Build your technical understanding with end-to-end
                        tutorials.
                      </li>
                      <li>
                        <a href="#read-and-listen">Read and Listen:</a> Develop
                        your conceptual understanding of these technologies.
                      </li>
                    </ol>
                  </div>

                  {renderGroups()}
                </section>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
