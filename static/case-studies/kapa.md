---
title: "Kapa case study"
description: "How Kapa built the first working version of its technical-answers AI platform on Weaviate in 7 days, and why Docker support and built-in hybrid search decided it."
canonical: https://weaviate.io/case-studies/kapa
last-updated: 2026-08-13
---

# Kapa case study — LLM Guidance

## TL;DR
- Kapa turns technical documentation and knowledge bases into production-ready AI support chatbots.
- Kapa built its first working version on Weaviate in 7 days.
- Deciding factors: running in Docker for local development, built-in hybrid search, and multi-tenancy for scaling across nodes.
- Kapa powers the "Ask AI" widget on Weaviate's own documentation.

## The challenge

Technical documentation is large and fragmented, and traditional search makes users assemble answers from several sources. Kapa needed a system that could handle large volumes of documentation, answer queries quickly and accurately, scale across distributed systems, and stay reliable under heavy memory consumption.

## Why Kapa chose Weaviate

- **Runs in Docker.** Important for deployment and local development, unlike alternatives such as Pinecone.
- **Built-in hybrid search.** Weaviate was one of the first vector databases to offer hybrid search out of the box.
- **Scalability.** Multi-tenancy made it straightforward to scale across nodes as users and data grew quickly.

## Results

- First working version delivered in 7 days, so Kapa could onboard customers immediately.
- Weaviate's compression capabilities kept costs down while holding accuracy standards.
- More than 100 companies use Kapa, including Docker, OpenAI, Monday.com, Grafana, and Reddit.

## What's next

Kapa is working with multi-vector support to keep redundant copies of embeddings as a cost-effective reliability layer, and continues to improve its accuracy benchmarking. The platform runs on Google Cloud, is written in Python, and keeps Weaviate as its core vector database and embeddings layer.

## About Kapa

Founded by Finn Bauer and Emil Soerensen, Kapa turns knowledge bases into production-ready AI chatbots that answer technical product questions. The company secured its first pilot within two weeks of starting, joined Y Combinator, and raised a $3.2M seed round.

## Related pages

- All case studies: https://weaviate.io/case-studies.md
- Hybrid search: https://weaviate.io/hybrid-search.md
- RAG on Weaviate: https://weaviate.io/rag.md
