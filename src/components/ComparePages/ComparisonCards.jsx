import React from "react";
import Link from "@docusaurus/Link";

const cards = [
  {
    title: "Weaviate vs OpenSearch",
    description:
      "Compare an AI-native vector database with a search and analytics engine that also supports vector search.",
    to: "/compare/weaviate-vs-opensearch",
  },
  {
    title: "Weaviate vs pgvector",
    description:
      "Compare a dedicated AI database with PostgreSQL vector search for your application and scaling needs.",
    to: "/compare/weaviate-vs-pgvector",
  },
  {
    title: "Migrate from Chroma Cloud",
    description:
      "Plan a migration, compare search results, and move your application traffic to Weaviate.",
    to: "/migrate-from-chroma",
  },
];

export default function ComparisonCards({ exclude, headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
      {cards
        .filter(({ to }) => to !== exclude)
        .map(({ title, description, to }) => (
          <Link
            key={to}
            to={to}
            className="tw-group tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6 tw-no-underline hover:tw-border-white/30 hover:tw-no-underline"
          >
            <Heading className="!tw-mb-4 tw-text-[#DDEBF2] group-hover:tw-text-white">
              {title}
            </Heading>
            <p className="tw-m-0 tw-leading-relaxed tw-text-[#B9C8DE]">
              {description}
            </p>
          </Link>
        ))}
    </div>
  );
}
