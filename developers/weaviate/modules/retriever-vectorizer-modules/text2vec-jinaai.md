---
title: text2vec-jinaai
sidebar_position: 13
# tags: ['text2vec', 'text2vec-jinaai', 'jinaai']
---


## Overview

Weaviate uses the `text2vec-jinaai` module to obtain vectors.
- [JinaAI](https://jina.ai/)

Key notes:

- As it uses a third-party API, you will need an API key.
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `jina-embeddings-v2-base-en`.

### Docker Compose file

To use `text2vec-jinaai`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

|Parameter|Required|Purpose|
|:-|:-|:-|
|`ENABLE_MODULES`|Required|The modules to enable. Include `text2vec-jinaai` to enable the module.|
|`DEFAULT_VECTORIZER_MODULE|Optional|The default vectorizer module. You can set this to `text2vec-jinaai` to make it the default for all classes.|
|`JINAAI_APIKEY`|Optional|Your JinaAI API key. You can also provide the key at query time.|

#### Example

This configuration enables `text2vec-jinaai`, sets it as the default vectorizer, and sets the API keys.

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
      ENABLE_MODULES: text2vec-jinaai
      DEFAULT_VECTORIZER_MODULE: text2vec-jinaai
      JINAAI_APIKEY: sk-foobar  # Setting this parameter is optional; you can also provide the key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings (OpenAI)

#### Parameters

|Parameter|Required|Default|Purpose|
|:-|:-|:-|:-|
|`model`|Optional|`jina-embeddings-v2-base-en`|A model name, e.g. `jina-embeddings-v2-small-en`.|
#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-jinaai` and the model to `jina-embeddings-v2-small-en`:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
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

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

|Parameter|Default|Purpose|
|:-|:-|:-|
|`vectorizer`|| Use this module to vectorize the data.|
|`vectorizeClassName`| `true`| When `true`, vectorizes the class name.

#### Property-level

|Parameter|Default|Purpose|
|:-|:-|:-|
|`skip`|`false`|When `true`, does not vectorize the property.|
|`vectorizePropertyName`|`true`|When `true`, vectorizes the property name.

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-jinaai",
      "moduleConfig": {
        "text2vec-jinaai": {
          "model": "jina-embeddings-v2-small-en",
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
            "text2vec-jinaai": {
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

## Query-time parameters

### API key

You can supply the API key at query time by adding it to the HTTP header.

|HTTP Header|Value|Purpose|
|:-|:-|:-|
|`"X-Jinaai-Api-Key"|"YOUR-JINAAI-API-KEY"`|JinaAI key|
