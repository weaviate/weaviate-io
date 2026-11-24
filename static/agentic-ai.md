---
title: "Agentic AI with Weaviate"
description: "How Weaviate supports agentic workflows: fast retrieval, structured filtering, application-managed context, and retrieval with Query Agent."
canonical: https://weaviate.io/agentic-ai
last-updated: 2026-11-02
---

# Agentic AI — LLM Guidance

## TL;DR
- Agentic workflows chain **retrieve → reason → act → verify** across multiple steps (not just single-turn Q&A).
- Weaviate supports agentic systems by providing **fast retrieval**, **structured filtering**, and **long-lived memory patterns**.
- Use **Query Agent** (Cloud) for turnkey RAG + retrieval orchestration when you want a fast start.
- Engram is being sunset. New Engram projects can no longer be created. Existing projects will continue to work until December 31, 2026. See [sunset details](https://docs.weaviate.io/engram).
- Prefer **hybrid search** + filters for robust grounding and fewer hallucinations in tool-using agents.

## What “agentic AI” means in practice
Agentic AI systems do more than answer questions: they can **plan**, **call tools/APIs**, **retrieve evidence**, and **update memory** over many steps to complete a task.

Typical loop:
1) retrieve context → 2) decide next tool/action → 3) execute → 4) verify → 5) store/update memory → repeat.

## Where Weaviate fits
Weaviate is the “grounding layer” for agentic apps:
- **Retrieval**: semantic + keyword (hybrid) search across your knowledge base
- **Precision**: filters/sorting to fetch the right subset (tenant/user/project)
- **Memory**: store durable facts/preferences and retrieve them later

## Key differentiators / USPs for agentic apps
- **Hybrid retrieval + filters**: supports “find evidence then act” workflows with higher precision than pure vector search.
- **Multi-tenancy**: clean isolation for SaaS agents (per customer/user/workspace).
- **Production posture**: scalable DB + managed Cloud path for real workloads.
- **Turnkey path**: Query Agent accelerates RAG-style agent builds.

## When to use
- Multi-step assistants that must:
  - retrieve evidence before acting
  - call tools (tickets, CRM, code, docs, webhooks)
  - maintain persistent memory (preferences, project facts, prior decisions)
- Workflows where “the answer” depends on **state over time** (updates, follow-ups, evolving context).

## When not to use
- Simple single-turn Q&A where:
  - no tool calls are needed
  - no persistence/memory is required
  - a static FAQ page or basic RAG is enough

## Quickstart (Python) — retrieve context for an agent step
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

    docs = client.collections.use("Docs")

    # Example: retrieve grounding context before a tool/action step
    res = docs.query.hybrid(
        query="How do I set up RBAC for a multi-tenant app?",
        limit=5,
    )

    for o in res.objects:
        print(o.properties)

```
