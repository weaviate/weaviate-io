---
title: text2vec-ollama
sidebar_position: 25
image: og/docs/modules/text2vec-ollama.jpg
# tags: ['text2vec', 'text2vec-ollama', 'ollama']
---


## Overview

:::info Added in `v1.25`
:::

The `text2vec-ollama` module enables Weaviate to obtain vectors using [Ollama](https://ollama.com/). Ollama is a tool for simplifying the process of running embedding and large language models, such as GPT-3, on your own hardware. This module allows you to use Ollama to generate embeddings for your data in Weaviate.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- This module assumes an Ollama endpoint is available to you (e.g. by running a local Ollama instance on your own device).
- Your Weaviate instance must be able to access the Ollama endpoint. If you are running Weaviate via Docker, you can specify the [Ollama endpoint using `host.docker.internal`](#collection-configuration) to access the host machine from within the container.
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `nomic-embed-text`.
    - The specified model must be available in the Ollama instance you are using.

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-ollama`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-ollama` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-ollama` to make it the default for all collections.

#### Example

This configuration enables `text2vec-ollama`, sets it as the default vectorizer, and sets the API keys.

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
      DEFAULT_VECTORIZER_MODULE: 'text2vec-ollama'
      # highlight-start
      ENABLE_MODULES: 'text2vec-ollama'
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Collection configuration

You can configure how the module will behave in each collection through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

Configurable parameters for the `text2vec-ollama` module are:

- `apiEndpoint` - the URL of the Ollama endpoint.
- `model` - the model to use for vectorization.

### Ollama endpoint

Optionally, you can provide the `apiEndpoint` parameter as shown below to specify the URL of the Ollama endpoint.

If you are running Weaviate via Docker, with a local Ollama instance, specify `host.docker.internal:<ollama-port>` to access the host machine from within the container, where `<ollama-port>` is the port on which Ollama is running (default: `11434`).

### Example

The following example configures the `Article` collection, with:
- Vectorizer set to `text2vec-ollama`,
- The Ollama endpoint set to `host.docker.internal`, and
- The model set to `snowflake-arctic-embed`.

```json
{
  "classes": [
    {
      "class": "Article",
      "description": "A collection called article",
      // highlight-start
      "vectorizer": "text2vec-ollama",
      "moduleConfig": {
        "text2vec-ollama": {
          "apiEndpoint": "http://host.docker.internal:11434",
          "model": "snowflake-arctic-embed"
        }
      },
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each collection and property:

#### Collection-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the collection name. Default: `true`.
- `apiEndpoint` – the URL of the Ollama endpoint. Default: `http://localhost:11434`.
- `model` – the model to use for vectorization. Default: `nomic-embed-text`.

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
      "vectorizer": "text2vec-ollama",
      "moduleConfig": {
        "text2vec-ollama": {
          // highlight-start
          "vectorizeClassName": false,
          "apiEndpoint": "http://host.docker.internal:11434",
          "model": "snowflake-arctic-embed"
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
            "text2vec-ollama": {
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

Please refer to the [Ollama documentation](https://ollama.com/library) for a list of available models. This list includes both large language models and embedding models; look for the word `embed` in the name or description to identify embedding models.

Download the desired model with `ollama pull <model-name>`.

### Ollama documentation

- [Ollama models](https://ollama.com/library)
    - Note: Look for the word `embed` in the name or description to identify embedding models.
- [Ollama repository](https://github.com/ollama/ollama)
- [How to change the host and port of the Ollama server](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-expose-ollama-on-my-network)

## Usage example

This is an example of a `nearText` query with `text2vec-ollama`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

## Model license(s)

The `text2vec-ollama` module uses various models though Ollama. Please refer to the respective documentation for Ollama and the specific model for more information on their respective licenses.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
