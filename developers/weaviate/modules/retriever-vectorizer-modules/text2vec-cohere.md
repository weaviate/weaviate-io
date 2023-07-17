---
title: text2vec-cohere
sidebar_position: 1
image: og/docs/modules/text2vec-cohere.jpg
# tags: ['text2vec', 'text2vec-cohere', 'cohere']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* This module uses a third-party API and may incur costs.
* Make sure to check the Cohere [pricing page](https://cohere.com/pricing) before vectorizing large amounts of data.
* Weaviate automatically parallelizes requests to the Cohere-API when using the batch endpoint.
* You will need a Cohere API key. You can request one [here](https://dashboard.cohere.com/welcome/login).

## Introduction

The `text2vec-cohere` module enables you to use [Cohere embeddings](https://docs.cohere.com/docs/embeddings) in Weaviate to represent data objects and run semantic (`nearText`) queries.

## How to enable

### Weaviate Cloud Services

This module is enabled by default on the WCS.

### Weaviate open source

You can find an example Docker-compose file below, which will spin up Weaviate with the Cohere module.

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
      DEFAULT_VECTORIZER_MODULE: text2vec-cohere
      ENABLE_MODULES: text2vec-cohere
      COHERE_APIKEY: sk-foobar # request a key on cohere.com, setting this parameter is optional, you can also provide the API key at runtime
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="COHERE_APIKEY"/>

## How to configure

In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [tutorial on the Weaviate schema](/developers/weaviate/tutorials/schema.md) first.

The following schema configuration tells Weaviate to vectorize the `Document` class with `text2vec-cohere`, using the `multilingual-22-12` model and without input truncation by the Cohere API.

:::info
The multilingual models use dot product, and the English model uses cosine. Make sure to set this accordingly in your Weaviate schema. You can see supported distance metrics [here](../../config-refs/distances.md).
:::

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-cohere",
      "vectorIndexConfig": {
        "distance": "dot" // <== Cohere models use dot product instead of the Weaviate default cosine
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "multilingual-22-12", // <== defaults to multilingual-22-12 if not set
          "truncate": "RIGHT" // <== defaults to RIGHT if not set
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-cohere": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ]
    }
  ]
}
```

## Usage

* If the Cohere API key is not set in the `text2vec-cohere` module, you can set the API key at query time by adding the following to the HTTP header: `X-Cohere-Api-Key: YOUR-COHERE-API-KEY`.
* Using this module will enable [GraphQL vector search operators](/developers/weaviate/api/graphql/vector-search-parameters.md#neartext).

### Example

import GraphQLFiltersNearNextCohere from '/_includes/code/graphql.filters.nearText.cohere.mdx';

<GraphQLFiltersNearNextCohere/>

## Additional information

### Available models

Weaviate defaults to Cohere's `multilingual-22-12` embedding model unless specified otherwise.

For example, the following schema configuration will set Weaviate to vectorize the `Document` class with `text2vec-cohere` using the `multilingual-22-12` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-cohere",
      "vectorIndexConfig": {
        "distance": "dot"
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "multilingual-22-12"
        }
```

### Truncation

If the input text contains too many tokens and is not truncated, the API will throw an error. The Cohere API can be set to automatically truncate your input text.

You can set the truncation option with the `truncate` parameter to `RIGHT` or `NONE`. Passing RIGHT will discard the right side of the input, the remaining input is exactly the maximum input token length for the model. [source](https://docs.cohere.com/reference/embed)

* The _upside_ of truncating is that a batch import always succeeds.
* The _downside_ of truncating (i.e., `NONE`) is that a large text will be partially vectorized without the user being made aware of the truncation.

### Cohere Rate Limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. More information about Cohere rate limits can be found [here](https://docs.cohere.com/docs/going-live).

### Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Go using the Weaviate client.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<CodeThrottlingExample />

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
