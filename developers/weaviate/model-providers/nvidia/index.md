---
title: NVIDIA + Weaviate
sidebar_position: 10
image: ../_includes/integration_nvidia_rag.png
# tags: ['model providers', 'nvidia']
---

<!-- Note: for images, use https://docs.google.com/presentation/d/15opIcJuaIjEEcs_1Zm8B6pccox2p7_MHSjCnRv4dPfU/edit?usp=sharing -->

NVIDIA NIM microservices offer a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with NVIDIA, allowing users to leverage the inference engine within the Weaviate database.


## Integrations with NVIDIA

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_nvidia_rag.png)

Generative AI models on NVIDIA can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform Retrieval Augmented Generation (RAG) directly from the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with generative AI models on NVIDIA to generate personalized and context-aware responses.

Visit [NVIDIA's generative AI integration page](./generative.md) for more information on our integration!

## Summary

This integration enables developers to harness the power of NVIDIA's inference engine within Weaviate.

In turn, it simplifies the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide a valid NVIDIA API key to Weaviate for this integration. [Select a model](https://build.nvidia.com/models) you'd like to use and click `Get API Key`. 


Learn how to configure Weaviate with the models on NVIDIA and start using them in your applications.

- [Generative AI](./generative.md)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
