---
title: xAI + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_xai.jpg
# tags: ['model providers', 'xAI']
---

<!-- Note: for images, use https://docs.google.com/presentation/d/15opIcJuaIjEEcs_1Zm8B6pccox2p7_MHSjCnRv4dPfU/edit?usp=sharing -->

xAI offers a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with xAI, allowing users to leverage the inference engine within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with xAI

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_xai_rag.png)

Generative AI models on xAI can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform Retrieval Augmented Generation (RAG) directly from the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with generative AI models on xAI to generate personalized and context-aware responses.

[xAI generative AI integration page](./generative.md)

## Summary

This integration enables developers to harness the power of xAI's inference engine within Weaviate.

In turn, it simplifies the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide a valid xAI API key to Weaviate for this integration. Go to [xAI](https://console.x.ai/) to sign up and obtain an API key.

Then, go to the relevant integration page to learn how to configure Weaviate with the xAI models and start using them in your applications.

- [Generative AI](./generative.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
