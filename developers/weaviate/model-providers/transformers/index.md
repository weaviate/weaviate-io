---
title: Locally Hosted Transformers + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_transformers.jpg
# tags: ['model providers', 'huggingface', 'transformers']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

Hugging Face's Transformers library can be used with a wide range of models for natural language processing. Weaviate seamlessly integrates with the Transformers library, allowing users to leverage compatible models directly within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with Hugging Face Transformers

Weaviate integrates with compatible Hugging Face Transformers models by spinning them up in containers. This allows users to host their own models and use them with Weaviate.

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_transformers_embedding.png)

Transformers-compatible embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with Hugging Face Transformers' embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[Hugging Face Transformers embedding integration page](./embeddings.md)

## Summary

These integrations enable developers to leverage powerful Hugging Face Transformers models from directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

A locally hosted Weaviate instance is required for these integrations so that you can host your own Hugging Face Transformers models.

Go to the relevant integration page to learn how to configure Weaviate with the Hugging Face Transformers models and start using them in your applications.

- [Text Embeddings](./embeddings.md)
- [Text Embeddings (custom image)](./embeddings-custom-image.md)
- [Multimodal Embeddings](./embeddings-multimodal.md)
- [Multimodal Embeddings (custom image)](./embeddings-multimodal-custom-image.md)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
