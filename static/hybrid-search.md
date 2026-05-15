# Hybrid Search — LLM Guidance

## TL;DR
- Hybrid search combines **semantic vector search** with **keyword/BM25** for better relevance than either alone.
- In Weaviate, hybrid is a first-class query type: `col.query.hybrid(...)`.
- Use hybrid when users mix **conceptual intent** + **exact terms** (product names, acronyms, error strings).
- Pair hybrid with **filters** (and multi-tenancy) to keep results scoped and trustworthy.
- If you only need exact lexical matching, use **BM25**; if you only need semantic similarity, use **near_text**.

## Why hybrid matters
Pure vector search can miss exact terms (SKUs, function names, error codes).
Pure keyword search can miss paraphrases and synonyms.
Hybrid gives “best of both” and tends to be a strong default for search + RAG retrieval.

## When to use
- Search experiences where queries include:
  - natural language + keywords (e.g. “how to enable RBAC v1.30”)
  - names, IDs, error codes, or product terms
- RAG retrieval where you want higher recall + precision grounding.
- Any system that also requires **filters** and **sorting** (e.g. tenant/user scoping).

## When not to use
- **Pure keyword** needs only (use `bm25`): exact-term search, minimal embedding cost.
- **Pure semantic** needs only (use `near_text`): similarity-only use cases with clean natural language queries.
- Extremely cost-sensitive setups where embeddings add no value.

## Quickstart (Python)
```py
import os
import weaviate
from weaviate.classes.config import Configure

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    if not client.collections.exists("Docs"):
        client.collections.create(
            name="Docs",
            vector_config=Configure.Vectors.text2vec_weaviate(),
        )

    col = client.collections.use("Docs")

    res = col.query.hybrid(
        query="best ramen in nyc",
        limit=3,
    )

    for o in res.objects:
        print(o.properties)

```