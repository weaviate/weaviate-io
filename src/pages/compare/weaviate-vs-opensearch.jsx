import React from "react";
import Link from "@docusaurus/Link";
import ComparisonPage from "/src/components/ComparePages";

const page = {
  competitor: "OpenSearch",
  competitorType: "Search and analytics engine with vector search",
  analyticsPage: "compare-opensearch",
  canonicalUrl: "https://weaviate.io/compare/weaviate-vs-opensearch",
  ogTitle: "Weaviate vs OpenSearch",
  metaTitle: "Weaviate vs OpenSearch: Vector Search & AI",
  metaDescription:
    "Compare Weaviate and OpenSearch for vector search, hybrid retrieval, scaling, and AI application development.",
  subtitle:
    "Weaviate is an AI-native database for vector search and application workflows; OpenSearch is a general-purpose search and analytics engine with vector search capabilities.",
  atAGlance: [
    {
      title: "Choose Weaviate",
      body: "Build vector-first applications with hybrid search, model integrations, and database-level multi-tenancy.",
    },
    {
      title: "Choose OpenSearch",
      body: "Use a flexible search and analytics engine, or add vector search alongside existing OpenSearch workloads.",
    },
    {
      title: "When OpenSearch makes sense",
      body: "Your team already operates it and its search, logging, or analytics capabilities meet your application’s needs.",
    },
  ],
  comparisonRows: [
    {
      capability: "Vector indexes and scale",
      weaviate: "HNSW, flat, dynamic, and HFresh.",
      other:
        "k-NN supports approximate and exact search; methods depend on configuration.",
    },
    {
      capability: "Hybrid search",
      weaviate: "Combine vector and BM25F keyword results in one query.",
      other:
        "Combines keyword and semantic search; configure score or rank fusion.",
    },
    {
      capability: "Filtering",
      weaviate: "Structured filters work with vector search.",
      other: "Filter behavior depends on query method and configuration.",
    },
    {
      capability: "Multi-tenancy",
      weaviate: "Tenant isolation is a database feature.",
      other:
        "Model tenant isolation with indices, document fields, and access controls.",
    },
    {
      capability: "Vectorizers and models",
      weaviate:
        "Integrations for vectorization, reranking, and generative models.",
      other: "ML Commons and ingest pipelines support model workflows.",
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
      other:
        "Conversational search and RAG pipelines; agents and agentic search via the ML Commons plugin. Requires configuring models, connectors and agents.",
    },
    {
      capability: "Compression",
      weaviate: (
        <a href="https://docs.weaviate.io/weaviate/configuration/compression">
          Product (PQ), binary (BQ), scalar (SQ) and rotational (RQ) quantization.
        </a>
      ),
      other: (
        <a href="https://docs.opensearch.org/latest/vector-search/optimizing-storage/knn-vector-quantization/">
          Byte and FP16 vectors, scalar and product quantization, and binary
          quantization (incl. disk-based mode); options vary by engine and
          version.
        </a>
      ),
    },
    {
      capability: "Scaling and replication",
      weaviate: "Sharding, replication, and cluster deployment options.",
      other:
        "Distributed indices and cluster replication; plan capacity and topology.",
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
        "Self-managed open source, or managed services such as Amazon OpenSearch Service.",
    },
    {
      capability: "Operations and license",
      weaviate: "Database-focused operations; BSD-3-Clause licensed.",
      other:
        "Search-cluster and plugin operations; Apache-2.0 licensed.",
    },
  ],
  sources: (
    <>
      OpenSearch supports vector and hybrid search; compare setup and
      operational fit for your workload. See the{" "}
      <a href="https://docs.opensearch.org/latest/vector-search/">
        OpenSearch vector search docs
      </a>{" "}
      and{" "}
      <a href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/">
        hybrid search docs
      </a>
      , and Weaviate’s <Link to="/hybrid-search">hybrid search</Link> and{" "}
      <a href="https://docs.weaviate.io/weaviate/concepts/vector-index">
        vector index documentation
      </a>
      .
    </>
  ),
  benefits: [
    {
      title: "Hybrid search, one query.",
      icon: "enterprise-search.svg",
      body: "Blend keyword and vector relevance through Weaviate’s hybrid search.",
    },
    {
      title: "Multi-tenancy built in.",
      icon: "database-icon-06.svg",
      body: "Isolate customer data with tenant-level database support.",
    },
    {
      title: "Model integrations.",
      icon: "database-icon-03.svg",
      body: "Connect vectorizer, reranker, and generative AI integrations to retrieval.",
    },
    {
      title: "An AI database.",
      icon: "database-icon-05.svg",
      body: "Build around vectors, structured data, and generative workflows.",
    },
    {
      title: "Choose how to run it.",
      icon: "enterprise-infrastructure.svg",
      body: (
        <>
          Use Shared or Dedicated Weaviate Cloud, or self-manage with Community,{" "}
          <Link to="/enterprise-edition">Enterprise</Link> or Platform Edition.
        </>
      ),
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
      title: "Start with one collection or index.",
      body: "Copy a representative dataset and its metadata.",
    },
    {
      title: "Compare search results.",
      body: "Test the same queries and filters; assess relevance, latency, and cost.",
    },
    {
      title: "Move traffic gradually.",
      body: "Validate writes and reads before shifting more workload.",
    },
  ],
  faqs: [
    {
      question: "Is OpenSearch suitable for vector search?",
      answer:
        "Yes. OpenSearch supports approximate and exact k-NN search, as well as hybrid search. Evaluate index configuration, operations, and relevance against your workload.",
    },
    {
      question: "What are OpenSearch vector search limitations?",
      answer:
        "There is no universal limitation for every deployment. Performance and operational needs depend on search method, index design, filters, and cluster configuration.",
    },
    {
      question: "Can Weaviate run alongside OpenSearch?",
      answer:
        "Yes. You can evaluate Weaviate for a vector application while keeping OpenSearch for existing search or analytics workloads.",
    },
    {
      question: "How hard is it to migrate from OpenSearch?",
      answer:
        "It depends on your schemas, pipelines, queries, and application integrations. Start with one index and compare results before moving traffic.",
    },
    {
      question: "Does Weaviate support hybrid search?",
      answer:
        "Yes. Weaviate combines vector search and BM25F keyword search and lets you configure their relative weights and fusion method.",
    },
    {
      question: "Is Weaviate open source?",
      answer:
        "Yes. Community Edition is BSD-3-Clause, with no time limits or usage caps. Managed Weaviate Cloud and other editions are also available.",
    },
  ],
};

export default function WeaviateVsOpenSearchPage() {
  return <ComparisonPage page={page} />;
}
