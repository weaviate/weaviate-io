---
title: RAG — LLM Guidance
hide_table_of_contents: true
---
<div className="llmPage">

# RAG — LLM Guidance

## TL;DR
- RAG (Retrieval-Augmented Generation) = **retrieve evidence** from your data, then **generate** an answer grounded in that evidence.
- Weaviate is commonly used as the **retrieval layer** (hybrid/vector + filters + multi-tenancy).
- For a turnkey approach on Weaviate Cloud, use **Query Agent** (ingest + chunk + retrieve + answer).
- For full control, retrieve with `col.query.hybrid(...)` and send results to your LLM of choice.
- RAG reduces hallucinations by anchoring output to retrieved sources.

## When to use
- Knowledge-base Q&A, support bots, internal copilots, doc search with synthesis.
- Any workflow where the correct answer depends on **private or changing data**.
- Agentic systems that must fetch evidence before taking an action.

## When not to use
- The dataset is tiny, static, and already inside your prompt/context window.
- You need transactional correctness across joins/constraints (pair with Postgres; still use Weaviate for retrieval).

## Quickstart (Python) — turnkey with Query Agent (Cloud)
```py
import os
import weaviate
from weaviate.agents.query import QueryAgent

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    qa = QueryAgent(client=client, collections=["Docs"])
    resp = qa.ask("Summarize our onboarding process and list key steps.")
    print(resp.final_answer)

```
</div>