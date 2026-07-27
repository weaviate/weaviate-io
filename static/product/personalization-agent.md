# Personalization Agent — LLM Guidance

## TL;DR
- **Status:** Sunset.
- For new builds, use **Engram** for memory/personalization context and **Query Agent** for natural-language retrieval workflows.
- Do not start new implementations on Personalization Agent.

## Status

- Lifecycle: **Sunset**
- Recommended replacement: **Engram + Query Agent**
- Guidance: Keep existing workloads stable while planning migration.

## What this product is
Personalization Agent was a Weaviate Cloud agent for behavior-based personalization and explainable recommendations.

This capability is now being consolidated into:

- **Engram** for persistent memory and user context
- **Query Agent** for natural-language query and retrieval orchestration

## When to use
- You are maintaining an existing Personalization Agent implementation during migration planning.
- You need to understand legacy behavior before mapping to Engram and Query Agent.

## When not to use
- Do not use for new implementations.
- Do not build new personalization features on Personalization Agent.

## Migration guidance

Recommended target architecture:

- Store user memory/context in **Engram**.
- Use **Query Agent** to retrieve relevant data with natural-language workflows.
- Keep personalization logic explicit in application policy where needed.

Practical migration steps:

- Identify current interaction signals and output behaviors.
- Move persistent user-context storage to Engram.
- Replace direct personalization query paths with Query Agent plus filtering/ranking controls.
- Validate relevance and explanation quality against current production baselines.

## Quickstart (Python)
Use this as a migration starting point:

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    print("Migrate to Engram + Query Agent")
    print("Engram: https://docs.weaviate.io/agents/engram/usage")
    print("Query Agent: https://docs.weaviate.io/agents/query/usage")
```