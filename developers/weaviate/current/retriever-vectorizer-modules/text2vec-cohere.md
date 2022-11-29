---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: text2vec-cohere
description: Use any Cohere model inside Weaviate
tags: ['text2vec-cohere']
menu-order: 1
open-graph-type: article
toc: true
enabled-on-wcs: true
---

# Introduction

The `text2vec-cohere` module allows you to use the [Cohere embeddings](https://docs.cohere.ai/docs/embeddings) directly in the Weaviate vector search engine as a vectorization module. ​When you create a Weaviate class that is set to use this module, it will automatically vectorize your data using Cohere's models.

* Note: this module uses a third-party API.
* Note: make sure to check the Cohere [pricing page](https://cohere.ai/pricing) before vectorizing large amounts of data.
* Note: Weaviate automatically parallelizes requests to the Cohere-API when using the batch endpoint, see the previous note.

# How to enable

Request a Cohere API-key via [their dashboard](https://dashboard.cohere.ai/welcome/login).

## Weaviate Cloud Service

This module is enabled by default on the WCS

## Weaviate open source

You can find an example Docker-compose file below, which will spin up Weaviate with the Cohere module.

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
      DEFAULT_VECTORIZER_MODULE: text2vec-cohere
      ENABLE_MODULES: text2vec-cohere
      COHERE_APIKEY: sk-foobar # request a key on cohere.ai, setting this parameter is optional, you can also provide the API key on runtime
      CLUSTER_HOSTNAME: 'node1'
```

* Note: you can also use the [Weaviate configuration tool](../installation/docker-compose.html#configurator) to create a Weaviate setup with this module.

# How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [getting started guide on the Weaviate schema](../getting-started/schema.html) first.

The following schema configuration uses the `babbage` model. 

```js
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-cohere",
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "large", // <== defaults to large if not set
          "truncate": "NONE" // <== defaults to NONE if not set
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

# How to use

* When sending a request to Weaviate, you can set the API key on query time: `X-Cohere-Api-Key: <cohere-api-key>`.
* New GraphQL vector search parameters made available by this module can be found [here](../graphql-references/vector-search-parameters.html#neartext).

## Example

{% include code/1.x/graphql.filters.nearText.cohere.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Additional information

## Available models

Weaviate defaults to the `multilingual-2210-alpha` model of the type "large".

> The size of model to generate with, currently available models are small, medium, large, defaults to large. Small models are faster, while larger models will perform better. Custom models can also be supplied with their full ID [source](https://docs.cohere.ai/reference/embed)

Example of setting a small model in the Weaviate schema:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-cohere",
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "small"
        }
```

## Truncating

The Cohere API can automatically truncate your content. If you don't truncate, the API will throw an error if your text contains too many tokens.

> Accepts NONE, LEFT or RIGHT. Specifies how the API will handle inputs longer than the maximum token length. Passing LEFT will discard the left of the input and RIGHT will discard the right side of the input, in both cases until the remaining input is exactly the maximum input token length for the model. Defaults to NONE, which will return an error if the input exceeds the maximum input token length. [source](https://docs.cohere.ai/reference/embed)

* The _upside_ of truncating is that a batch import always succeeds.
* The _downside_ of truncating is that a large text might only get partially vectorized.

Example of setting a trancation to `LEFT`.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-cohere",
      "moduleConfig": {
        "text2vec-cohere": {
          "truncate": "LEFT"
        }
```

## Cohere Rate Limits

Because you will be getting embeddings based on your own API key, you will be dealing with rate limits applied to your account. More information about Cohere rate limits can be found [here](https://docs.cohere.ai/docs/going-live).

## Throttle the import inside your application

If you run into rate limits, you can also decide to throttle the import in your application.

E.g., in Python and Java using the Weaviate client.

{% include code/1.x/text2vec-cohere.example.html %}

# More resources

{% include docs-support-links.html %}
