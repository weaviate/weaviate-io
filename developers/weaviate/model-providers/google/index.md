---
title: Google + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_google.jpg
# tags: ['model providers', 'google']
---

<!-- Note: for images, use https://docs.google.com/presentation/d/15opIcJuaIjEEcs_1Zm8B6pccox2p7_MHSjCnRv4dPfU/edit?usp=sharing -->

Google offers a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with [Google AI Studio](https://ai.google.dev/?utm_source=weaviate&utm_medium=referral&utm_campaign=partnerships&utm_content=) and [Google Vertex AI](https://cloud.google.com/vertex-ai) APIs, allowing users to leverage Google's models directly from the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with Google

### Embedding models for vector search

![Embedding integration illustration](../_includes/integration_google_embedding.png)

Google's embedding models transform text data into vector embeddings, capturing meaning and context.

[Weaviate integrates with Google's embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[Google embedding integration page](./embeddings.md)
[Google multimodal embedding integration page](./embeddings-multimodal.md)

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_google_rag_single.png)

Google's generative AI models can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform retrieval augmented generation (RAG) directly from the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with Google's generative AI models to generate personalized and context-aware responses.

[Google generative AI integration page](./generative.md)

## Summary

These integrations enable developers to leverage Google's powerful models directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Credentials

You must provide a valid Googles API credentials to Weaviate for these integrations.

### Vertex AI

##### Automatic token generation

import UseGoogleAuthInstructions from './_includes/use_google_auth_instructions.mdx';

<UseGoogleAuthInstructions/>

## Get started

Weaviate integrates with both [Google AI Studio](https://aistudio.google.com/app/apikey/?utm_source=weaviate&utm_medium=referral&utm_campaign=partnerships&utm_content=) or [Google Vertex AI](https://cloud.google.com/vertex-ai).

Go to the relevant integration page to learn how to configure Weaviate with the Google models and start using them in your applications.

- [Text Embeddings](./embeddings.md)
- [Multimodal Embeddings](./embeddings-multimodal.md)
- [Generative AI](./generative.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
