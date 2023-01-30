---
title: text2vec-cohere
sidebar_position: 1
image: og/docs/modules.jpg
# tags: ['text2vec', 'text2vec-cohere', 'cohere']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Introduction

The `text2vec-cohere` module allows you to use the [Cohere embeddings](https://docs.cohere.ai/docs/embeddings) directly in the Weaviate vector search engine as a vectorization module. ​When you create a Weaviate class that is set to use this module, it will automatically vectorize your data using Cohere's models.

* Note: this module uses a third-party API and may incur costs.
* Note: make sure to check the Cohere [pricing page](https://cohere.ai/pricing) before vectorizing large amounts of data.
* Note: Weaviate automatically parallelizes requests to the Cohere-API when using the batch endpoint, see the previous note.

## How to enable

Request a Cohere API-key via [their dashboard](https://dashboard.cohere.ai/welcome/login).

### Weaviate Cloud Service

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
      COHERE_APIKEY: sk-foobar # request a key on cohere.ai, setting this parameter is optional, you can also provide the API key on runtime
      CLUSTER_HOSTNAME: 'node1'
...
```

* Note: you can also use the [Weaviate configuration tool](../../installation/docker-compose.md#configurator) to create a Weaviate setup with this module.

## How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [tutorial on the Weaviate schema](../../tutorials/schema.md) first.

The following schema configuration tells Weaviate to vectorize the `Document` class with `text2vec-cohere`, using the `multilingual-22-12` model and without input truncation by the Cohere API.

> The multilingual models use dot product, and the English model uses cosine. Make sure to set this accordingly in your Weaviate schema. You can see supported distance metrics [here](../../configuration/distances.md).

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

## How to use

* If the Cohere API key is not set in the `text2vec-cohere` module, you can set the API key at query time by adding the following to the HTTP header: `X-Cohere-Api-Key: <cohere-api-key>`.
* Using this module will enable GraphQL vector search parameters in Weaviate. They can be found [here](../../api/graphql/vector-search-parameters.md#neartext).

### Example

import GraphQLFiltersNearNextCohere from '/_includes/code/graphql.filters.nearText.cohere.mdx';

<GraphQLFiltersNearNextCohere/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

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

You can set the truncation option with the `truncate` parameter to `RIGHT` or `NONE`. Passing RIGHT will discard the right side of the input, the remaining input is exactly the maximum input token length for the model. [source](https://docs.cohere.ai/reference/embed)

* The _upside_ of truncating is that a batch import always succeeds.
* The _downside_ of truncating (i.e., `NONE`) is that a large text will be partially vectorized without the user being made aware of the truncation.

### Cohere Rate Limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. More information about Cohere rate limits can be found [here](https://docs.cohere.ai/docs/going-live).

### Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Go using the Weaviate client.

import Text2VecCohereExample from '/_includes/code/text2vec-cohere.example.mdx';

<Text2VecCohereExample/>

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
