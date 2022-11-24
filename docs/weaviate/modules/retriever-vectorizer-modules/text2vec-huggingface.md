---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: text2vec-huggingface
description: Use any Huggingface model inside Weaviate through the Inference API
tags: ['text2vec-huggingface']
sidebar_position: 2
open-graph-type: article
toc: true
enabled-on-wcs: true
---

# Introduction

The `text2vec-huggingface` module allows you to use [Hugging Face models](https://huggingface.co/models) directly in Weaviate as a vectorization module. ​When you create a Weaviate class that is set to use this module, it will automatically vectorize your data using the chosen module.

* Note: this module uses a third-party API.
* Note: make sure to check the Inference [pricing page](https://huggingface.co/inference-api#pricing) before vectorizing large amounts of data.
* Note: Weaviate automatically parallelizes requests to the Inference-API when using the batch endpoint, see the previous note.
* Note: This module only supports [sentence similarity](https://huggingface.co/models?pipeline_tag=sentence-similarity) models.

# How to enable

Request a Huggingface API Token via [their website](https://huggingface.co/settings/tokens).

## Weaviate Cloud Service

This module is enabled by default on the WCS.

## Weaviate open source

Here is an example Docker-compose file, which will spin up Weaviate with the Hugging Face module.

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
      DEFAULT_VECTORIZER_MODULE: text2vec-huggingface
      ENABLE_MODULES: text2vec-huggingface
      HUGGINFACE_APIKEY: sk-foobar # request a key on huggingface.co, setting this parameter is optional, you can also provide the API key on runtime
      CLUSTER_HOSTNAME: 'node1'
```

* Note: you can also use the [Weaviate configuration tool](../installation/docker-compose.html#configurator) to create a Weaviate setup with this module.

# How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [getting started guide on the Weaviate schema](../getting-started/schema.html) first.

The following schema configuration uses the `all-MiniLM-L6-v2` model. 

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "moduleConfig": {
        "text2vec-huggingface": {
          "model": "sentence-transformers/all-MiniLM-L6-v2",
          "options": {
            "waitForModel": true,
            "useGPU": true,
            "useCache": true
          }
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-huggingface": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ],
      "vectorizer": "text2vec-huggingface"
    }
  ]
}
```

# How to use

* When sending a request to Weaviate, you can set the API key on query time: `X-Huggingface-Api-Key: <huggingface-api-key>`.
* New GraphQL vector search parameters made available by this module can be found [here](../graphql-references/vector-search-parameters.html#neartext).

## Example

{% include code/1.x/graphql.filters.nearText.huggingface.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Additional information

## Support for Hugging Face Inference Endpoints

The `text2vec-huggingface` module also supports [HuggingFace Inference Endpoints](https://huggingface.co/inference-endpoints), where you can deploy your own model as an endpoint. To use your own HuggingFace Inference Endpoint for vectorization with the `text2vec-huggingface` module, just pass the endpoint url in the class configuration as the `endpointURL` setting. Please note that only `feature extraction` inference endpoint types are supported.

## Available settings

​In the schema, on a class level, the following settings can be added:

​| setting | type | description | example |
| --- | --- | --- | --- |
| `model` | `string` | This can be any public or private Huggingface model, [sentence similarity models](https://huggingface.co/models?pipeline_tag=sentence-similarity&sort=downloads) work best for vectorization.<br/><br/>Don't use with `queryModel` nor `passageModel`. | `"bert-base-uncased"` |
| `passageModel` | `string` | DPR passage model.<br/><br/>Should be set together with `queryModel`, but without `model`. | `"sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base"` |
| `queryModel` | `string` | DPR query model.<br/><br/>Should be set together with `passageModel`, but without `model`. | `"sentence-transformers/facebook-dpr-question_encoder-single-nq-base"` |
| `options.waitForModel` | `boolean` | If the model is not ready, wait for it instead of receiving 503.​ | |
| `options.useGPU` | `boolean` | Use GPU instead of CPU for inference.<br/>(requires Hugginface's [Startup plan](https://huggingface.co/inference-api#pricing) or higher) | |
| `options.useCache` | `boolean` | There is a cache layer on the inference API to speedup requests we have already seen. Most models can use those results as is as models are deterministic (meaning the results will be the same anyway). However if you use a non-deterministic model, you can set this parameter to prevent the caching mechanism from being used resulting in a real new query. | | 
| `endpointURL` | `string` | This can be any public or private Huggingface Inference URL. To find out how to deploy your own Hugging Face Inference Endpoint click [here](https://huggingface.co/inference-endpoints).<br/><br/>Note: when this variable is set, the module will ignore model settings like `model` `queryModel` and `passageModel`. | |

# More resources

{% include docs-support-links.html %}
