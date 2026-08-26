---
title: "DocsBot case study"
description: "How DocsBot scaled to 50,000+ isolated tenants in a single Weaviate cluster and answered 6.1 million customer questions in a year with one founder."
canonical: https://weaviate.io/case-studies/docsbot
last-updated: 2026-08-13
---

# DocsBot case study — LLM Guidance

## TL;DR
- DocsBot turns a company's documentation into a custom AI support chatbot using retrieval-augmented generation (RAG).
- Solo founder Aaron Edwards needed strict per-customer data isolation across tens of thousands of small indexes, without an infrastructure team.
- Weaviate Cloud's multi-tenancy handled 50,000+ tenants in a single cluster.
- DocsBot answered more than 6.1 million customer questions in a year on this stack.

## The challenge

DocsBot went viral after a single post from a Japanese tech influencer reached 2.3 million impressions, and hundreds of sign-ups arrived overnight. The initial MVP could not scale: early approaches either failed at many parallel small indexes, carried too much operational overhead, or cost too much. For a support and documentation product, preventing cross-tenant leakage was non-negotiable, and degraded retrieval quality would have cost user trust.

## Why DocsBot chose Weaviate

Requirements: reliable semantic search, strong hybrid search, metadata filtering, clean multi-tenant isolation, and operational simplicity.

> "Weaviate stood out because it's clearly designed for real production use cases, not just experimentation. It was the only solution with an efficient tenant-based system that scaled to our unique workload of tens of thousands of distinct segmented indexes."
> Aaron Edwards, Founder of DocsBot

As one of the first Weaviate Cloud customers, DocsBot worked with the Weaviate team to rearchitect for this multi-tenant use case.

## Architecture

DocsBot handles document ingestion, chunking, and embedding generation, then stores vectors and metadata in Weaviate. At query time Weaviate runs semantic and hybrid search and returns the relevant context, which is passed to large language models to generate grounded answers.

## Results

- 6.1 million+ customer questions answered in a year.
- 50,000+ tenants in a single Weaviate cluster.
- A solo founder freed from database operations to work on the product.

## What is multi-tenancy?

Multi-tenancy lets a single Weaviate instance serve thousands of isolated customer datasets, which cuts operational overhead and cost compared with running a separate database per customer. See https://docs.weaviate.io/weaviate/starter-guides/managing-collections/collections-scaling-limits#multi-tenancy-architecture

## What's next for DocsBot

DocsBot is moving from an answer engine toward agentic capabilities: capturing leads, routing and escalating support requests, and triggering workflows in existing tools.

## About DocsBot

Founded by Aaron Edwards, DocsBot (https://docsbot.ai/) lets companies create custom AI chatbots trained on their own documentation, help centers, internal wikis, and other proprietary content.

## Related pages

- All case studies: https://weaviate.io/case-studies.md
- Deployment options: https://weaviate.io/deployment.md
- Multi-tenancy documentation: https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy
