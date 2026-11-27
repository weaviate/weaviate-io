import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Hero from "/src/components/ProductPageTemplate/Hero";
import EnterpriseUseCases from "/src/components/Enterprise/UseCasesV2";
import TrustedBy from "/src/components/Enterprise/TrustedBy";
import ComparisonCards from "./ComparisonCards";
import editionStyles from "/src/components/Editions/styles.module.scss";

const stepIcons = [
  "/img/site/2026/digital-ocean-step-01.svg",
  "/img/site/2026/digital-ocean-step-02.svg",
  "/img/site/2026/digital-ocean-step-03.svg",
];

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function ComparisonPageContent({ page }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  function trackCta(position, cta) {
    return () => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "compare_cta_click", {
          page: page.analyticsPage,
          position,
          cta,
        });
      }
    };
  }

  return (
    <Layout title={page.metaTitle} description={page.metaDescription}>
      <Head>
        <link rel="canonical" href={page.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Weaviate" />
        <meta property="og:title" content={page.ogTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={page.canonicalUrl} />
        <meta property="og:image" content="https://weaviate.io/og/default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.ogTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content="https://weaviate.io/og/default.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(page.faqs))}
        </script>
      </Head>
      <main className="tw-bg-[#111111] tw-text-white">
        <Hero
          title="Weaviate vs"
          subtitle={page.competitor}
          description={page.subtitle}
          primaryCta={{
            label: "Start free",
            to: "https://console.weaviate.io/signup",
            analytics: {
              event: "compare_cta_click",
              page: page.analyticsPage,
              position: "hero",
              cta: "start-free",
            },
            onClick: trackCta("hero", "start-free"),
          }}
          secondaryCta={{
            label: "Talk to our team",
            to: "/contact",
            analytics: {
              event: "compare_cta_click",
              page: page.analyticsPage,
              position: "hero",
              cta: "talk-to-team",
            },
            onClick: trackCta("hero", "talk-to-team"),
          }}
          media={
            <div className="tw-grid tw-gap-4 sm:tw-grid-cols-2">
              <div className="tw-rounded-xl tw-border tw-border-white/10 tw-bg-[#111111]/70 tw-p-5">
                <p className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-[#43E2C5]">
                  Weaviate
                </p>
                <p className="tw-m-0 tw-text-lg tw-font-semibold tw-text-[#DDEBF2]">
                  AI-native database
                </p>
              </div>
              <div className="tw-rounded-xl tw-border tw-border-white/10 tw-bg-[#111111]/70 tw-p-5">
                <p className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-tracking-wider tw-text-[#43E2C5]">
                  {page.competitor}
                </p>
                <p className="tw-m-0 tw-text-lg tw-font-semibold tw-text-[#DDEBF2]">
                  {page.competitorType}
                </p>
              </div>
            </div>
          }
        />

        <section className="tw-py-12">
          <div className="container">
            <h2 className="!tw-mb-8 tw-text-[#DDEBF2]">
              Weaviate vs {page.competitor} at a glance
            </h2>
            <div className="tw-grid tw-gap-4 lg:tw-grid-cols-3">
              {page.atAGlance.map(({ title, body }) => (
                <article
                  key={title}
                  className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                >
                  <h3 className="!tw-mb-4 tw-text-[#DDEBF2]">{title}</h3>
                  <p className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tw-bg-[#161616] tw-py-12">
          <div className="container">
            <h2 className="!tw-mb-8 tw-text-[#DDEBF2]">
              Weaviate vs {page.competitor}: feature comparison
            </h2>
            <div className="tw-hidden tw-overflow-x-auto tw-border tw-border-white/10 md:tw-block">
              <table className="tw-w-full tw-min-w-[760px] tw-border-collapse tw-text-left">
                <thead className="tw-bg-[#1f1f1f]">
                  <tr>
                    <th className="tw-p-4 tw-text-[#DDEBF2]">Capability</th>
                    <th className="tw-p-4 tw-text-[#DDEBF2]">Weaviate</th>
                    <th className="tw-p-4 tw-text-[#DDEBF2]">
                      {page.competitor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.comparisonRows.map(({ capability, weaviate, other }) => (
                    <tr
                      key={capability}
                      className="tw-border-t tw-border-white/10"
                    >
                      <th
                        scope="row"
                        className="tw-p-4 tw-align-top tw-font-semibold tw-text-[#DDEBF2]"
                      >
                        {capability}
                      </th>
                      <td className="tw-p-4 tw-align-top tw-leading-relaxed tw-text-[#B9C8DE]">
                        {weaviate}
                      </td>
                      <td className="tw-p-4 tw-align-top tw-leading-relaxed tw-text-[#B9C8DE]">
                        {other}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="tw-grid tw-gap-3 md:tw-hidden">
              {page.comparisonRows.map(({ capability, weaviate, other }) => (
                <article
                  key={capability}
                  className="tw-min-w-0 tw-rounded-xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-5 tw-break-words"
                >
                  <h3 className="!tw-mb-4 tw-text-[#DDEBF2]">{capability}</h3>
                  <dl className="tw-m-0 tw-grid tw-gap-4">
                    <div className="tw-min-w-0">
                      <dt className="tw-mb-1 tw-font-semibold tw-text-[#43E2C5]">
                        Weaviate
                      </dt>
                      <dd className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
                        {weaviate}
                      </dd>
                    </div>
                    <div className="tw-min-w-0">
                      <dt className="tw-mb-1 tw-font-semibold tw-text-[#43E2C5]">
                        {page.competitor}
                      </dt>
                      <dd className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
                        {other}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <p className="tw-mb-0 tw-mt-5 tw-max-w-4xl tw-leading-relaxed tw-text-[#B9C8DE]">
              {page.sources}
            </p>
          </div>
        </section>

        <section className="tw-py-12">
          <div className="container">
            <h2 className="!tw-mb-8 tw-text-[#DDEBF2]">
              Why teams choose Weaviate over {page.competitor}
            </h2>
            <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
              {page.benefits.map(({ title, body, icon }) => (
                <article
                  key={title}
                  className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                >
                  <div className={`${editionStyles.cardHeading} tw-mb-4`}>
                    <img
                      className={editionStyles.cardIcon}
                      src={`/img/site/2026/${icon}`}
                      alt=""
                      aria-hidden="true"
                    />
                    <h3 className="tw-text-[#DDEBF2]">{title}</h3>
                  </div>
                  <p className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <EnterpriseUseCases />
        <TrustedBy />

        <section className="tw-bg-[#161616] tw-py-12">
          <div className="container">
            <h2 className="!tw-mb-8 tw-text-[#DDEBF2]">
              Evaluate Weaviate alongside {page.competitor}
            </h2>
            <ol className="tw-m-0 tw-grid tw-list-none tw-gap-4 tw-p-0 md:tw-grid-cols-3">
              {page.migrationSteps.map(({ title, body }, index) => (
                <li
                  key={title}
                  className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                >
                  <div className={`${editionStyles.cardHeading} tw-mb-4`}>
                    <img
                      className={editionStyles.cardIcon}
                      src={stepIcons[index]}
                      alt=""
                      aria-hidden="true"
                    />
                    <h3 className="tw-text-[#DDEBF2]">{title}</h3>
                  </div>
                  <p className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="tw-mb-0 tw-mt-6 tw-leading-relaxed tw-text-[#B9C8DE]">
              Start with the{" "}
              <a
                className="tw-text-[#43E2C5] tw-underline"
                href="https://docs.weaviate.io/weaviate/manage-data/import"
              >
                Weaviate data import docs
              </a>{" "}
              and{" "}
              <a className="tw-text-[#43E2C5] tw-underline" href="/contact">
                talk with our team
              </a>{" "}
              about your evaluation. Explore{" "}
              <a className="tw-text-[#43E2C5] tw-underline" href="/hybrid-search">
                hybrid search
              </a>
              ,{" "}
              <a className="tw-text-[#43E2C5] tw-underline" href="/pricing">
                pricing
              </a>
              ,{" "}
              <a
                className="tw-text-[#43E2C5] tw-underline"
                href="/learn/what-is-an-ai-database"
              >
                what is an AI database
              </a>
              , the{" "}
              <a
                className="tw-text-[#43E2C5] tw-underline"
                href="/product/query-agent"
              >
                Query Agent
              </a>
              .
            </p>
          </div>
        </section>

        <section className="tw-bg-[#161616] tw-py-12">
          <div className="container">
            <h2 className="!tw-mb-8 tw-text-center tw-text-[#DDEBF2]">
              {page.competitor} vs Weaviate FAQ
            </h2>
            <div className="tw-mx-auto tw-grid tw-max-w-[860px] tw-gap-3">
              {page.faqs.map(({ question, answer }, index) => {
                const isOpen = expandedQuestion === index;
                return (
                  <div
                    key={question}
                    className="tw-overflow-hidden tw-rounded-[14px] tw-border tw-border-white/10 tw-bg-[#1a1a1a]"
                  >
                    <button
                      type="button"
                      className="tw-flex tw-min-h-[64px] tw-w-full tw-items-center tw-justify-between tw-gap-5 tw-border-0 tw-bg-transparent tw-px-6 tw-py-4 tw-text-left tw-font-semibold tw-text-[#DDEBF2]"
                      aria-expanded={isOpen}
                      aria-controls={`compare-faq-answer-${index}`}
                      onClick={() =>
                        setExpandedQuestion(isOpen ? null : index)
                      }
                    >
                      <span>{question}</span>
                      <span
                        className="tw-text-2xl tw-leading-none tw-text-[#43E2C5]"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id={`compare-faq-answer-${index}`}
                      hidden={!isOpen}
                    >
                      <p className="tw-m-0 tw-px-6 tw-pb-6 tw-leading-relaxed tw-text-[#B9C8DE]">
                        {answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-pt-8">
          <div className="container">
            <h2 className="!tw-mb-4 tw-text-[#DDEBF2]">
              Related comparisons
            </h2>
            <ComparisonCards exclude={new URL(page.canonicalUrl).pathname} />
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-px-6 tw-pb-16 tw-pt-8">
          <div className="container tw-text-center">
            <h2 className="tw-mb-6 tw-text-[#DDEBF2]">
              Talk to our team about your evaluation
            </h2>
            <a
              href="/contact"
              data-analytics-event="compare_cta_click"
              data-analytics-page={page.analyticsPage}
              data-analytics-position="footer-cta"
              data-analytics-cta="talk-to-team"
              onClick={trackCta("footer-cta", "talk-to-team")}
              className="tw-inline-flex tw-min-h-[54px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[linear-gradient(48deg,_#00FE6B_13.81%,_#00B7E2_92.18%)] tw-px-8 tw-font-semibold tw-text-[#111111] tw-no-underline hover:tw-text-[#111111] hover:tw-no-underline"
            >
              Talk to our team
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default function ComparisonPage({ page }) {
  return <ComparisonPageContent page={page} />;
}
