import React from "react";
import Layout from "@theme/Layout";
import { MetaSEO } from "/src/theme/MetaSEO";
import appData from "/data/apps.json";

import Hero from "/src/components/ProductPageTemplate/Hero";
import BenefitCards from "/src/components/ProductPageTemplate/BenefitCards";
import FeatureSplit from "/src/components/ProductPageTemplate/FeatureSplit";
import PricingSection from "/src/components/ProductPageTemplate/PricingSection";
import RelatedProducts from "/src/components/ProductPageTemplate/RelatedProducts";
import CTA from "/src/components/ProductPageTemplate/CTA";
import Blogs from "/src/components/ProductPageTemplate/Blogs";

const DOCS_URL = "https://docs.weaviate.io/cloud/embeddings";
const MODEL_ICON = "/img/site/2026/embeddings-icon.svg";

const benefitCards = [
  {
    title: "Fast, flexible development",
    description:
      "Simplify operations with one less API and vendor to manage. Choose between class-leading OSS and proprietary models.",
    icon: "/img/site/2026/build.svg",
    glow: "rgba(0, 254, 107, 0.16)",
  },
  {
    title: "Freedom from rate limits",
    description:
      "Bring models closer to your data to reduce latency, with no artificial constraints on embeddings per second.",
    icon: "/img/site/2026/extract.svg",
    glow: "rgba(122, 145, 255, 0.18)",
  },
  {
    title: "GPU-powered and cost-efficient",
    description:
      "Maximize performance while managing costs with simple, pay-as-you-go pricing.",
    icon: "/img/site/2026/shrink.svg",
    glow: "rgba(104, 255, 168, 0.15)",
  },
  {
    title: "No external provider needed",
    description:
      "Access embedding models directly in Weaviate Cloud without sending data to a third party.",
    icon: "/img/site/2026/share.svg",
    glow: "rgba(0, 183, 226, 0.16)",
  },
];

const modelCards = [
  {
    icon: MODEL_ICON,
    title: "Snowflake Arctic L v2.0 (Default)",
    description:
      "Multilingual support and up to 8,192 tokens. Best for big-scale, complex retrieval.",
  },
  {
    icon: MODEL_ICON,
    title: "Snowflake Arctic M v1.5",
    description:
      "English support and up to 512 tokens. Best for fast, lightweight retrieval.",
  },
  {
    icon: MODEL_ICON,
    title: "ModernVBERT ColModernVBERT",
    description:
      "Multimodal, English support for images and document pages (query text limit: 8,092 tokens). Best for visual documents like PDFs, slides and invoices without OCR preprocessing.",
  },
];

const plans = [
  {
    name: "Snowflake Arctic Embed 1.5",
    label: "Text embedding",
    price: "$0.025",
    unit: "per 1M tokens",
  },
  {
    name: "Snowflake Arctic Embed 2.0",
    label: "Text embedding",
    price: "$0.040",
    unit: "per 1M tokens",
    highlighted: true,
  },
  {
    name: "ModernVBERT ColModernVBERT",
    label: "Multimodal embedding",
    price: "$0.065",
    unit: "per 1M tokens",
  },
];

const blogPosts = [
  {
    title: "Introducing Weaviate Embeddings",
    description:
      "Embedding models hosted alongside your data in Weaviate Cloud, with no third-party provider to manage.",
    image: "/img/site/2026/embeddings-blog-intro.jpg",
    cover: true,
    gradient: "linear-gradient(42deg,#148f54 10%,#106d63 45%,#135d73 100%)",
    link: "/blog/introducing-weaviate-embeddings",
  },
  {
    title: "How to choose an embedding model",
    description:
      "A practical guide to picking the right embedding model for your use case.",
    image: "/img/site/2026/embeddings-blog-choose.png",
    cover: true,
    gradient: "linear-gradient(42deg,#6d25b5 10%,#4d1fa5 55%,#2f1d87 100%)",
    link: "/blog/how-to-choose-an-embedding-model",
  },
  {
    title: "Fine-tune an embedding model",
    description:
      "Learn how fine-tuning an embedding model can improve retrieval for your domain.",
    image: "/img/site/2026/embeddings-blog-finetune.png",
    cover: true,
    gradient: "linear-gradient(42deg,#2b6f84 10%,#4d6785 55%,#66608b 100%)",
    link: "/blog/fine-tune-embedding-model",
  },
];

export default function EmbeddingsPage() {
  const app = appData.find((app) => app.name === "Embeddings");

  if (!app) return <div>App not found</div>;

  const related = appData.filter(
    (a) => a.category === app.category && a.id !== app.id,
  );

  return (
    <div className="custom-page noBG">
      <Layout
        title="Embeddings | Weaviate Cloud"
        description="Generate embeddings within Weaviate Cloud, without rate limits or a third-party provider."
      >
        <MetaSEO img="og/website/home.jpg" />

        <main className="tw-bg-[#111111] tw-text-white">
          <Hero
            title="Embeddings:"
            subtitle="Built into Weaviate Cloud"
            description="Say goodbye to rate limits and the hassle of managing multiple embedding providers."
            primaryCta={
              app.released === "yes"
                ? { label: "Open in Weaviate Cloud", to: "/go/console" }
                : {
                    label: "Request Preview Access",
                    to: "https://events.weaviate.io/embeddings-preview",
                  }
            }
            secondaryCta={{ label: "Read the Docs", to: DOCS_URL }}
            media={
              <img
                src={"/img/site/" + app.overviewImage1}
                alt="Weaviate Embeddings architecture"
                className="tw-block tw-h-auto tw-w-full tw-rounded-2xl"
              />
            }
          />
          <BenefitCards cards={benefitCards} />
          <FeatureSplit
            eyebrow="What is Weaviate Embeddings?"
            heading="Embeddings, right next to your data"
            intro="Weaviate Embeddings is a service in Weaviate Cloud that simplifies the creation and management of vector embeddings."
            visual={
              <img
                src={"/img/site/" + app.overviewImage1}
                alt="Weaviate Embeddings architecture"
                className="tw-mx-auto tw-block tw-h-auto tw-w-full tw-max-w-[520px]"
              />
            }
            panelHeading="Access leading models without leaving Weaviate"
            panelDescription="Developers can use a range of embedding models without needing to send data to an external provider:"
            checks={[
              "One less API and vendor to manage",
              "Class-leading OSS and proprietary models",
              "Lower latency, closer to your data",
              "Simple pay-as-you-go pricing",
            ]}
            link={{
              label: "Read the blog post to learn more",
              to: "/blog/introducing-weaviate-embeddings",
            }}
            cardsHeading="Available models"
            featureCards={modelCards}
          />
          <PricingSection
            title="Simple, pay-as-you-go pricing"
            intro="Pay only for the tokens you embed."
            plans={plans}
          />
          <RelatedProducts products={related} />
          <CTA
            heading={
              <>
                Generate embeddings
                <br />
                inside Weaviate Cloud
              </>
            }
            cta={{ label: "Open in Weaviate Cloud", to: "/go/console" }}
          />
          <Blogs blogPosts={blogPosts} />
        </main>
      </Layout>
    </div>
  );
}
