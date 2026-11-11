import React, { useState } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { MetaSEO } from "/src/theme/MetaSEO";
import Hero from "/src/components/ProductPageTemplate/Hero";

import {
  UseCaseCard,
  useCaseCards,
} from "/src/components/Enterprise/UseCasesV2";

import MigrationContactForm from "/src/components/Migrate/ContactForm";

const IMG = "/img/site/migrate-from-chroma";

const prompt = `Inspect this repository and draft a read-only migration plan from Chroma Cloud to Weaviate. Find the code that writes documents, generates embeddings, and runs searches. Cite the files and list any settings I need to confirm.

Choose one collection for a trial. Map its IDs, documents, metadata, and vectors to Weaviate. Explain how to preserve source IDs and check the embedding model, dimensions, and distance metric.

Choose a filtered query from the app. Describe how to compare record counts, returned IDs, and ranking before switching traffic. Include a checklist for redirecting writes, reconciling changes, switching reads, and recovering if validation fails. Leave code and data untouched.`;

const steps = [
  {
    icon: "step-trial",
    title: "Start with one collection",
    body: "Map its IDs, documents, metadata, and embeddings to Weaviate.",
  },
  {
    icon: "step-compare",
    title: "Compare search results",
    body: "Run the same filtered query in both systems and check the IDs and their order.",
  },
  {
    icon: "step-switch",
    title: "Move your traffic",
    body: "Redirect writes, then switch reads once your collections validate.",
  },
];

const benefits = [
  [
    "Hybrid search built in.",
    "Combine vector and keyword search in one query.",
  ],
  [
    "Multi-tenancy from day one.",
    "Keep each customer's data separate as you grow.",
  ],
  [
    "Open source or fully managed.",
    "Run it yourself under BSD-3, or let us run it on Weaviate Cloud.",
  ],
  [
    "Ready for production.",
    "Replication and role-based access control, with Weaviate Cloud audited for SOC 2 Type II.",
  ],
  [
    "Ask your data questions.",
    "The Query Agent turns plain-language questions into database operations, with 1,000 free requests a month.",
  ],
  [
    "Free to start.",
    "A free Weaviate Cloud database with 100,000 objects and no credit card.",
  ],
];

const faqs = [
  [
    "Do I have to re-embed my data?",
    "Not if you keep the same embedding model. You can bring your existing vectors into Weaviate.",
  ],
  [
    "Will my Chroma code work with Weaviate?",
    "No. Weaviate has its own client libraries, including Python, TypeScript, Go and Java, so your query code will change.",
  ],
  [
    "Does this affect open-source Chroma?",
    "No. Chroma's notice only covers Chroma Cloud. If you self-host Chroma and want to move, the same steps apply.",
  ],
  [
    "Can someone help us move?",
    "Yes. Tell us about your migration and our team will help you plan it.",
  ],
];

const deadlines = [
  {
    icon: "deadline-writes",
    title: "Before December 7, 2026",
    body: "Redirect writes and verify that new and updated documents reach Weaviate. Chroma Cloud becomes read-only on December 7.",
  },
  {
    icon: "deadline-reads",
    title: "Before December 22, 2026",
    body: "Finish exports, validate your collections, and switch application reads before Chroma Cloud stops serving queries.",
  },
];

function Tile({ name, className = "" }) {
  return (
    <img
      src={useBaseUrl(`${IMG}/${name}.svg`)}
      alt=""
      aria-hidden="true"
      width="56"
      height="56"
      className={className}
    />
  );
}

function CollectionDiagram() {
  return (
    <figure className="tw-m-0 tw-text-white">
      <img
        src={useBaseUrl(`${IMG}/migration-map.svg`)}
        width="560"
        height="430"
        className="tw-h-auto tw-w-full"
        alt="Chroma Cloud fields mapped to Weaviate: ID faq-42 becomes a UUID plus sourceId, document text becomes the body property, topic billing becomes the topic property, and the embedding becomes the object vector. The same search for “update my invoice” with a billing filter runs against both."
      />
    </figure>
  );
}

