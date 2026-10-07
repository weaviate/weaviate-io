import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";
import appData from "/data/apps.json";

import Hero from "/src/components/ProductPageTemplate/Hero";
import BenefitCards from "/src/components/ProductPageTemplate/BenefitCards";
import FeatureSplit from "/src/components/ProductPageTemplate/FeatureSplit";
import StepsSection from "/src/components/ProductPageTemplate/StepsSection";
import PricingSection from "/src/components/ProductPageTemplate/PricingSection";
import RelatedProducts from "/src/components/ProductPageTemplate/RelatedProducts";
import CTA from "/src/components/ProductPageTemplate/CTA";
import Blogs from "/src/components/ProductPageTemplate/Blogs";

const GUIDEFLOW_ID = "dr973w8bnp";

function GuideflowEmbed({ iframeId = GUIDEFLOW_ID }) {
  React.useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://app.guideflow.com/assets/opt.js"]',
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://app.guideflow.com/assets/opt.js";
      s.async = true;
      s.setAttribute("data-cookieconsent", "ignore");
      s.setAttribute("data-iframe-id", iframeId);
      document.body.appendChild(s);
    } else {
      if (!existing.getAttribute("data-iframe-id")) {
        existing.setAttribute("data-iframe-id", iframeId);
      }
      window.dispatchEvent(new Event("guideflow:check"));
    }
  }, [iframeId]);

  return (
    <div className="tw-relative tw-aspect-[16/10] tw-w-full tw-overflow-hidden tw-rounded-2xl">
      <iframe
        id={iframeId}
        src={`https://app.guideflow.com/embed/${iframeId}`}
        title="Query Agent interactive demo"
        allow="clipboard-read; clipboard-write"
        allowFullScreen
        className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-border-0"
      />
    </div>
  );
}

const benefitCards = [
  {
    title: "Ask in natural language",
    description:
      "Turn plain-language questions into precise database operations.",
    icon: "/img/site/2026/build.svg",
    glow: "rgba(0, 254, 107, 0.16)",
  },
  {
    title: "Dynamic filters and routing",
    description:
      "Apply dynamic filters and route queries across collections automatically.",
    icon: "/img/site/2026/extract.svg",
    glow: "rgba(122, 145, 255, 0.18)",
  },
  {
    title: "Optimized queries and aggregations",
    description:
      "Runtime, context-aware planning optimizes and executes queries for you.",
    icon: "/img/site/2026/shrink.svg",
    glow: "rgba(104, 255, 168, 0.15)",
  },
  {
    title: "Answers with source citations",
    description:
      "Get accurate, relevant results backed by the data stored in Weaviate.",
    icon: "/img/site/2026/share.svg",
    glow: "rgba(0, 183, 226, 0.16)",
  },
];

const featureCards = [
  {
    icon: "/img/site/2026/launch.svg",
    title: "Ask mode",
    description:
      "For developers building agentic applications that require conversational interactions and answers backed by data stored in Weaviate.",
  },
  {
    icon: "/img/site/2026/secure.svg",
    title: "Search mode",
    description:
      "For developers who need out of the box, high quality information retrieval with strong recall and controlled precision.",
  },
  {
    icon: "/img/site/2026/customize.svg",
    title: "Python and TypeScript SDKs",
    description:
      "Integrate retrieval directly into your applications with the Weaviate client libraries.",
  },
];

const steps = [
  {
    title: "Connect your collections",
    description:
      "Point the Query Agent at the collections in your Weaviate Cloud cluster",
    icon: "/img/site/2026/choose.svg",
  },
  {
    title: "Ask a question",
    description:
      "Use the Python or TypeScript client, or the Weaviate Cloud Console, to send a natural-language query",
    icon: "/img/site/2026/add.svg",
  },
  {
    title: "Let the agent plan",
    description:
      "Filters, routing, query optimization and aggregations are handled at runtime",
    icon: "/img/site/2026/friction.svg",
  },
  {
    title: "Get cited results",
    description:
      "Receive accurate answers or search results with source citations",
    icon: "/img/site/2026/create.svg",
  },
];

const plans = [
  {
    name: "Free Plan",
    label: "Per organization",
    price: "1000",
    unit: "requests¹ / month",
  },
  {
    name: "Paid Plan",
    label: "Per organization",
    price: "$30",
    unit: "/ month",
    highlighted: true,
    features: [
      "4000 requests¹ included / month",
      "Additional requests: $0.0001 per model unit²",
    ],
  },
];

