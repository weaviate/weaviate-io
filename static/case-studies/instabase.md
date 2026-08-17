---
title: "Instabase case study"
description: "How Instabase supports 450+ data types and 500K documents a day with Weaviate, hitting its accuracy and latency benchmarks across cloud and on-premises deployments."
canonical: https://weaviate.io/case-studies/instabase
last-updated: 2026-08-13
---

# Instabase case study — LLM Guidance

## TL;DR
- Instabase is an enterprise AI application platform that turns unstructured documents into insights.
- It processes over 500,000 highly varied documents per day and needed accuracy plus low latency at that scale.
- Weaviate won Instabase's own benchmarks for retrieval accuracy and vector-search latency.
- Flexible deployment (cloud or on-premises) let Instabase serve customers in regulated regions and industries.

## The challenge

Instabase needed to index, store, and retrieve massive volumes of data while returning highly accurate results. As Shaunak Godbole, Head of Infrastructure Engineering at Instabase, put it: "Accuracy determines the amount of savings any large institution can get. If the results aren't accurate or take too long to surface, a human needs to get involved, and the cost savings goes away. So accuracy and speed are critical for us."

Instabase also had to support customers in highly regulated environments: European customers whose data could not leave certain countries, and financial institutions that required on-premises deployment.

## Why Instabase chose Weaviate

- **Performance.** Instabase ran its own benchmarks on complex aggregation and composition queries requiring both dense and sparse search. Weaviate delivered high retrieval accuracy with low vector-search latency.
- **Adaptability.** An open-source, AI-native vector database let Instabase deploy wherever customers operate, in the cloud or on-premises.
- **Modular architecture.** Built-in hybrid search, distance metrics, and LLM integrations saved Instabase from building those capabilities itself.
- **Support.** An engaged open-source community plus direct collaboration with Weaviate's core team.

## Results

- 50,000+ tenants stored in the Weaviate cluster, with tenant-scoped queries answered in milliseconds.
- Consistent results across document sizes, from single-page handwritten notes to 400-page financial filings.
- 450+ data types supported for a single customer solution.

## About Instabase

Instabase serves large enterprises, mid-market companies, and the federal government with automation and insight extraction from unstructured data. Its AI Hub platform offers a Converse mode for instant insights and a Build mode for extracting, classifying, and cleaning data before pushing it into downstream systems. Customers include large financial institutions, insurance companies, transportation, retail, and public sector organizations.

## Related pages

- All case studies: https://weaviate.io/case-studies.md
- Hybrid search: https://weaviate.io/hybrid-search.md
- Deployment options: https://weaviate.io/deployment.md
