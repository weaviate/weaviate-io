---
title: reranker-voyageai
sidebar_position: 50
image: og/docs/modules/reranker-voyageai.jpg
# tags: ['rerank', 'voyageai']
---

import ModuleDocDeprecation from '/developers/weaviate/modules/_components/module.doc.deprecation.md';

<ModuleDocDeprecation provider="voyageai" />

:::info Added in `v1.24.7`
:::

## Introduction

- The `reranker-voyage` module enables reranking search results using a [Voyage AI reranker API](https://docs.voyageai.com/docs/reranker).
- This module uses a third-party API and may incur costs. Make sure to check the [pricing page](https://docs.voyageai.com/docs/pricing) before applying reranking to large amounts of data.
- You will need a Voyage AI API key. You can request one [here](https://www.voyageai.com/).

:::info Related pages
- [How-to search: Rerank](../../search/rerank.md)
:::

## How to enable

### Weaviate Cloud Services

This module is enabled by default on the WCS.

### Weaviate open source

Add `reranker-voyageai` to the `ENABLE_MODULES` environment variable.

Below is an example Docker Compose file, which will spin up Weaviate with the `reranker-voyageai` module (as well as `text2vec-voyageai`).

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
      DEFAULT_VECTORIZER_MODULE: text2vec-voyageai
      ENABLE_MODULES: text2vec-voyageai,reranker-voyageai
      VOYAGEAI_APIKEY: sk-foobar # Setting this parameter is optional, you can also provide the API key at query time.
      CLUSTER_HOSTNAME: 'node1'
...
```

import T2VInferenceYamlNotes from './_components/text2vec.inference.yaml.notes.mdx';

<T2VInferenceYamlNotes apiname="VOYAGE_APIKEY"/>


## Schema configuration

The `reranker-voyageai` module can be configured for any collection in the schema. You can also specify options such as the `model` to use.

### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | `rerank-lite-1` | The model to use. |
| `baseURL` | No | `https://api.voyageai.com/v1` | Sets a proxy or other URL instead of the default URL. <br/><br/> Use a the protocol domain format: `https://your.domain.com`. |

This example configures the `Document` collection to use the `reranker-voyageai` module, with the `rerank-lite-1` model, and to return the documents in the response.

```json
{
  "classes": [
    {
      "class": "Document",
      ...,
      "moduleConfig": {
        "reranker-voyageai": {
            "model": "rerank-lite-1",
        },
      }
    }
  ]
}
```

### Reranker selection

If there is only one `reranker` module enabled, you don't need to do anything. The `reranker` module will be used by default.

Where multiple `reranker` modules are enabled, you must specify the reranker module to be used for each collection. You can do this by adding the desired reranker in the `moduleConfig` section of the schema, even without any further settings.

<details>
  <summary>Set reranker for a collection</summary>

```json
{
  "classes": [
    {
      "class": "Document",
      ...,
      "moduleConfig": {
        "reranker-voyageai": {},  // This will configure the 'Document' collection to use the 'reranker-voyageai' module
      }
    }
  ]
}
```

</details>

### Model selection

The `reranker-voyageai` module supports the following models:

- `rerank-lite-1`

## Usage

### Query-time parameters

You can supply parameters at query time by adding it to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-VoyageAI-Api-Key"` | `"YOUR-VOYAGEAI-API-KEY"` | Voyage AI API key | |
| `"X-VoyageAI-BaseURL"` | `"YOUR-VOYAGEAI-BASE-URL"` | Voyage AI base URL | Use the protocol domain format: `https://your.domain.com`. <br /><br /> If specified, this will have precedence over the class-level setting. |

### Queries

* Using this module will enable the [`rerank` GraphQL _additional property](../../api/graphql/additional-properties.md#rerank).
* For usage examples, see the [Howto: Search - Reranking](../../search/rerank.md) page.



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
