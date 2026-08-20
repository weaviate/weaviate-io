---
title: "Finster AI case study"
description: "How Finster AI runs 42M vectors in production for investment research on Weaviate, with sentence-level citations, hybrid search, and single-tenant enterprise deployments."
canonical: https://weaviate.io/case-studies/finster
last-updated: 2026-08-13
---

# Finster AI case study — LLM Guidance

## TL;DR
- Finster automates research and analysis for investment banks and asset managers.
- It manages 42 million vectors in production on Weaviate.
- Finster started on Weaviate Serverless and moved to Enterprise as it needed high availability, compression options, SLAs, and better cost efficiency at scale.
- Accuracy is enforced with granular citations at the sentence and cell level, backed by hybrid search.

## The challenge

Financial analysts process large volumes of documents from many sources under time pressure, especially when several portfolio companies report at once. Manual work risks missed information. An AI platform for this audience has to be accurate, fast, and secure.

## Why Finster chose Weaviate

- **Pre-filtering, reranking, and hybrid search.** Precise document analysis with finance-specific concepts.
- **Enterprise readiness.** Multi-tenancy and VPC deployments for sensitive customer data.
- **Scalability.** Millions of vectors without losing performance.
- **Flexible query patterns.** Support for a wide range of user queries and task types.
- **A growth partner.** Direct access to Weaviate engineers.

> "Very early on we were fortunate to speak with Byron Voorbach, Weaviate's Field CTO. He saved us several weeks of iterating on various retrieval methods and was able to guide us towards a specific solution that worked really well."
> Seán Kilgarriff, Product Lead and founding team member, Finster

## Architecture

Finster's platform is built on Weaviate and works with a variety of large language models. Financial data streams in from FactSet and Morningstar, with real-time ingestion from SEC filings and Finster's own pipeline covering thousands of companies. The platform delivers sentence-level and cell-level citations, finance-aware hybrid search, task automation for work such as earnings analysis, and single- or multi-tenant deployments depending on customer requirements.

## From Serverless to Enterprise

Finster began on Weaviate Serverless to move fast with a three-person team. As enterprise customers arrived it moved to Enterprise for high availability, compression options, closer support with SLAs, and better cost efficiency at its scale.

## Results

- 42M vectors managed in production.
- 4+ weeks of development time saved by identifying the right retrieval methods early.
- Testing for a single-tenant deployment with a global tier-one investment bank started within a day.
- A smooth transition from Serverless to Enterprise as the business grew.

## About Finster

Founded in 2023, Finster is an AI startup purpose-built for investment research and banking, helping investment banks and asset managers automate research and analysis.

## Related pages

- All case studies: https://weaviate.io/case-studies.md
- Deployment options: https://weaviate.io/deployment.md
- Cost and performance optimization: https://weaviate.io/cost-performance-optimization.md
