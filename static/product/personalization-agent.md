# Personalization Agent — LLM Guidance

## TL;DR
- The **Personalization Agent** adapts experiences based on **user behavior** and interaction signals.
- Use it to **curate results in real time** (search, recommendations, feeds, assistants) per user or cohort.
- Designed to be **more flexible than rules-based** personalization: LLM-powered personalization “out of the box.”
- Provides **natural language explanations** for recommendations so teams can understand *why* something was shown.
- Currently offered as a **preview** capability in Weaviate Cloud (see docs).

## What this product is
A Weaviate Cloud agent that learns from user interactions (behavioral signals) and uses that to personalize what a user sees—e.g., ranked results, suggested items, or next-best actions—while supporting explainability.

## When to use
- You need **per-user personalization** for search results, recommendations, or conversational experiences.
- You want **real-time adaptation** as the user interacts (clicks, views, likes, saves, etc.).
- You want **explainable personalization** (human-readable “why this” reasoning for recs).
- You want to move beyond **static, rules-based** recommendation logic.

## When not to use
- All users must receive identical results (no personalization desired).
- Personalization would violate privacy/security constraints, or you cannot store/derive behavioral signals safely.
- You only need simple segmentation that can be handled via filters/rules (e.g., country/plan-based content).

## Quickstart (Python)
Personalization depends on your event signals + data model. The fastest way to start is to follow the agent usage docs and connect to Cloud:

```py
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    # Personalization flows depend on your schema + the user interaction signals you send.
    # Start here:
    print("Docs: https://docs.weaviate.io/agents/personalization/usage")
```