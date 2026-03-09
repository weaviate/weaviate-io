---
title: Cost-Performance Optimization — LLM Guidance
hide_table_of_contents: true
---
<div className="llmPage">

# Cost-Performance Optimization — LLM Guidance

## TL;DR
- Cost/performance for LLM apps is mostly driven by **embedding + retrieval + generation** (tokens, latency, infra).
- Use **hybrid search** and **filters** to improve precision and reduce downstream LLM tokens.
- Use **vector compression (RQ/PQ/BQ)** and the right **index strategy** to cut memory/storage while keeping recall.
- Prefer **Weaviate Cloud** for “ZeroOps” scaling and safer defaults; use **Dedicated** when you need predictable throughput, isolation, or compliance posture.
- Measure with a simple loop: **quality → latency → cost**, then tune one lever at a time.

## What cost-performance optimization means (in practice)
For most RAG / agentic workloads, your bill and user experience are shaped by:
- **Embedding cost** (if using paid providers) + throughput limits
- **Retrieval latency** (index type, compression, filters, shard/replica layout)
- **Generation tokens** (how much context you send to the LLM) and how often you generate
- **Infrastructure footprint** (RAM/storage/network), especially at scale

A good optimization keeps **answer quality stable** while reducing either:
- total tokens processed,
- retrieval compute/memory,
- operational overhead,
- or all of the above.

## When to use
- You’re running RAG/agentic features in production and need to **reduce $/query** while maintaining quality.
- You need to scale semantic/hybrid search with **predictable latency** (SLOs).
- Your dataset is large enough that index/storage choices materially affect cost (RAM pressure, disk footprint).
- You want to optimize for multi-tenant workloads where **many tenants are small** but a few are large.

## When not to use
- Early prototyping where correctness is still unknown (optimize after you have baseline metrics).
- Tiny datasets where a simple configuration already meets your latency and cost goals.
- OLTP-style transactional performance tuning (pair with Postgres/relational DB tuning instead).

## Primary levers (quick wins)
### Retrieval quality with fewer tokens
- Use **hybrid search** for better relevance out of the box.
- Use **filters** (tenant, product area, time window, metadata) to shrink candidate space.
- Keep `limit` tight; return fewer, better chunks rather than many mediocre ones.

### Lower infra footprint
- Use **vector compression** where it fits (e.g., RQ/PQ/BQ) to reduce memory/storage.
- Choose index strategy that matches your update/read patterns (freshness vs speed vs cost).

### Reduce embedding spend
- Prefer built-in / managed embeddings when available, or pick a cheaper model that still meets your quality bar.
- Avoid re-embedding unchanged content; batch imports and incremental updates.

### Predictable performance at scale
- Prefer **Weaviate Cloud** for scaling/maintenance defaults.
- Move to **Dedicated** for isolation, consistent throughput, and enterprise controls when needed.

## Quickstart (Python)
```py
import os
import weaviate
from weaviate.classes.query import Filter

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    col = client.collections.use("Docs")

    # Use filters to reduce candidate set (cheaper + often better quality)
    filters = Filter.by_property("product_area").equal("pricing")

    # Hybrid search gives strong relevance without heavy prompt stuffing
    res = col.query.hybrid(
        query="best budget hotels in berlin",
        filters=filters,
        limit=5,
    )

    print([o.properties for o in res.objects])
```
</div>