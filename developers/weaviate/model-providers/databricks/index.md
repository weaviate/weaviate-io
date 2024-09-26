---
title: Databricks + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_databricks.jpg
# tags: ['model providers', 'databricks']
---

<!-- Note: for images, use https://docs.google.com/presentation/d/15opIcJuaIjEEcs_1Zm8B6pccox2p7_MHSjCnRv4dPfU/edit?usp=sharing -->

:::info Added in `v1.26.3`
:::

Databricks offers a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with Databricks' Foundation Model APIs, allowing users to leverage Databricks' models directly within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with Databricks

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_databricks_embedding.png)

Databricks' embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with Databricks' embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[Databricks embedding integration page](./embeddings.md)

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_openai_rag_single.png)

Databrick' generative AI models can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform retrieval augmented generation (RAG) directly within the Weaviate database. This combines Weaviate' efficient storage and fast retrieval capabilities with Databrick' generative AI models to generate personalized and context-aware responses.

[Databricks generative AI integration page](./generative.md)

## Summary

These integrations enable developers to leverage Databricks' powerful models directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide a valid Databricks personal access token to Weaviate for these integrations. Refer to the [Databricks documentation](https://docs.databricks.com/en/dev-tools/auth/pat.html) for instructions on generating your personal access token in your workspace.

Then, go to the relevant integration page to learn how to configure Weaviate with the OpenAI models and start using them in your applications.

- [Text Embeddings](./embeddings.md)
- [Generative AI](./generative.md)

## Other third party integrations

import IntegrationLinkBack from '/_includes/integrations/link-back.mdx';

<IntegrationLinkBack/>

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
