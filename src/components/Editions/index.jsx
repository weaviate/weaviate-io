import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import editions from "../../data/selfManagedEditions.json";
import Hero from "../ProductPageTemplate/Hero";
import PricingTiers from "../Pricing/V2/TiersUpdate";
import EnterpriseUseCases from "../Enterprise/UseCasesV2";
import EnterpriseCTA from "../Enterprise/CTA";
import TrustedBy from "../Enterprise/TrustedBy";
import PricingFAQ from "../Pricing/V2/FAQ";
import styles from "./styles.module.scss";

const editionPlans = editions.map((edition) => ({
  title: edition.name,
  price: edition.price,
  eyebrow: edition.priceNote,
  blurb: edition.description,
  features: edition.features,
  ctaLabel: edition.cta,
  ctaHref: edition.href,
  detailsHref: `/${edition.id}-edition`,
  featured: edition.id === "enterprise",
  ctaVariant: edition.id === "enterprise" ? "primary" : "ghost",
  badge: edition.id === "community" ? "Always free" : undefined,
}));

export function EditionCards() {
  return <PricingTiers plans={editionPlans} />;
}

function TrialForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/8738733.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return (
    <aside className={styles.card}>
      <Heading as="h2" id="trial-form">
        Request your 30-day trial key
      </Heading>
      <div
        className="hs-form-frame"
        data-region="na1"
        data-form-id="0edcff12-285d-4534-bbc9-58e807d97855"
        data-portal-id="8738733"
      />
    </aside>
  );
}
export default function EditionPage({ edition }) {
  const e = editions.find((x) => x.id === edition);
  const pageTitle = `${e.name} | Self-Managed Vector Database`;
  const socialTitle = `Weaviate ${pageTitle}`;
  const pageUrl = `https://weaviate.io/${edition}-edition`;
  const pageImage = "https://weaviate.io/og/default.jpg";
  return (
    <Layout title={pageTitle} description={e.description}>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Weaviate" />
        <meta property="og:title" content={socialTitle} />
        <meta property="og:description" content={e.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={socialTitle} />
        <meta name="twitter:description" content={e.description} />
        <meta name="twitter:image" content={pageImage} />
      </Head>
      <main
        className={`${styles.page} ${edition === "enterprise" ? styles.enterprise : ""}`}
      >
        <Hero
          eyebrow={edition === "enterprise" ? "Self-managed" : undefined}
          title="Weaviate"
          subtitle={e.name}
          description={e.description}
          primaryCta={{
            label: e.cta,
            to: edition === "enterprise" ? "#trial-form" : e.href,
          }}
          secondaryCta={{ label: "View pricing", to: "/pricing#self-managed" }}
          media={
            edition === "enterprise" ? (
              <TrialForm />
            ) : (
              <img
                src="/img/site/2026/digital-ocean-diagram.svg"
                alt="Weaviate database architecture and AI services"
                className="tw-h-auto tw-w-full"
              />
            )
          }
        />
        {edition === "enterprise" && <TrustedBy />}
        <section className={styles.section}>
          <div className={styles.wrap}>
            {edition === "enterprise" && (
              <p className={styles.eyebrow}>Overview</p>
            )}
            <h2>
              {edition === "community"
                ? "Everything you need to start building"
                : edition === "enterprise"
                  ? "Your partner for production-ready AI"
                  : "Search, scale, and secure your data"}
            </h2>
            <div className={styles.two}>
              {e.cards.map(([title, body, icon, points]) => (
                <article
                  className={`${styles.card} ${icon ? styles.iconCard : ""} ${edition === "enterprise" ? styles.enterpriseCard : ""}`}
                  key={title}
                >
                  <div className={styles.cardHeading}>
                    {icon && (
                      <img
                        className={styles.cardIcon}
                        src={icon}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <h3>{title}</h3>
                  </div>
                  <p>{body}</p>
                  {points && (
                    <ul>
                      {points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
        {edition === "enterprise" && <EnterpriseUseCases />}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2>Ready to get started?</h2>
            <div className={styles.three}>
              {e.steps.map(([title, body, label, to, icon]) => (
                <article
                  className={`${styles.card} ${icon ? styles.iconCard : ""} ${edition === "enterprise" ? styles.enterpriseCard : ""}`}
                  key={title}
                >
                  <div className={styles.cardHeading}>
                    {icon && (
                      <img
                        className={styles.cardIcon}
                        src={icon}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <h3>{title}</h3>
                  </div>
                  <p>{body}</p>
                  <Link className={styles.secondaryButton} to={to}>
                    {label}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        {edition === "community" && (
          <section className={styles.section}>
            <div className={styles.wrap}>
              <h2>Need help? Let’s build together</h2>
              <div className={styles.actions}>
                <Link
                  className={styles.secondaryButton}
                  to="/enterprise-edition"
                >
                  Explore Enterprise Edition
                </Link>
                <Link className={styles.secondaryButton} to="/go/console">
                  Start with Weaviate Cloud
                </Link>
                <Link className={styles.secondaryButton} to="/learn">
                  Learning Center
                </Link>
              </div>
            </div>
          </section>
        )}
        {edition === "enterprise" ? (
          <PricingFAQ
            faqType="SelfManaged"
            title="Questions about Enterprise Edition?"
            defaultExpanded={0}
          />
        ) : (
          <PricingFAQ
            title={`Questions about ${e.name}?`}
            faqData={[
              {
                question: "How do I get started?",
                answer: `${e.steps[0][1]} <a href="${e.steps[0][3]}">${e.steps[0][2]}</a>`,
              },
              {
                question: "Where can I find pricing information?",
                answer:
                  '<a href="/pricing#self-managed">See self-managed pricing.</a>',
              },
            ]}
          />
        )}
        {edition === "enterprise" && <EnterpriseCTA />}
      </main>
    </Layout>
  );
}
