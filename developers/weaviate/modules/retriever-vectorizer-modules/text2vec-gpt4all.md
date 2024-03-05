---
title: text2vec-gpt4all
sidebar_position: 22
image: og/docs/modules/text2vec-gpt4all.jpg
# tags: ['text2vec', 'text2vec-gpt4all', 'gpt4all']
---


## Overview

:::info Availability
- `text2vec-gpt` added in `v1.21`
- Currently, `text2vec-gpt4all` is only available for `amd64/x86_64` architecture devices.
    - This is as the `gpt4all` library currently does not support ARM devices, such as Apple M-series.
:::

The `text2vec-gpt4all` module enables Weaviate to obtain vectors using the [gpt4all](https://docs.gpt4all.io/gpt4all_python_embedding.html) library.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- This module is optimized for CPU using the [`ggml` library](https://github.com/ggerganov/ggml), allowing for fast inference even without a GPU.
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- By default, **input text longer than 256 tokens is mean-pooled with an overlapping context window up to the number of tokens in your input.**
- Currently, the only available model is [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2).

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-gpt4all`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-gpt4all` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-gpt4all` to make it the default for all classes.

#### Example

This configuration enables `text2vec-gpt4all`, sets it as the default vectorizer, and sets the API keys.

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-gpt4all'
      # highlight-start
      ENABLE_MODULES: 'text2vec-gpt4all'
      GPT4ALL_INFERENCE_API: 'http://text2vec-gpt4all:8080'
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
# highlight-start
  text2vec-gpt4all:
    image: cr.weaviate.io/semitechnologies/gpt4all-inference:all-MiniLM-L6-v2
# highlight-end
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### Example

The following example configures the `Article` class by setting the vectorizer to `text2vec-gpt4all`:

```json
{
  "classes": [
    {
      "class": "Article",
      "description": "A class called article",
      // highlight-start
      "vectorizer": "text2vec-gpt4all"
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`

#### Example

```json
{
  "classes": [
    {
      "class": "Article",
      "description": "A class called article",
      "vectorizer": "text2vec-gpt4all",
      "moduleConfig": {
        "text2vec-gpt4all": {
          // highlight-start
          "vectorizeClassName": false
          // highlight-end
        }
      },
      "properties": [
        {
          "name": "content",
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-gpt4all": {
              "skip": false,
              "vectorizePropertyName": false
            }
          }
          // highlight-end
        }
      ]
    }
  ]
}
```

## Additional information

### Available models

Currently, the only available model is [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2).

### CPU optimized inference

The `text2vec-gpt4all` module is optimized for CPU inference and should be noticeably faster then `text2vec-transformers` in CPU-only (i.e. no CUDA acceleration) usage. You can read more about expected inference times [here](https://docs.gpt4all.io/gpt4all_python_embedding.html#speed-of-embedding-generation).

### Usage advice - chunking text with `gpt4all`

`text2vec-gpt4all` will truncate input text longer than `256` tokens (word pieces).

Accordingly, this model is not suitable for use cases where larger chunks are required. In these cases, we recommend using other models that support longer input lengths, such as by selecting one from the  [`text2vec-transformers`](./text2vec-transformers.md) module or [`text2vec-openai`](./text2vec-openai.md).

## Usage example

This is an example of a `nearText` query with `text2vec-gpt4all`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

## Model license(s)

The `text2vec-gpt4all` module uses the [`gpt4all`](https://docs.gpt4all.io/gpt4all_python_embedding.html) library, which in turn uses the [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) model. Please refer to the respective documentation for more information on their respective licenses.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