export default function ChromaMigrationPage() {
  const [status, setStatus] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("Prompt copied.");
    } catch {
      setStatus("Select the prompt text and copy it manually.");
    }
  }
  return (
    <Layout
      title="Migrate from Chroma Cloud to Weaviate"
      description="Plan a trial migration, verify your search results, and switch your application to Weaviate."
    >
      <main>
        <MetaSEO img="og/website/migrate-chroma.png" />
        <Hero
          title="Migrate from Chroma Cloud"
          subtitle="to Weaviate"
          description="Start with one collection. Map your documents and embeddings, compare search results, then move your application traffic."
          primaryCta={{
            label: "Talk to our team",
            to: "#contact-team",
          }}
          secondaryCta={{
            label: "Start free on Weaviate Cloud",
            to: "https://console.weaviate.cloud/",
          }}
          media={<CollectionDiagram />}
        />

        <section className="tw-bg-[#111111] tw-py-12 tw-text-white">
          <div className="container">
            <h2 id="steps" className="!tw-mb-10">
              Migration steps
            </h2>
            <ol className="tw-m-0 tw-grid tw-list-none tw-gap-4 tw-p-0 md:tw-grid-cols-3">
              {steps.map(({ icon, title, body }) => (
                <li
                  key={icon}
                  className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                >
                  <div className="tw-mb-5 tw-flex tw-items-center tw-gap-4 tw-border-b tw-border-white/10 tw-pb-5">
                    <Tile name={icon} className="tw-shrink-0" />
                    <h3 className="!tw-m-0 tw-text-[#DDEBF2]">{title}</h3>
                  </div>
                  <p className="tw-m-0 tw-font-['Inter'] tw-leading-relaxed tw-text-[#B9C8DE]">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-py-12 tw-text-white">
          <div className="container">
            <h2 className="!tw-mb-10">Why teams move to Weaviate</h2>
            <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
              {benefits.map(([title, body]) => (
                <article
                  key={title}
                  className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                >
                  <h3 className="!tw-mb-4 tw-border-b tw-border-white/10 tw-pb-4 tw-text-[#DDEBF2]">
                    {title}
                  </h3>
                  <p className="tw-m-0 tw-font-['Inter'] tw-leading-relaxed tw-text-[#B9C8DE]">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="tw-bg-[#111111] tw-py-12"
          aria-labelledby="customer-stories"
        >
          <div className="container">
            <p className="tw-m-0 tw-mb-4 tw-font-['Plus_Jakarta_Sans'] tw-text-sm tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5]">
              Trust
            </p>
            <h2 id="customer-stories" className="!tw-mb-4 tw-text-[#DDEBF2]">
              Teams building with Weaviate
            </h2>
            <p className="tw-mb-8 tw-max-w-3xl tw-font-['Inter'] tw-leading-relaxed tw-text-[#B9C8DE]">
              See how teams use Weaviate to build and scale production
              applications.
            </p>
            <div className="tw-grid tw-gap-4 lg:tw-grid-cols-2">
              {useCaseCards
                .filter(({ id }) => id === "loti" || id === "docsbot")
                .map((card) => (
                  <UseCaseCard key={card.id} card={card} compact />
                ))}
            </div>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-py-12 tw-text-white">
          <div className="container">
            <div>
              <h2 className="!tw-mb-10">Chroma Cloud deadlines</h2>
              <p className="!tw-mb-8 tw-text-[#B9C8DE]">
                See{" "}
                <a
                  href="https://www.trychroma.com/cloud-wind-down"
                  className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4"
                >
                  Chroma's wind-down notice
                </a>{" "}
                for the official dates.
              </p>
              <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                {deadlines.map(({ icon, title, body }) => (
                  <div
                    key={icon}
                    className="tw-flex tw-items-start tw-gap-4 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6"
                  >
                    <Tile name={icon} className="tw-shrink-0" />
                    <div>
                      <h3 className="!tw-mb-5">{title}</h3>
                      <p className="tw-m-0 tw-text-[#B9C8DE]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* prompt section 
     <section id="planning-prompt" className="container tw-py-12">
          <div className="tw-grid tw-items-start tw-gap-8 lg:tw-grid-cols-[1fr_1.6fr]">
            <div>
              <Tile name="agent-prompt" className="tw-mb-4" />
              <h2 className="!tw-mb-6">
                Plan your migration with a coding agent
              </h2>
              <p>
                Open your application repository and give your agent this prompt
                to get a migration checklist with file references.
              </p>
              <button
                type="button"
                onClick={copyPrompt}
                className="tw-mt-6 tw-inline-flex tw-min-h-[54px] tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-bg-transparent tw-px-8 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-white tw-transition hover:tw--translate-y-0.5 hover:tw-bg-white/10 focus-visible:tw-outline-offset-4"
                style={{ border: "0.5px solid #ECF4F8" }}
              >
                Copy agent prompt
              </button>
              <span className="tw-block tw-mt-2" role="status">
                {status}
              </span>
            </div>
            <div className="tw-whitespace-pre-line tw-rounded-2xl tw-bg-[#1b2025] tw-p-6 tw-leading-relaxed tw-text-[#DDEBF2] md:tw-p-8">
              {prompt}
            </div>
          </div>
        </section> */}
        <section
          className="tw-bg-[#111111] tw-py-12"
          aria-labelledby="migration-faq"
        >
          <div className="container">
            <h2
              id="migration-faq"
              className="!tw-mb-8 tw-text-center tw-text-[#DDEBF2]"
            >
              Migration FAQ
            </h2>
            <div className="tw-mx-auto tw-grid tw-max-w-[860px] tw-gap-3">
              {faqs.map(([question, answer], index) => {
                const isOpen = expandedQuestion === index;
                return (
                  <div
                    key={question}
                    className="tw-overflow-hidden tw-rounded-[14px] tw-border tw-border-white/10 tw-bg-[#1a1a1a]"
                  >
                    <button
                      type="button"
                      className="tw-flex tw-min-h-[64px] tw-w-full tw-cursor-pointer tw-items-center tw-justify-between tw-gap-5 tw-border-0 tw-bg-transparent tw-px-6 tw-py-4 tw-text-left tw-font-['Plus_Jakarta_Sans'] tw-text-base tw-font-semibold tw-text-[#DDEBF2]"
                      aria-expanded={isOpen}
                      aria-controls={`migration-faq-answer-${index}`}
                      onClick={() => setExpandedQuestion(isOpen ? null : index)}
                    >
                      <span>{question}</span>
                      <span
                        className="tw-text-2xl tw-leading-none tw-text-[#43E2C5]"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div id={`migration-faq-answer-${index}`} hidden={!isOpen}>
                      <p className="tw-m-0 tw-px-6 tw-pb-6 tw-font-['Inter'] tw-leading-relaxed tw-text-[#B9C8DE]">
                        {answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="contact-team">
          <MigrationContactForm />
        </section>
      </main>
    </Layout>
  );
}
