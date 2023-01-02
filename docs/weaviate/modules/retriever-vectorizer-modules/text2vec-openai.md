---
title: text2vec-openai
sidebar_position: 1

# layout: layout-documentation
# solution: weaviate
# sub-menu: Retrievers & Vectorizers
# nav-parent: Modules
# description: Use any OpenAI model inside Weaviate
# tags: ['text2vec-openai']
# open-graph-type: article
# toc: true
# enabled-on-wcs: true
# redirect_from:
#     - /docs/weaviate/v1.11.0/retriever-vectorizer-modules/text2vec-openai.html
#     - /docs/weaviate/modules/text2vec-openai.html
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Introduction

The `text2vec-​openai` module allows you to use the [OpenAI embeddings](https://beta.openai.com/docs/guides/embeddings) directly in the Weaviate vector search engine as a vectorization module. ​When you create a Weaviate class that is set to use this module, it will automatically vectorize your data using OpenAI's `text-embedding-ada-002` model (legacy Ada, Babbage, Curie, or Davinci models are also supported).

* Note: this module uses a third-party API and may incur costs.
* Note: make sure to check the OpenAI [pricing page](https://openai.com/api/pricing/) before vectorizing large amounts of data.
* Note: Weaviate automatically parallelizes requests to the OpenAI-API when using the batch endpoint, see the previous note.
* Note: [Check-out the demo dataset](https://github.com/semi-technologies/DEMO-text2vec-openai).

## How to enable

Request an OpenAI API-key via [their website](https://openai.com/api/).

### Weaviate Cloud Service

This module is enabled by default on the WCS

### Weaviate open source

You can find an example Docker-compose file below, which will spin up Weaviate with the OpenAI module.

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
      DEFAULT_VECTORIZER_MODULE: text2vec-openai
      ENABLE_MODULES: text2vec-openai
      OPENAI_APIKEY: sk-foobar # request a key on openai.com, setting this parameter is optional, you can also provide the API key on runtime
      CLUSTER_HOSTNAME: 'node1'
...
```

* Note: you can also use the [Weaviate configuration tool](/docs/weaviate/installation/docker-compose.md#configurator) to create a Weaviate setup with this module.
* Note: Starting with `v1.11.0` the `OPENAI_APIKEY` variable is now optional and you can instead provide the key at insert/query time as an HTTP header.

## How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [quickstart tutorial on the Weaviate schema](/docs/weaviate/getting-started/schema.md) first.

For example, the following schema configuration will set Weaviate to vectorize the `Document` class with `text2vec-openai` using the `babbage` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ],
      "vectorizer": "text2vec-openai"
    }
  ]
}
```

## How to use

* If the OpenAI API key is not set in the `text2vec-​openai` module, you can set the API key on query time by adding the following to the HTTP header: `X-OpenAI-Api-Key: <openai-api-key>`.
* Using this module will enable GraphQL vector search parameters in Weaviate. They can be found [here](/docs/weaviate/references/graphql/vector-search-parameters.md#neartext).

### Example

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

## Additional information

### Available models

OpenAI has multiple models available with different trade-offs. All the models offered by OpenAI can be used within Weaviate. Note that the more dimensions a model produces, the larger your data footprint will be. To estimate the total size of your dataset use [this](/docs/weaviate/architecture/resources.md#an-example-calculation) calculation.

The default model is: `text-embedding-ada-002` but you can also specify it in your schema. An example as part of a class definition:

```json
{
  "classes": [
    {
      "class": "Document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text"
        }
      }
    }
  ]
}
```

### Legacy models

* For document embeddings you can choose one of the following models:
  * [ada](https://beta.openai.com/docs/engines/ada)
  * [babbage](https://beta.openai.com/docs/engines/babbage)
  * [curie](https://beta.openai.com/docs/engines/curie)
  * [davinci](https://beta.openai.com/docs/engines/davinci)
* For code embeddings you can choose one of the following models:
  * [ada](https://beta.openai.com/docs/engines/ada)
  * [babbage](https://beta.openai.com/docs/engines/babbage)

In the `moduleConfig` inside a class, you need to set two values:

1. `model` – one of the models mentioned above. E.g., `babbage`.
2. `modelVersion` – one of the model version as mentioned above. E.g., `babbage`.
3. `type` – `text` or `code`.

Example (as part of a class definition):

```json
{
  "classes": [
    {
      "class": "Document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "babbage",
          "modelVersion": "001",
          "type": "text"
        }
      }
    }
  ]
}
```

### OpenAI Rate Limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. If you have a low rate limit set, Weaviate will output the error message generated by the OpenAI API. You can request to increase your rate limit by emailing OpenAI directly on `support@openai.com` describing your use case with Weaviate.

### Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Java using the Weaviate client.

import CodeOpenAIExample from '/_includes/code/text2vec-openai.example.mdx';

<CodeOpenAIExample />

The current rate limit will be displayed in the error message like: 

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
