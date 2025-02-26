---
title: Choose a model
sidebar_label: Choose a model
sidebar_position: 2
image: og/wcs/user_guides.jpg
---

On this page, you can find a list of pre-trained models designed specifically for enterprise retrieval tasks in English and other languages. Additional models and features will be added in the future, so please check back regularly for updates.

## How to choose the right model?

Here are some simple recommendations on when you should use a specific model:

- **[`Snowflake/snowflake-arctic-embed-m-v1.5`](#snowflake-arctic-embed-m-v1.5)**  
  Best for datasets that are **primarily in English** with text lengths typically **under 512 tokens**.
- **[`Snowflake/snowflake-arctic-embed-l-v2.0`](#snowflake-arctic-embed-l-v2.0)**  
  Ideal for datasets that include **multiple languages** or require **longer context (up to 8192 tokens)**. This model is optimized for robust performance on both English and multilingual retrieval tasks.

Below, you can find a complete list of all available models.

---

## Available models

<!-- TODO[g-despot]: Uncomment section when more models are added
The following models are available for use with Weaviate Embeddings:

- **[`Snowflake/snowflake-arctic-embed-m-v1.5`](#snowflake-arctic-embed-m-v1.5)**
- **[`Snowflake/snowflake-arctic-embed-l-v2.0`](#snowflake-arctic-embed-l-v2.0)** (default)

---
-->

import WeaviateEmbeddingsModels from '/_includes/weaviate-embeddings-models.mdx';

<WeaviateEmbeddingsModels />

## Vectorizer parameters

import WeaviateEmbeddingsVectorizerParameters from '/_includes/weaviate-embeddings-vectorizer-parameters.mdx';

<WeaviateEmbeddingsVectorizerParameters />

## Additional resources

- [Weaviate Embeddings: Overview](/developers/wcs/embeddings)
- [Weaviate Embeddings: Quickstart](/developers/wcs/embeddings/quickstart)
- [Weaviate Embeddings: Administration](/developers/wcs/embeddings/administration)
- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)

## Support

import SupportAndTrouble from '/\_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />
