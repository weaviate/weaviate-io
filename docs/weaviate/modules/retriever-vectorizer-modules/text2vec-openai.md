---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: text2vec-openai
description: Use any OpenAI model inside Weaviate
tags: ['text2vec-openai']
sidebar_position: 1
open-graph-type: article
toc: true
enabled-on-wcs: true
redirect_from:
    - /developers/weaviate/v1.11.0/retriever-vectorizer-modules/text2vec-openai.html
    - /developers/weaviate/current/modules/text2vec-openai.html
---

# Introduction

The `text2vec-​openai` module allows you to use the [OpenAI embeddings](https://beta.openai.com/docs/guides/embeddings) directly in the Weaviate vector search engine as a vectorization module. ​When you create a Weaviate class that is set to use this module, it will automatically vectorize your data using OpenAI's Ada, Babbage, Curie, or Davinci models.

* Note: this module uses a third-party API.
* Note: make sure to check the OpenAI [pricing page](https://openai.com/api/pricing/) before vectorizing large amounts of data.
* Note: Weaviate automatically parallelizes requests to the OpenAI-API when using the batch endpoint, see the previous note.
* Note: [Check-out the demo dataset](https://github.com/semi-technologies/DEMO-text2vec-openai).

# How to enable

Request an OpenAI API-key via [their website](https://openai.com/api/).

## Weaviate Cloud Service

This module is enabled by default on the WCS

## Weaviate open source

You can find an example Docker-compose file below, which will spin up Weaviate with the OpenAI module.

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
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
```

* Note: you can also use the [Weaviate configuration tool](../installation/docker-compose.html#configurator) to create a Weaviate setup with this module.
* Note: Starting with `v1.11.0` the `OPENAI_APIKEY` variable is now optional and you can instead provide the key at insert/query time as an HTTP header.

# How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [getting started guide on the Weaviate schema](../getting-started/schema.html) first.

The following schema configuration uses the `babbage` model. 

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "model": "babbage",
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
      ]
    }
  ]
}
```

# How to use

* When sending a request to Weaviate, you can set the API key on query time: `X-OpenAI-Api-Key: <openai-api-key>`.
* New GraphQL vector search parameters made available by this module can be found [here](../graphql-references/vector-search-parameters.html#neartext).

## Example

{% include code/1.x/graphql.filters.nearText.openai.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Additional information

## Available models

OpenAI has multiple models available with different trade-offs. All the models offered by OpenAI can be used within Weaviate. Note that the more dimensions a model produces, the larger your data footprint will be. To estimate the total size of your dataset use [this](../architecture/resources.html#an-example-calculation) calculation.

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
2. `type` – `text` or `code`.

## OpenAI Rate Limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. If you have a low rate limit set, Weaviate will output the error message generated by the OpenAI API. You can request to increase your rate limit by emailing OpenAI directly on `support@openai.com` describing your use case with Weaviate.

## Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Java using the Weaviate client.

{% include code/1.x/text2vec-openai.example.html %}

The current rate limit will be displayed in the error message like: 

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

# More resources

{% include docs-support-links.html %}
