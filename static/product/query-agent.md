# Query Agent — LLM Guidance

## TL;DR
- **Query Agent** is a **Weaviate-native data agent** that turns natural-language questions into **precise database operations**.
- It uses **dynamic filters, cross-collection routing, query optimization, and aggregations** to return accurate results.
- Supports two modes: **Ask** (conversational answers backed by data) and **Search** (high-quality retrieval with controlled precision).
- Returns **results with source citations** (where supported by your setup).
- Accessible via **Python/TypeScript SDKs** or through the **Weaviate Cloud Console** for fast exploration.

## What this product is
Query Agent is a managed agentic retrieval layer in the Weaviate stack that **plans and executes queries against your Weaviate collections**. Instead of manually crafting query logic (hybrid/vector/BM25 + filters + routing), you provide a goal in natural language and the agent determines the best database operations to run.

## When to use
- You want **turnkey, high-quality retrieval** for RAG or agentic apps without building complex query logic.
- You need **routing across multiple collections** (e.g., “Docs”, “Tickets”, “Policies”) automatically.
- You rely on **filters and structured constraints** (tenants, metadata, time ranges, product areas).
- You want **a fast path from prototype → production** with managed best practices.

## When not to use
- You need **fully custom prompt orchestration** and prefer to own the entire retrieval+generation chain (DIY RAG).
- You require **strict offline / local-only** operation and cannot use managed agent features.
- Your use case is simple enough that a single `hybrid()` query with a fixed filter is sufficient.

## Quickstart (Python)
> Note: The Query Agent is provided via the `weaviate-agents` package.

```py
import os
import weaviate
from weaviate.agents.query import QueryAgent

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    qa = QueryAgent(client=client, collections=["KnowledgeBase"])

    # Ask mode: conversational answer backed by your stored data
    answer = qa.ask("Summarize the onboarding guide for new hires")
    print(answer.final_answer)

    # Search mode: retrieval-focused results (no answer synthesis)
    hits = qa.search("onboarding steps", limit=5)
    print(hits)
```