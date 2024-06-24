---
title: GPT4All + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_gpt4all.jpg
# tags: ['model providers', 'gpt4all']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

The GPT4All library allows you to easily run a wide range of models on your own device. Weaviate seamlessly integrates with the GPT4All library, allowing users to leverage compatible models directly within the Weaviate database.

These integrations empower developers to build sophisticated AI-driven applications with ease.

## Integrations with GPT4All

Weaviate integrates with compatible GPT4All models by accessing the locally hosted GPT4All API.

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_gpt4all_embedding.png)

GPT4All's embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with GPT4All's embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[GPT4All embedding integration page](./embeddings.md)

## Summary

These integrations enable developers to leverage powerful GPT4All models from directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

A locally hosted Weaviate instance is required for these integrations so that you can host your own GPT4All models.

Go to the relevant integration page to learn how to configure Weaviate with the GPT4All models and start using them in your applications.

- [Text Embeddings](./embeddings.md)

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
