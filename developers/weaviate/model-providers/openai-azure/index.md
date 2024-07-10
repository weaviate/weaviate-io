---
title: Azure OpenAI + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_openai_azure.jpg
# tags: ['model providers', 'azure', 'openai']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

Microsoft Azure offers a wide range of OpenAI models for natural language processing and generation. Weaviate seamlessly integrates with Microsoft Azure's APIs, allowing users to leverage OpenAI's models directly within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with Azure OpenAI

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_openai_azure_embedding.png)

Azure OpenAI's embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with Azure OpenAI's embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[Azure OpenAI embedding integration page](./embeddings.md)

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_openai_azure_rag_single.png)

Azure OpenAI's generative AI models can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform retrieval augmented generation (RAG) directly within the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with Azure OpenAI's generative AI models to generate personalized and context-aware responses.

[Azure OpenAI generative AI integration page](./generative.md)

## Summary

These integrations enable developers to leverage Azure OpenAI's powerful models directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide a valid Azure OpenAI API key to Weaviate for these integrations. Go to [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) to sign up and obtain an API key.

Then, go to the relevant integration page to learn how to configure Weaviate with the Azure OpenAI models and start using them in your applications.

- [Text Embeddings](./embeddings.md)
- [Generative AI](./generative.md)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
