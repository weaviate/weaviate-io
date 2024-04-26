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

### Self-hosted

| Model provider | Embeddings | Generative AI | Others |
| --- | --- | --- | --- |
| **Hugging Face** | [Text](./self-hosted/huggingface-text.mdx), [Multimodal (CLIP)](./self-hosted/huggingface-clip.mdx) | - | [Reranker](./self-hosted/huggingface-reranker.mdx), [Question Answering](./self-hosted/huggingface-qa.mdx), [Summarization](./self-hosted/huggingface-summarization.mdx) |
| **MetaAI** | [Multimodal (ImageBIND)](./self-hosted/meta-imagebind.mdx) | - | - |
| **GPT4all** | [Text](./self-hosted/gpt4all.mdx) | - | - |
| **Custom models** | [Text](./self-hosted/custom-text.mdx), [Custom (CLIP)](./self-hosted/huggingface-clip.mdx) | - | [Reranker](./self-hosted/custom-reranker.mdx) |

### API-based

| Model provider | Embeddings | Generative AI | Others |
| --- | --- | --- | --- |
| **[Anyscale](./anyscale/index.md)** | - | [Text](./anyscale/generative.md) | - |
| **[AWS](./aws/index.md)** | [Text](./aws/embeddings.md) | [Text](./aws/generative.md) | - |
| **[Cohere](./cohere/index.md)** | [Text](./cohere/embeddings.md) | [Text](./cohere/generative.md) | [Reranker](./cohere/reranker.md) |
| **[Google](./google/index.md)** | [Text](./google/embeddings.md), [Multimodal](./google/embeddings-multimodal.md) | [Text](./google/generative.md) | - |
| **[Hugging Face](./huggingface/index.md)** | [Text](./huggingface/embeddings.md) | - | - |
| **[Jina AI](./jinaai/index.md)** | [Text](./jinaai/embeddings.md) | - | - |
| **[Mistral](./mistral/index.md)** | - | [Text](./mistral/generative.md) | - |
| **[OpenAI](./openai/index.md)** | [Text](./openai/embeddings.md) | [Text](./openai/generative.md) | [Question Answering](./openai/qa.md) |
| **[Voyage AI](./voyageai/index.md)** | [Text](./voyageai/embeddings.md) | - | [Reranker](./voyageai/reranker.md) |
