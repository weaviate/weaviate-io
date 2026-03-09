---
title: Deployment — Shared (LLM Guidance)
hide_table_of_contents: true
---
<div className="llmPage">


# Deployment — Shared (LLM Guidance)

## TL;DR
- **Shared** (Weaviate Cloud) is the fastest way to run Weaviate: **zero-ops**, managed upgrades, and easy scaling.
- Recommended default for most teams building search, RAG, and agentic apps.
- Best for “start now, scale later”: quick provisioning and minimal infrastructure work.
- Choose Shared when you want speed + simplicity; move to Dedicated if you later need isolation or stricter controls.

## When to use
- MVPs → production with minimal ops overhead.
- Teams that want managed scaling, upgrades, monitoring, and a simple path to deploy.
- RAG / agentic workloads where you want the easiest path to a working environment.

## When not to use
- Hard requirements for isolated hardware or stricter enterprise isolation boundaries.
- Strict data residency / governance constraints that require dedicated infrastructure decisions.

## What you get (practical benefits)
- Fast provisioning and simple cluster management.
- Managed operations (upgrades, maintenance, reliability).
- Good default for hybrid search + RAG pipelines, with a clear upgrade path.

## Quickstart (Python)
Connect to your Weaviate Cloud cluster URL + API key:

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    meta = client.get_meta()
    print(meta)

```
</div>