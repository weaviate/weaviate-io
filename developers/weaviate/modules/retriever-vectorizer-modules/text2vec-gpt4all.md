---
title: text2vec-gpt4all
sidebar_position: 12
image: og/docs/modules/text2vec-gpt4all.jpg
# tags: ['text2vec', 'text2vec-gpt4all', 'gpt4all']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

The `text2vec-gpt4all` module enables Weaviate to obtain vectors using the [gpt4all](https://docs.gpt4all.io/gpt4all_python_embedding.html) embedding model.

Key notes:

- It is open source and free to use.
- Inference with this model is optimized for CPU using the [`ggml` library](https://github.com/ggerganov/ggml)
    - Please note that currently `gpt4all` is not optimized to be run on Apple ARM M1 and M2 chips.
    - We only produce a `linux/amd64` docker image (no ARM support).
- GPT4All is a light embedding model that maps sentences & paragraphs to a 384-dimensional dense vector space.
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- By default, **input text longer than 256 words is truncated**
- The only available to be used with this model is [`all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2).


## Weaviate instance configuration

### Configuration file

To use `text2vec-gpt4all`, you must enable it in your configuration file. You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) in the case of Docker-Compose.

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
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-gpt4all'
      ENABLE_MODULES: 'text2vec-gpt4all'
      BIND_INFERENCE_API: 'http://text2vec-gpt4all:8080'
      CLUSTER_HOSTNAME: 'node1'
  text2vec-gpt4all:
    image: semitechnologies/gpt4all-inference:all-MiniLM-L6-v2
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

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

- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `true`

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
          "vectorizeClassName": "false"
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

### CPU Optimized Inference

The `text2vec-gpt4all` module is optimized for CPU inference and shouild be noticeably faster then other modules when run on CPU. You can read more about expected inference times [here](https://docs.gpt4all.io/gpt4all_python_embedding.html#speed-of-embedding-generation).

### Usage Advice - Chunking Text with `gpt4all`

Due to the fact that input text longer than `256` words are automatically truncated, if you pass in text chunks longer then any words after this truncation limit will not be used to generate the embedding. This also means that the model is good to use as a quick baseline but if larger text chunks need to be encoded then users may need to upgrade to more powerful embedding models.

## Usage example

The below shows a code example of how to use a `nearText` query with `text2vec-gpt4all`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
