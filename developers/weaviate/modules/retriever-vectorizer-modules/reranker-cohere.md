---
title: reranker-cohere
sidebar_position: 50
image: og/docs/modules/text2vec-cohere.jpg
# tags: ['rerank', 'cohere']
---

## Introduction

- The `reranker-cohere` module enables reranking search results using [Cohere reranking](https://txt.cohere.com/rerank/).
- This module uses a third-party API and may incur costs. Make sure to check the Cohere [pricing page](https://cohere.com/pricing) before applying reranking to large amounts of data.
- You will need a Cohere API key. You can request one [here](https://dashboard.cohere.com/welcome/login).

:::info Related pages
- [How-to search: Rerank](../../search/rerank.md)
:::

## How to enable

### Weaviate Cloud Services

This module is enabled by default on the WCS.

### Weaviate open source

Add `reranker-cohere` to the `ENABLE_MODULES` environment variable.

Below is an example Docker Compose file, which will spin up Weaviate with the `reranker-cohere` module (as well as `text2vec-cohere`).

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
    restart: on-failure:0
    ports:
     - 8080:8080
     - 50051:50051
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: text2vec-cohere
      ENABLE_MODULES: text2vec-cohere,reranker-cohere
      COHERE_APIKEY: $COHERE_APIKEY
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="COHERE_APIKEY"/>


## Schema configuration

The `reranker-cohere` module can be configured for any class in the schema. You can also specify options such as the `model` to use.

This example configures the `Document` class to use the `reranker-cohere` module, with the `rerank-multilingual-v2.0` model, and to return the documents in the response.

```json
{
  "classes": [
    {
      "class": "Document",
      ...,
      "moduleConfig": {
        "reranker-cohere": {
            "model": "rerank-multilingual-v2.0",
        },
      }
    }
  ]
}
```


### Reranker selection

If there is only one `reranker` module enabled, you don't need to do anything. The `reranker` module will be used by default.

Where multiple `reranker` modules are enabled, you must specify the reranker module to be used for each class. You can do this by adding the desired reranker in the `moduleConfig` section of the schema, even without any further settings.

<details>
  <summary>Set reranker for a class</summary>

```json
{
  "classes": [
    {
      "class": "Document",
      ...,
      "moduleConfig": {
        "reranker-cohere": {},  // This will configure the 'Document' class to use the 'reranker-cohere' module
      }
    }
  ]
}
```

</details>

### Model selection

The `reranker-cohere` module supports the following models:

- `rerank-english-v2.0`
- `rerank-multilingual-v2.0`

You can also pass in your fine-tuned reranker `model_id`, such as:

- `500df123-afr3-...`


This is described further in this [blog post](/blog/fine-tuning-coheres-reranker).


## Usage

### API key

* If the `COHERE_APIKEY` environment variable is not set, clients can set the API key at query time by adding this HTTP header: `X-Cohere-Api-Key: YOUR-COHERE-API-KEY`.

### Queries

* Using this module will enable the [`rerank` GraphQL _additional property](../../api/graphql/additional-properties.md#rerank).
* For usage examples, see the [Howto: Search - Reranking](../../search/rerank.md) page.



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
