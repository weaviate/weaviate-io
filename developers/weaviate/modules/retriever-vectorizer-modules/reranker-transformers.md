---
title: reranker-transformers
sidebar_position: 55
image: og/docs/modules/text2vec-transformers.jpg
# tags: ['rerank', 'transformers']
---

## Introduction

- The `reranker-transformers` module enables reranking search results using [sentence transformers models](https://www.sbert.net/docs/pretrained_cross-encoders.html).
- The `reranker-transformers` module is run on your own inference container with a pre-trained language transformer model.

:::info Related pages
- [How-to search: Rerank](../../search/rerank.md)
:::


## How to enable

### Weaviate Cloud Services

The `reranker-transformers` module is not available on the WCS.

### Weaviate open source

Add `reranker-transformers` to the `ENABLE_MODULES` environment variable.

Below is an example Docker Compose file, which will spin up Weaviate with the `reranker-transformers` module (as well as `text2vec-openai`).

It also configures `reranker-transformers` to use the `cross-encoder/ms-marco-MiniLM-L-6-v2` model, with CUDA acceleration disabled.

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
      RERANKER_INFERENCE_API: 'http://reranker-transformers:8080'
      OPENAI_APIKEY: $OPENAI_APIKEY
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,reranker-transformers'
      CLUSTER_HOSTNAME: 'node1'
  reranker-transformers:
    image: cr.weaviate.io/semitechnologies/reranker-transformers:cross-encoder-ms-marco-MiniLM-L-6-v2
    environment:
      ENABLE_CUDA: '0'
...
```

## Configuration

The `reranker-transformers` module can be configured for any class in the schema.


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
        "reranker-transformers": {},  // This will configure the 'Document' class to use the 'reranker-transformers' module
      }
    }
  ]
}
```

</details>

### Model selection

The reranker-transformers module enables using [sentence transformers models](https://www.sbert.net/docs/pretrained_cross-encoders.html) as a second stage re-ranking for vector, bm25 and hybrid search results.

With `reranker-transformers` module, you must set the model using environment variables as shown above.

The `reranker-transformers` module supports the following models:

- `cross-encoder/ms-marco-MiniLM-L-6-v2`
- `cross-encoder/ms-marco-MiniLM-L-2-v2`
- `cross-encoder/ms-marco-TinyBERT-L-2-v2`

These pre-trained models are open-sourced on Hugging Face. The `cross-encoder/ms-marco-MiniLM-L-6-v2` model, for example, provides approximately the same benchmark performance as the largest model (L-12) when evaluated on [MS-MARCO](https://microsoft.github.io/msmarco/) (39.01 vs. 39.02).

## Usage

### Queries

* Using this module will enable the [`rerank` GraphQL _additional property](../../api/graphql/additional-properties.md#rerank).
* For usage examples, see the [Howto: Search - Reranking](../../search/rerank.md) page.



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
