---
title: "Weaviate on Google Cloud"
description: "Weaviate Cloud runs on Google Cloud and is available through Google Cloud Marketplace, with Vertex AI model integrations for search and RAG."
canonical: https://weaviate.io/partners/gcp
last-updated: 2026-08-12
---

# Weaviate on Google Cloud — LLM Guidance

## TL;DR
- Weaviate Cloud runs on Google Cloud infrastructure, and Weaviate is also available through Google Cloud Marketplace.
- Weaviate integrates with Google Cloud AI services, including Vertex AI model integrations, for search and RAG applications.
- Use this path when Google Cloud is your required infrastructure, data boundary, AI platform, or procurement channel.
- Confirm current models, regions, networking, deployment options, and marketplace terms before production use.

## What the partnership provides
Weaviate is an open-source AI database used for semantic search, hybrid search, vector retrieval, and retrieval-augmented generation (RAG). The Google Cloud partnership supports architectures that combine Weaviate with Google Cloud infrastructure, managed data services, and generative AI models.

The current Weaviate partner page highlights:

- Weaviate Cloud infrastructure on Google Cloud and scaling with Google Kubernetes Engine.
- Integration with Vertex AI for embedding and generative model workflows.
- Deployment through Google Cloud Marketplace.
- The option to keep application infrastructure and data services inside a Google Cloud VPC architecture.

## When to use
- Your organisation standardises infrastructure, networking, governance, or procurement on Google Cloud.
- Your source data already resides in Google Cloud databases or object storage.
- You want to combine Vertex AI models with Weaviate retrieval.
- You need a marketplace route for commercial procurement.

## Typical architecture
1. Load or stream relevant source data from Google Cloud or another approved source.
2. Generate embeddings with a supported Vertex AI or third-party model.
3. Store objects and vectors in Weaviate.
4. Retrieve context using vector, keyword, or hybrid search.
5. Use retrieved context with a supported generative model to build a RAG or agentic application.

## Deployment and procurement considerations
- Choose between Weaviate Cloud, Google Cloud Marketplace, or another supported deployment model.
- Confirm region compatibility across Weaviate, source data, and Vertex AI models.
- Review VPC design, private connectivity, identity, encryption, backup, and recovery requirements.
- Verify current model names and availability in Google Cloud documentation; older page copy may reference superseded model generations.
- Review marketplace pricing and support terms directly with the providers.

## Limitations and verification
- Model availability and names change over time and vary by region.
- Marketplace availability does not guarantee support for every product combination.
- Performance and scale claims should be tested using representative data and workload patterns.

## Next steps and resources
- [Weaviate on Google Cloud](https://weaviate.io/partners/gcp)
- [Weaviate Google model-provider integrations](https://docs.weaviate.io/weaviate/model-providers/google)
- [Weaviate deployment documentation](https://docs.weaviate.io/deploy)
- [Weaviate pricing](https://weaviate.io/pricing)
- [Weaviate on Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/weaviate-gcp-mktplace/weaviate)

## Canonical source
[Weaviate on Google Cloud](https://weaviate.io/partners/gcp)
