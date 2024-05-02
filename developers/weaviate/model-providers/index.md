---
title: Model provider integrations
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

Weaviate integrates with a variety of [self-hosted](#self-hosted) and [API-based](#api-based) models from a range of providers.

This enables an enhanced developed experience, such as the ability to:
- Import objects directly into Weaviate without having to manually specify embeddings, and
- Build an integrated retrieval augmented generation (RAG) pipeline with generative AI models.

## Model provider integrations

### API-based

| Model provider | Embeddings | Generative AI | Others |
| --- | --- | --- | --- |
| **[AWS](./aws/index.md)** | [Text](./aws/embeddings.md) | [Text](./aws/generative.md) |
| **[Cohere](./cohere/index.md)** | [Text](./cohere/embeddings.md) | [Text](./cohere/generative.md) | [Reranker](./cohere/reranker.md) |
| **[HuggingFace](./huggingface/index.md)** | [Text](./openai/embeddings.md) |  |
| **[OpenAI](./openai/index.md)** | [Text](./openai/embeddings.md) | [Text](./openai/generative.md) |


