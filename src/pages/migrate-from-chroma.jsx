import React, { useState } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { MetaSEO } from "/src/theme/MetaSEO";
import Hero from "/src/components/ProductPageTemplate/Hero";

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
        <MetaSEO />
        <Hero
          title="Migrate from Chroma Cloud"
          subtitle="to Weaviate"
          description="Start with one collection. Map your documents and embeddings, compare search results, then move your application traffic."
          primaryCta={{
            label: "Talk to our team",
            to: "#contact-team",
          }}
          secondaryCta={{
            label: "Migration steps",
            to: "#steps",
          }}
          media={<CollectionDiagram />}
        />

        <section className="tw-bg-[#111111] tw-py-12 tw-text-white">
          <div className="container">
            <h2 id="steps" className="!tw-mb-10">
              Migration steps
            </h2>
            <ol className="tw-m-0 tw-grid tw-list-none tw-gap-8 tw-p-0 md:tw-grid-cols-3">
              {steps.map(({ icon, title, body }) => (
                <li key={icon}>
                  <Tile name={icon} className="tw-mb-4" />
                  <h3 className="!tw-mb-5">{title}</h3>
                  <p className="tw-m-0 tw-text-[#B9C8DE]">{body}</p>
                </li>
              ))}
            </ol>
            <div className="tw-mt-10 tw-rounded-2xl tw-bg-[#1b2025] tw-p-6 md:tw-p-8">
              <h2 className="!tw-mb-10">Chroma Cloud deadlines</h2>
              <div className="tw-grid tw-gap-8 md:tw-grid-cols-2">
                {deadlines.map(({ icon, title, body }) => (
                  <div key={icon} className="tw-flex tw-items-start tw-gap-4">
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
        <section id="contact-team">
          <MigrationContactForm />
        </section>
      </main>
    </Layout>
  );
}
