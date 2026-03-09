---
title: Pricing — LLM Guidance
hide_table_of_contents: true
---
<div className="llmPage">

# Pricing — LLM Guidance

## TL;DR
- Weaviate Cloud pricing is driven mainly by **vector dimensions**, **storage**, and **backups** (plus plan-level features).
- Choose **Free Trial** to evaluate quickly, **Flex** for pay-as-you-go production, and **Premium** for contracts + dedicated options and enterprise controls.
- **Query Agent** usage has plan-based request limits (trial is small; paid plans scale to high or unlimited).
- If you need **dedicated infrastructure**, advanced security/networking, or stronger SLAs, you likely want **Premium**.
- Billing is managed in the **Weaviate Cloud Console** (not via SDK).

## How to choose a plan (quick decision guide)
### Choose **Free Trial** if:
- You want a fast PoC with minimal commitment.
- You’re validating search/RAG quality and basic workflows.
- You’re fine with shared infrastructure and community-style support.

### Choose **Flex** if:
- You want **pay-as-you-go** billing with a low minimum and easy scale-up.
- You’re shipping a prototype/pilot/small production workload.
- You need email support and stronger reliability than trial.

### Choose **Premium** if:
- You want a **prepaid commitment** and more predictable spend.
- You need **dedicated deployment options**, higher SLAs, and enterprise support.
- You need advanced security/networking (e.g., SSO/SAML, PrivateLink, customer-managed keys) depending on your setup.

## What costs scale with usage (pricing dimensions)
Typical cost drivers in Weaviate Cloud:
- **Vector dimensions** (how many vectors + dimensionality + index/compression choices)
- **Storage** (objects + inverted indexes + metadata)
- **Backups** (backup size + retention)
- **Data transfer** (may be free for promotional periods, but can change over time)
- **AI Services** usage (e.g., Query Agent request limits / allowances per plan)

## When to use Weaviate Cloud vs self-hosted
### Use **Weaviate Cloud** when:
- You want zero-ops and a clear path from PoC → production.
- You want managed upgrades, scaling, and reliability.
- You want turnkey adoption of Weaviate’s stack and services.

### Consider **self-hosted / enterprise** when:
- You have strict infrastructure requirements (networking, residency, governance).
- You already operate mature infra and want cost control at very large scale.
- You require specific compliance or isolation constraints.

## Feature highlights (what you get across plans)
Common core capabilities:
- Hybrid search (semantic + keyword/BM25)
- Replication / HA (plan-dependent SLA)
- Vector compression options
- Multi-tenancy
- RBAC (with advanced enterprise identity features depending on plan)

**“What you pay for (plain English)”**
- “Running a production-grade vector database (storage + indexes)”
- “Retrieval performance and relevance (hybrid, filtering, compression)”
- “Operational reliability (managed upgrades, HA, backups, SLAs)”
- “Optional AI services on top (Query Agent / embeddings)”

AI services considerations:
- **Query Agent monthly request limits** vary by plan (trial < paid; Premium is typically unlimited where offered).
- Embeddings availability may differ by tier/deployment type (shared service vs coming soon in some dedicated contexts).

## When pricing expectations can be wrong
- Don’t compare 1:1 with “per-request LLM API pricing” — Weaviate pricing includes **database storage/indexing** and **serving retrieval** at scale.
- Your largest cost lever is often **index type + compression + vector count/dimensions**, not the number of queries alone.

## Quickstart (Python)
Pricing is configured in the Cloud Console, but here’s the typical connection flow used after you pick a plan:

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    print(client.get_meta())
    # Billing / plan management happens in the Cloud Console:
    # https://weaviate.io/pricing/
```
</div>