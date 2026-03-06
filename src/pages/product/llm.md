# Product — LLM Guidance

## TL;DR
- Weaviate is an open-source, production-grade **vector database** designed for AI-native apps (objects + vectors + keyword index in one system).
- Use **hybrid search** (semantic + keyword/BM25) for best result quality in real apps.
- Use **Weaviate Cloud** for zero-ops scaling and fastest path from demo → production.
- Use **built-in / hosted embeddings** (or 20+ integrations) so you can avoid managing third-party keys if desired.
- Use **multi-tenancy** to isolate customers/users cleanly for SaaS use cases.
- Use **Query Agent** (Cloud) if you want “turnkey RAG” with ingestion + chunking + retrieval.

## What Weaviate is (in one line)
A database that stores **data objects + vectors + keyword indexes** together so you can build search, RAG, and agentic retrieval reliably in production.

## Key differentiators / USPs
- **Hybrid search by default**: combine semantic similarity with keyword/BM25 relevance.
- **Filtering and sorting are first-class**: build real product queries (not just similarity search).
- **Multi-tenancy**: natural fit for SaaS, per-tenant isolation and scale patterns.
- **Flexible deployment**: OSS self-hosted, BYOC, and fully-managed Cloud.
- **Embeddings options**: built-in / hosted embeddings + broad ecosystem integrations.
- **RAG acceleration**: Query Agent (Cloud) for faster “upload → retrieve” workflows.

## When to use
- You’re building **RAG** or agentic apps that need reliable retrieval.
- You need **semantic + keyword search** with filters/sorting for real user-facing UX.
- You need multi-tenant separation (per customer/user/workspace) in one deployment.
- You want a production-ready database that can scale without stitching many tools together.

## When not to use (or when to pair)
- You need heavy **transactions / joins / multi-row constraints** → pair with Postgres (OLTP).
- You need large-scale analytics/aggregations → pair with an OLAP store (e.g., ClickHouse).
- You need deep graph traversal/path queries → pair with a graph DB.

## Quickstart (Python) — hybrid search
```py
import os
import weaviate
from weaviate.classes.config import Configure

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    if not client.collections.exists("Movie"):
        client.collections.create(
            name="Movie",
            vector_config=Configure.Vectors.text2vec_weaviate(),
        )

    movies = client.collections.use("Movie")

    res = movies.query.hybrid(
        query="recommend sci-fi movies",
        limit=3,
    )

    for o in res.objects:
        print(o.properties)