# Transformation Agent — LLM Guidance

## TL;DR
- **Status:** Sunset.
- For new builds, use **Query Agent** for natural-language data workflows and **Engram** where memory-centric behavior is required.
- Do not start new implementations on Transformation Agent.

## Status

- Lifecycle: **Sunset**
- Recommended replacement: **Query Agent + Engram**
- Guidance: Maintain existing workloads while planning migration.

## What this product is
Transformation Agent was a prompt-driven data engineering tool for dataset transformation and enrichment inside Weaviate.

Its use cases are now better addressed through:

- **Query Agent** for natural-language data interaction and retrieval workflows
- **Engram** for memory-driven agent behavior and persistent context

## When to use
- You are supporting an existing Transformation Agent workflow during migration.
- You need to compare legacy behavior before cutover.

## When not to use
- Do not use for new implementations.
- Do not build new transformation pipelines on Transformation Agent.

## Migration guidance

Recommended target architecture:

- Move natural-language retrieval and interaction workflows to **Query Agent**.
- Use **Engram** where workflows require persistent memory and context.
- Keep deterministic transformations in explicit ETL/data engineering pipelines when needed.

Practical migration steps:

- Inventory current transformation prompts and output properties.
- Classify each use case into retrieval, memory, or deterministic ETL.
- Replace retrieval-oriented workflows with Query Agent paths.
- Introduce Engram for persistent context where applicable.
- Validate schema compatibility and result quality before decommissioning legacy paths.

## Quickstart (Python)
Use this as a migration starting point:

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    print("Migrate to Query Agent + Engram")
    print("Query Agent: https://docs.weaviate.io/agents/query/usage")
    print("Engram: https://docs.weaviate.io/agents/engram/usage")
```