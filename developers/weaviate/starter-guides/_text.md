---
title: Text search & RAG
sidebar_position: 20
image: og/docs/tutorials.jpg
# tags: ['getting started']
---


## Overview

:::info Related pages
- [Which Weaviate is right for me?](./which-weaviate.md)
:::

Working with text data may be one of the most common use cases for Weaviate. This guide will help you to get started for this usage by covering key considerations, in relation to the following topics:

- Weaviate configuration,
- Module configuration,
- Data ingestion, including chunking, and
- Queries, including search & retrieval-augmented-generation (RAG).

:::note RAG == generative search
In Weaviate, RAG is also called generative search.
:::

## Weaviate configuration

You will need to ensure that your Weaviate instance is configured to work with your text data. This means:

- Making sure that the right modules are enabled
- Setting index parameters

### Module choice

To work with text data, you will most likely want to use a text vectorizer module. These modules make it easier to obtain object vectors (*inference*) from text data.

The specific choice will depend on a number of factors, including:
- Whether the inference is made locally, or through a third-party inference API.
- Whether you have a preference for a specific model.
- Whether you want to use another modality in addition to text, such as images.

:::tip Not sure where to start?
We suggest:
- **For local vectorization**:
    - [text2vec-contextionary](../modules/retriever-vectorizer-modules/text2vec-contextionary.md) as a fast, lightweight vectorizer, or
    - [text2vec-transformers](../modules/retriever-vectorizer-modules/text2vec-transformers.md) for more modern models.
- **For inference API**: [text2vec-cohere](../modules/retriever-vectorizer-modules/text2vec-cohere.md), or [text2vec-openai](../modules/retriever-vectorizer-modules/text2vec-openai.md).
:::

Your desired module must be:
- Enabled, and
- Specified in your class definition.

#### Check if a module is enabled

Depending on your [deployment setup](../installation/index.md), you may need to enable the module in your Weaviate configuration file. Please check the documentation for your deployment setup for more information.

To check what modules are enabled, view the `meta` information for your Weaviate instance, as shown below:

:::warning CODE EXAMPLE HERE
:::

Ensure that your desired module is in the list of enabled modules.

#### Specify the vectorizer module for your class

Weaviate specifies one vectorizer module per class. You can:

- Specify the vectorizer module in the class definition, or
- Rely on the default vectorizer module, if one is set in the Weaviate configuration file.

You can specify the vectorizer module in the class definition, as shown below:

```json
{
    "class": "Article",
    "vectorizer": "text2vec-transformers",
}
```

A class-specific vectorizer setting will always take precedence over the default vectorizer module. If you want to use the default vectorizer module, you can set it in the Weaviate configuration file.

For example, you can specify the default vectorizer module in the `docker-compose.yml` file:

```yaml
version: '3.4'
services:
  weaviate:
    environment:
      ...
      DEFAULT_VECTORIZER_MODULE: text2vec-transformers
```

## Module configuration

### Inference API key

### Specify the model

### Vectorization options

## Data ingestion

### Batch imports

### Chunking

## Queries

### Semantic Search

### RAG


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
