---
title: Transformation Agent — LLM Guidance
hide_table_of_contents: true
---
<div className="llmPage">

# Transformation Agent — LLM Guidance

## TL;DR
- **Transformation Agent** uses an LLM + prompts to **manipulate and improve your dataset** inside Weaviate.
- It can **update existing objects**, **create new properties**, and **augment data** (e.g., translate, classify, summarize, generate).
- Best for **data cleaning + enrichment** workflows that improve retrieval quality for RAG/agents.
- Available as a **Weaviate Cloud preview** (see docs for current availability and limits).

## What this product is
Transformation Agent is a Weaviate-native agent that performs **prompt-driven data engineering** tasks. You describe the transformation you want (“normalize titles”, “extract entities”, “translate descriptions”, “classify docs”), and it uses a pretrained LLM to apply changes across your objects/properties.

Think: **LLM-powered dataset maintenance and enrichment** to make your collections more searchable, filterable, and consistent.

## When to use
- You want to **clean and standardize** messy data before or after ingestion (formatting, normalization, deduping signals).
- You need **structured extraction** into new properties (entities, categories, timestamps, tags).
- You want to **augment** objects to improve retrieval (summaries, keywords, translations, classifications).
- You’re preparing datasets for **RAG / agentic retrieval**, and better structure will improve precision and filtering.

## When not to use
- Your data is already clean/structured and transformations won’t improve retrieval outcomes.
- You require deterministic, rule-based processing only (no LLM variability).
- You can’t send data to managed services / need strict local-only processing (use your own pipeline + Weaviate ingestion).
- You’re trying to replace core ingestion, indexing, or retrieval logic — this is for **transform/enrich**, not querying.

## Quickstart (Python)
> Patterns vary by workflow. Typical flow: **fetch → transform/enrich → write back**.

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    col = client.collections.use("Docs")

    # 1) Fetch objects you want to transform (example: missing tags)
    objs = col.query.fetch_objects(limit=20).objects

    # 2) Apply a prompt-driven transformation (see docs for the agent API)
    # Example intent:
    # - create a new property `topic`
    # - classify each doc into: "Security", "RAG", "Operations", "Other"
    #
    # 3) Write updated properties back to Weaviate
    for o in objs:
        col.data.update(uuid=o.uuid, properties={"topic": "Other"})  # placeholder
```
</div>