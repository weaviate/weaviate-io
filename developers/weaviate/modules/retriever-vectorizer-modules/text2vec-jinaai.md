---
title: text2vec-jinaai
sidebar_position: 12
# tags: ['text2vec', 'text2vec-jinaai', 'jinaai']
---


## Overview

Weaviate uses the `text2vec-jinaai` module to obtain vectors.
- [JinaAI Embeddings](https://jina.ai/embeddings/)

Key notes:

- JinaAI requires a third-party API key.
- When you enable the text2vec-jinaai model, you can use the [nearText search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `jina-embeddings-v2-base-en`.

### Docker Compose file

To use `text2vec-jinaai`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can edit the Docker Compose file manually, or use the the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to create a custom file.

#### Parameters

|Parameter|Required|Purpose|
|:-|:-|:-|
|`ENABLE_MODULES`|Yes|The modules to enable. Include `text2vec-jinaai` to enable the module.|
|`DEFAULT_VECTORIZER_MODULE`|No|The default vectorizer module. To make `text2vec-jinaai` the default for all classes, set it here.
|`JINAAI_APIKEY`|No|Your JinaAI API key. You can also provide the key at query time.|

#### Example

This Docker Compose file configures JinaAI.

 - It enables `text2vec-jinaai`.
 - It sets `text2vec-jinaai` as the default vectorizer.
 - It sets the JinaAI keys.

```yaml
---
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      # highlight-start
      ENABLE_MODULES: 'text2vec-jinaai'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-jinaai'
      JINAAI_APIKEY: 'jina_7ed53b09'  # Setting this parameter is optional, you
                                      #  can also provide the key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Collection configuration

To configure how the module behaves in each collection, update the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings

#### Parameters

|Parameter|Required|Default|Purpose|
|:-|:-|:-|:-|
|`model`|No|`jina-embeddings-v2-base-en`|A model name, e.g. `jina-embeddings-v2-small-en`.|

#### Example

The following example configures the `Document` collection by setting the vectorizer to `text2vec-jinaai` and the model to `jina-embeddings-v2-small-en`:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A collection called document",
      // highlight-start
      "vectorizer": "text2vec-jinaai",
      "moduleConfig": {
        "text2vec-jinaai": {
          "model": "jina-embeddings-v2-small-en",
        }
      },
      // highlight-end
    }
  ]
}
```


### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each collection and property:

#### Collection level settings

|Parameter|Type|Default|Purpose|
|:-|:-|:-|:-|
| `vectorizer` | string | - | Use this module to vectorize the data.|
| `vectorizeClassName` | boolean | `true` | When `true`, vectorizes the class name.

#### Property level settings

| Parameter | Type | Default | Purpose |
|:-|:-|:-|:-|
| `skip` | boolean | `false` | When `true`, does not vectorize the property. |
| `vectorizePropertyName` | boolean | `true` | When `true`, vectorizes the property name. |

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A collection called document",
      "vectorizer": "text2vec-jinaai",
      "moduleConfig": {
        "text2vec-jinaai": {
          "model": "jina-embeddings-v2-small-en",
          // highlight-start
          "vectorizeClassName": 'false'
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
            "text2vec-jinaai": {
              "skip": 'false',
              "vectorizePropertyName": 'false'
            }
          }
          // highlight-end
        }
      ]
    }
  ]
}
```

## Query-time parameters

### API key

You can supply the API key at query time by adding it to the HTTP header.

|HTTP Header|Value|Purpose|
|:-|:-|:-|
|`X-Jinaai-Api-Key`|`YOUR-JINAAI-API-KEY`|JinaAI key|

## Usage example

This is an example of a `nearText` query that uses `text2vec-jinaai`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.jinaai.mdx';

<CodeNearText />


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