const notes = [
  "Requests consumption by query type: Ask (4 requests/query), Search (1 request/query)",
  "Model units consumption varies by query complexity and size of retrieved content",
];

const blogPosts = [
  {
    title: "Introducing the Weaviate Query Agent",
    description:
      "Meet the Query Agent: a Weaviate-native data agent that turns natural language into precise database operations.",
    gradient: "linear-gradient(42deg,#148f54 10%,#106d63 45%,#135d73 100%)",
    link: "/blog/query-agent",
    image: "/img/site/2026/query-agent-blog-intro.png",
    cover: true,
  },
  {
    title: "Accelerating Data Workflows with Query Agent, now GA",
    description:
      "The Query Agent is generally available, with Ask and Search modes for your agentic applications.",
    gradient: "linear-gradient(42deg,#6d25b5 10%,#4d1fa5 55%,#2f1d87 100%)",
    link: "/blog/query-agent-generally-available",
    image: "/img/site/2026/query-agent-blog-ga.jpg",
    cover: true,
  },
  {
    title: "Query Profiling: See Where a Slow Query Spends Its Time",
    description:
      "Understand query performance with built-in profiling for your Weaviate queries.",
    gradient: "linear-gradient(42deg,#2b6f84 10%,#4d6785 55%,#66608b 100%)",
    link: "/blog/query-profiling",
    image: "/img/site/2026/query-agent-blog-profiling.png",
    cover: true,
  },
];

export default function QueryPage() {
  const app = appData.find((app) => app.name === "Query Agent");

  if (!app) return <div>App not found</div>;

  const related = appData.filter(
    (a) => a.category === app.category && a.id !== app.id,
  );

  return (
    <div className="custom-page noBG">
      <Layout
        title="Query Agent | Weaviate Agents"
        description="Query your data in Weaviate using simple human language."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero
            title="Query Agent:"
            subtitle="Query Your Database in Natural Language"
            description="Retrieve exactly what matters, with accurate results and source citations."
            primaryCta={{ label: "Try Free", to: "/go/console" }}
            secondaryCta={{
              label: "Read the Docs",
              to: "https://docs.weaviate.io/query-agent",
            }}
            media={<GuideflowEmbed />}
          />
          <BenefitCards cards={benefitCards} />
          <FeatureSplit
            eyebrow="What is Query Agent?"
            heading="A data agent that speaks your users' language"
            intro="Weaviate's Query Agent is a Weaviate-native data agent that turns natural-language questions into precise database operations."
            visual={
              <img
                src="/img/site/query-agent-screenshot.svg"
                alt="Query Agent in the Weaviate Cloud Console"
                className="tw-h-auto tw-w-full"
              />
            }
            panelHeading="Replace manual query construction"
            panelDescription="It replaces ad-hoc logic with runtime, context-aware planning that optimizes and executes queries across your collections:"
            checks={[
              "Dynamic filters",
              "Cross-collection routing",
              "Query optimization",
              "Aggregations with source citations",
            ]}
            link={{
              label: "Read the blog post to learn more",
              to: "/blog/query-agent-generally-available",
            }}
            cardsHeading="Two modes, one agent"
            featureCards={featureCards}
          />
          <StepsSection
            eyebrow="Get Started"
            heading="Start querying your data in natural language today"
            intro="Use the Python and TypeScript client SDKs, or the Weaviate Cloud Console for fast exploration, validation, and experimentation."
            steps={steps}
            visual={
              <img
                src="/img/site/2026/Query_Agent_Research_Mode.svg"
                alt="Query Agent workflow diagram"
                className="tw-mx-auto tw-block tw-h-auto tw-w-full tw-max-w-[374px]"
              />
            }
          />
          <PricingSection
            title="Simple, usage-based pricing"
            plans={plans}
            notes={notes}
            newsletter={{
              label: "Subscribe to Weaviate Agents newsletter",
              to: "https://events.weaviate.io/weaviate-agents-newsletter",
              description:
                "Stay up to date with the latest news, product updates, and best practices for the Query Agent and other Weaviate Agents.",
            }}
          />
          <RelatedProducts products={related} />
          <CTA
            heading={
              <>
                Query your data
                <br />
                in plain language
              </>
            }
            cta={{ label: "Try Free", to: "/go/console" }}
          />
          <Blogs blogPosts={blogPosts} />
        </main>
      </Layout>
    </div>
  );
}
