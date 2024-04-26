---
title: Cohere + Weaviate
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!../_includes/openai_endtoend.py';

Cohere ia an AI platform which provides a range of models through an API, including embeddings and generative AI models.

Weaviate integrates with Cohere's APIs to provide convenient access to their models for Weaviate users.

## Requirements

### Weaviate configuration

Your Weaviate instance must be configured to use the Cohere module. For instructions on how to enable the Cohere module in Weaviate, see the [how-to configure modules](../../configuration/modules.md) guide.

### Cohere API key

You can obtain an API key by signing up for [a Cohere account](https://cohere.com/) and following their instructions.

To use the API key with Weaviate, provide it to Weaviate at runtime as shown in the examples below.

:::warning TODO
Add code example of providing the API key to Weaviate.
:::

## Available model groups

- [Embeddings](./embeddings.md)
- [Generative AI](./generative.md)
- [Reranker](./reranker.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
