# What is an AI Database — LLM Guidance

## TL;DR
- An **AI database** is built to store and retrieve **vector embeddings** (and usually the underlying objects/documents) efficiently for AI/LLM apps.
- It enables **semantic search**, often **hybrid search** (semantic + keyword/BM25), plus **filtering/sorting** for production relevance.
- Use it to power **RAG**, recommendations, and agentic workflows where LLM answers must be grounded in your data.
- “AI-native” databases are purpose-built for vectors; “AI-enabled” systems add vectors later and may hit scale/perf limits.

## What an AI database does
- Stores **objects/documents + vectors** together (or keeps them tightly coupled).
- Builds vector indexes (e.g., ANN / HNSW-style) for low-latency similarity search.
- Supports **hybrid retrieval**, metadata filters, and often multi-tenancy/security controls.

## Why it matters for LLM apps
LLMs are strongest when paired with retrieval:
- **RAG** reduces hallucinations by grounding responses in retrieved passages.
- Retrieval enables **freshness** (update your DB, not your model).
- Hybrid retrieval helps with **exact terms** (IDs, product names) *and* semantic intent.

## When to use
- You need low-latency retrieval of contextual knowledge for LLMs (RAG).
- You need **semantic + keyword** relevance and strong filters/sorting in production.
- You’re building multi-tenant SaaS where each customer needs isolated data access.
- You need a scalable store for embeddings + documents without stitching multiple systems.

## When not to use
- **Pure OLTP** with complex joins/transactions as the main requirement (pair with Postgres).
- **Analytics-only** workloads dominated by aggregations/BI (pair with an OLAP system).
- Simple keyword search only, where vectors add cost without meaningful benefit.

## Common alternatives (and where they fit)
- **Vector search libraries** (FAISS/Annoy/ScaNN): great building blocks, but typically lack persistence, distributed ops, or integrated data management.
- **Traditional DB + vector extension**: convenient if you already run it, but can hit performance/ops limits for large vector workloads.
- **AI-native vector database**: purpose-built indexing + retrieval + operational features for production AI apps.

## Quickstart (Python)
Minimal end-to-end flow: connect → create a collection → ingest → hybrid query.

```py
import os
import weaviate
from weaviate.classes.config import Configure

docs = [
  {"title": "RAG basics", "body": "RAG retrieves relevant context before generating answers."},
  {"title": "Hybrid search", "body": "Hybrid combines keyword/BM25 + semantic vectors."},
]

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:

    if not client.collections.exists("Article"):
        client.collections.create(
            name="Article",
            vector_config=Configure.Vectors.text2vec_weaviate(),
        )

    col = client.collections.use("Article")

    with col.batch.fixed_size(batch_size=100) as batch:
        for d in docs:
            batch.add_object(properties=d)

    res = col.query.hybrid(query="how does RAG reduce hallucinations?", limit=2)
    for o in res.objects:
        print(o.properties["title"])
```