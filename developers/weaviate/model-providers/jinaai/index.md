---
title: Jina AI + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_jinaai.jpg
# tags: ['model providers', 'jinaai']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

Jina AI offers a wide range of models for natural language processing. Weaviate seamlessly integrates with Jina AI's APIs, allowing users to leverage Jina AI's models directly within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with Jina AI

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_jinaai_embedding.png)

Jina AI's embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with Jina AI's embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[Jina AI embedding integration page](./embeddings.md)

## Summary

These integrations enable developers to leverage Jina AI's powerful models directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide a valid Jina AI API key to Weaviate for these integrations. Go to [Jina AI](https://jina.ai/embeddings/) to sign up and obtain an API key.

Then, go to the relevant integration page to learn how to configure Weaviate with the Jina AI models and start using them in your applications.

- [Embeddings](./embeddings.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
