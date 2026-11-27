import React from "react";
import Link from "@docusaurus/Link";
import ComparisonPage from "/src/components/ComparePages";

const page = {
  competitor: "pgvector",
  competitorType: "PostgreSQL extension for vector similarity search",
  analyticsPage: "compare-pgvector",
  canonicalUrl: "https://weaviate.io/compare/weaviate-vs-pgvector",
  ogTitle: "Weaviate vs pgvector",
  metaTitle: "Weaviate vs pgvector: Vector Database Comparison",
  metaDescription:
    "Compare Weaviate and pgvector for vector search, filtering, hybrid retrieval, scaling, and AI applications.",
  subtitle:
    "pgvector adds vector similarity search to PostgreSQL; Weaviate is a dedicated AI database for vector search, hybrid retrieval, and model-powered applications.",
  atAGlance: [
    {
      title: "Choose Weaviate",
      body: "Use a dedicated AI database when vector search is a core workload and you need database features designed around it.",
    },
    {
      title: "Choose pgvector",
      body: "Keep vectors and relational data together in an existing PostgreSQL application.",
    },
    {
      title: "When pgvector makes sense",
      body: "It can fit production workloads when PostgreSQL fits your application and benchmarks meet your needs.",
    },
  ],
  comparisonRows: [
    {
      capability: "Vector indexes and scale",
      weaviate: "HNSW, flat, dynamic, and HFresh.",
      other:
        "Exact search by default; approximate HNSW and IVFFlat indexes available.",
    },
    {
      capability: "Hybrid search",
      weaviate: "Combine vector and BM25F keyword search in one query.",
      other:
        "Compose keyword and vector scoring in SQL; no single built-in hybrid search API.",
    },
    {
      capability: "Filtering",
      weaviate: "Structured filters work with vector search.",
      other: "Use SQL filters; measure filtered ANN recall and query performance.",
    },
    {
      capability: "Multi-tenancy",
      weaviate: "Tenant isolation is a database feature.",
      other:
        "Implement tenant boundaries with PostgreSQL schemas, tables, or row-level controls.",
    },
    {
      capability: "Vectorizers and models",
      weaviate:
        "Integrations for vectorization, reranking, and generative models.",
      other: "Bring model workflows through your application or other services.",
    },
    {
      capability: "RAG and agents",
      weaviate: (
        <>
          Generative search integrations;{" "}
          <Link to="/product/query-agent">Query Agent</Link> supports
          natural-language queries.
        </>
      ),
      other: "Typically built in the application or another service.",
    },
    {
      capability: "Compression",
      weaviate: (
        <a href="https://docs.weaviate.io/weaviate/configuration/compression">
          Product (PQ), binary (BQ), scalar (SQ) and rotational (RQ) quantization.
        </a>
      ),
      other:
        "Half-precision (halfvec), binary quantization (bit) and sparse vectors (sparsevec); tune for recall vs. memory.",
    },
    {
      capability: "Scaling and replication",
      weaviate: "Sharding, replication, and cluster deployment options.",
      other: "Scale and replicate as part of your PostgreSQL architecture.",
    },
    {
      capability: "Deployment",
      weaviate: (
        <>
          Fully managed Weaviate Cloud (Shared or Dedicated), or self-managed
          with <Link to="/community-edition">Community Edition</Link> (open
          source), <Link to="/enterprise-edition">Enterprise Edition</Link> or{" "}
          <Link to="/platform-edition">Platform Edition</Link>. See{" "}
          <Link to="/deployment">deployment options</Link>.
        </>
      ),
      other:
        "Self-managed PostgreSQL, or most managed Postgres services (e.g. Amazon RDS, Cloud SQL, Azure, Supabase).",
    },
    {
      capability: "Operations and license",
      weaviate: "Dedicated database operations; BSD-3-Clause licensed.",
      other:
        "Keep vector data in PostgreSQL; pgvector uses the PostgreSQL License.",
    },
  ],
  sources: (
    <>
      pgvector supports exact and approximate search, with HNSW and IVFFlat
      indexes. Its documentation notes HNSW build-time and memory trade-offs.
      See the <a href="https://github.com/pgvector/pgvector">pgvector docs</a>{" "}
      and Weaviate’s <Link to="/hybrid-search">hybrid search</Link> and{" "}
      <a href="https://docs.weaviate.io/weaviate/concepts/vector-index">
        vector index documentation
      </a>
      .
    </>
  ),
  benefits: [
    {
      title: "Hybrid search built in.",
      icon: "enterprise-search.svg",
      body: "Combine keyword and vector rankings with one search API.",
    },
    {
      title: "Designed around vector workloads.",
      icon: "database-icon-05.svg",
      body: "Keep vector search in a database purpose-built for AI applications.",
    },
    {
      title: "Multi-tenancy from day one.",
      icon: "database-icon-06.svg",
      body: "Use tenant-level isolation without designing it from scratch.",
    },
    {
      title: "Connect model providers.",
      icon: "database-icon-03.svg",
      body: "Add vectorization, reranking, or generative integrations to retrieval.",
    },
    {
      title: "Keep Postgres where it fits.",
      icon: "enterprise-infrastructure.svg",
      body: "Run Weaviate alongside PostgreSQL rather than replacing your relational database.",
    },
    {
      title: "Free to evaluate.",
      icon: "enterprise-cloud.svg",
      body: (
        <>
          Start with Weaviate Cloud; see current plan limits on{" "}
          <Link to="/pricing">pricing</Link>.
        </>
      ),
    },
  ],
  migrationSteps: [
    {
      title: "Start with one collection or table.",
      body: "Copy representative records and vectors.",
    },
    {
      title: "Compare search results.",
      body: "Test matching queries, filters, relevance, latency, and resource use.",
    },
    {
      title: "Move traffic deliberately.",
      body: "Keep PostgreSQL for relational workloads and route vector retrieval to Weaviate where it fits.",
    },
  ],
  faqs: [
    {
      question: "Is pgvector good enough for production?",
      answer:
        "It can be. pgvector supports exact and approximate search; suitability depends on your data, query patterns, latency targets, and PostgreSQL capacity.",
    },
    {
      question: "When should I consider a pgvector alternative?",
      answer:
        "Consider a dedicated vector database when vector search, filtering, tenancy, or AI retrieval needs call for a separate system—or when benchmarks show PostgreSQL no longer fits.",
    },
    {
      question: "Does pgvector support hybrid search?",
      answer:
        "You can combine SQL-based keyword and vector scoring, but pgvector does not provide a single built-in hybrid search API like Weaviate’s.",
    },
    {
      question: "Can Weaviate work alongside Postgres?",
      answer:
        "Yes. Keep PostgreSQL for relational data and use Weaviate as a dedicated vector search layer.",
    },
    {
      question: "How hard is it to migrate from pgvector?",
      answer:
        "It depends on your schema, SQL queries, and application code. Start with a representative table, import its vectors and metadata, then compare results.",
    },
    {
      question: "Is Weaviate open source?",
      answer:
        "Yes. Community Edition is BSD-3-Clause, with no time limits or usage caps. Managed Weaviate Cloud and other editions are also available.",
    },
  ],
};

export default function WeaviateVsPgvectorPage() {
  return <ComparisonPage page={page} />;
}
