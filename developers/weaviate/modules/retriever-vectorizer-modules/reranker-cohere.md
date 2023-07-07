---
title: reranker-cohere
sidebar_position: 10
image: og/docs/modules/text2vec-cohere.jpg
# tags: ['rerank', 'cohere']
---

## Introduction

The `reranker-cohere` module enables using [Cohere reranking](https://txt.cohere.com/rerank/) as a [second stage re-ranking for vector, bm25 and hybrid search](../../search/rerank.md) results. The model supports [100+ languages](https://docs.cohere.com/docs/supported-languages?ref=txt.cohere.com).

This module uses a third-party API and may incur costs. Make sure to check the Cohere [pricing page](https://cohere.com/pricing) before applying reranking to large amounts of data.

## How to enable

Requests to Cohere will need an API key. If you want to provide the API key with your Weaviate instance, you'll need a Cohere API key, obtained via [their dashboard](https://dashboard.cohere.com). If you want to have clients supply their own Cohere API key (recommended), this step is not necessary.

### Weaviate Cloud Services

This module is enabled by default on the WCS.

### Weaviate open source

Add `reranker-cohere` to the `ENABLE_MODULES` environment variable.

Below is an example Docker Compose file, which will spin up Weaviate with the [Cohere text2vec](./text2vec-cohere.md) and reranker modules.

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
      ENABLE_MODULES: text2vec-cohere,reranker-cohere
      COHERE_APIKEY: sk-...  # optional, as described above
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="COHERE_APIKEY"/>


## Usage

* If the `COHERE_APIKEY` environment variable is not set, clients can set the API key at query time by adding this HTTP header: `X-Cohere-Api-Key: YOUR-COHERE-API-KEY`.
* Using this module will enable the [`rerank` GraphQL _additional property](../../api/graphql/additional-properties.md#rerank).
* For usage examples, see the [Howto: Search - Reranking](../../search/rerank.md) page.


## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
