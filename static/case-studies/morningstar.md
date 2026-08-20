---
title: "Morningstar case study"
description: "How Morningstar built its Intelligence Engine on Weaviate, launched the Mo research assistant in weeks, and gave internal teams self-serve RAG over trusted financial data."
canonical: https://weaviate.io/case-studies/morningstar
last-updated: 2026-08-13
---

# Morningstar case study — LLM Guidance

## TL;DR
- Morningstar built its Intelligence Engine Platform on Weaviate to make 40 years of proprietary financial data usable by AI applications.
- Accuracy and source transparency were the hard requirements, because Morningstar's product promise is trustworthy financial data.
- The platform powers Mo, Morningstar's investment research assistant, plus hundreds of internal applications, APIs, and chat interfaces.

## The challenge

Morningstar wanted to give investors an advanced research assistant built on its own data. As Benjamin Barrett, Head of Technology, Research Products, described it: building a chatbot on that data "looks like magic, but when you start peeling back the layers of the onion, you have to ask, is it actually accurate? Is it pulling the latest, greatest, most relevant data? Are our answers robust and complete?"

The team needed one source of truth with a very high accuracy bar, since user trust depends on it.

## Why Morningstar chose Weaviate

- **Ease of use.** The open-source database was quick to spin up locally in Docker for experimentation.
- **Data privacy and security.** Flexible deployment and multi-tenant architecture supported strict compliance requirements.
- **Flexibility and scale.** One database served use cases from search engines to tailored AI applications over large, diverse datasets.
- **Support.** Help from local development through to production.

## Results

- The Intelligence Engine Platform lets teams create and customize AI applications on a foundation of trusted financial data and research.
- Mo, the Weaviate-powered investment research assistant, launched within weeks for financial professionals and individual investors.
- RAG pipelines use dynamic, context-aware document chunking and cited sources, improving relevance and trustworthiness of generated answers.
- Self-serve RAG lets internal users build a corpus of documents and query it through a chat interface.

> "Through our Corpus API connected to Weaviate, users can build very powerful, low latency search engines in minutes with little to no code. Users can then also test different search algorithms without having to worry about re-indexing their data or that infrastructure at all."
> Aisis Julian, Senior Software Engineer, Morningstar

## About Morningstar

Morningstar, Inc. is a global provider of independent investment insights, serving individual investors, financial advisors, asset managers and owners, retirement plan providers and sponsors, and institutional investors in debt and private capital markets.

## Related pages

- All case studies: https://weaviate.io/case-studies.md
- RAG on Weaviate: https://weaviate.io/rag.md
- Security: https://weaviate.io/security.md
