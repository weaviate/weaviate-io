---
title: Vector indexes
sidebar_position: 30
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

Vector indexes facilitate efficient, vector-first data storage and retrieval.

## Multiple vectors

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

## Index configuration parameters

Use these parameters to configure the index type and their properties. They can be set in the [collection configuration](../../manage-data/collections.mdx#set-vector-index-type).

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `vectorIndexType` | string | `hnsw` | Optional. The index type - can be `hnsw` or `flat`. |
| `vectorIndexConfig` | object | - | Optional. Set parameters that are specific to the vector index type. |

<details>
  <summary>How to select the index type</summary>

Generally, the `hnsw` index type is recommended for most use cases. The `flat` index type is recommended for use cases where the data the number of objects per index is low, such as in multi-tenancy cases.

See [this section](../../concepts/vector-index.md#which-vector-index-is-right-for-me) for more information about the different index types and how to choose between them.

</details>

If faster import speeds are desired, [asynchronous indexing](#asynchronous-indexing) allows de-coupling of indexing from object creation.


## HNSW indexes

HNSW indexes are scalable and super fast at query time, but HNSW algorithms are costly when you add data during the index building process.

### HNSW index parameters

Some HNSW parameters are mutable, but others cannot be modified after you create your collection.

| Parameter | Type | Default | Changeable | Details |
| :-- | :-- | :-- | :-- | :-- |
| `cleanupIntervalSeconds` | integer | 300 | Yes | Cleanup frequency. This value does not normally need to be adjusted. A higher value means cleanup runs less frequently, but it does more in a single batch. A lower value means cleanup is more frequent, but it may be less efficient on each run. |
| `distance` | string | `cosine` | No | Distance metric. The metric that measures the distance between two arbitrary vectors. For available distance metrics, see [supported distance metrics](/developers/weaviate/config-refs/distances.md). |
| `ef` | integer | -1 | Yes |  Balance search speed and recall. `ef` is the size of the dynamic list that the HNSW uses during search. Search is more accurate when `ef` is higher, but it is also slower. `ef` values greater than 512 show diminishing improvements in recall.<br/><br/>Dynamic `ef`. Weaviate automatically adjusts the `ef` value and creates a dynamic `ef` list when `ef` is set to -1. For more details, see [dynamic ef](../../concepts/vector-index.md#dynamic-ef). |
| `efConstruction` | integer | 128 | No | Balance index search speed and build speed. A high `efConstruction` value means you can lower your `ef` settings, but importing is slower.<br/><br/>`efConstruction` must be greater than 0. |
| `maxConnections` | integer | 64 | No | Maximum number of connections per element. `maxConnections` is the connection limit per layer for layers above the zero layer. The zero layer can have (2 * maxConnections) connections. <br/><br/> `maxConnections` must be greater than 0. |
| `dynamicEfMin` | integer | 100 | Yes | *New in `v1.10.0`.* <br/><br/> Lower bound for [dynamic `ef`](../../concepts/vector-index.md#dynamic-ef). Protects against a creating search list that is too short.<br/><br/>This setting is only used when `ef` is -1. |
| `dynamicEfMax` | integer | 500 | Yes | *New in `v1.10.0`.* <br/><br/> Upper bound for [dynamic `ef`](../../concepts/vector-index.md#dynamic-ef). Protects against creating a search list that is too long. <br/><br/>If `dynamicEfMax` is higher than the limit, `dynamicEfMax` does not have any effect. In this case, `ef` is the limit.<br/><br/>This setting is only used when `ef` is -1. |
| `dynamicEfFactor` | integer | 8 | Yes | *New in `v1.10.0`.* <br/><br/> Multiplier for [dynamic `ef`](../../concepts/vector-index.md#dynamic-ef). Sets the potential length of the search list. <br/><br/>This setting is only used when `ef` is -1. |
| `flatSearchCutoff` | integer | 40000 | Yes | Optional. Threshold for the [flat-search cutoff](/developers/weaviate/concepts/prefiltering.md#flat-search-cutoff). To force a vector index search, set `"flatSearchCutoff": 0`. |
| `skip` | boolean | `false` | No | When true, do not index the collection. <br/><br/> Weaviate decouples vector creation and vector storage. If you skip vector indexing, but a vectorizer is configured (or a vector is provided manually), Weaviate logs a warning each import. <br/><br/> To skip indexing and vector generation, set `"vectorizer": "none"` when you set `"skip": true`. <br/><br/> See [When to skip indexing](../../concepts/vector-index.md#when-to-skip-indexing). |
| `vectorCacheMaxObjects`| integer | `1e12` | Yes | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](../../concepts/vector-index.md#vector-cache-considerations). |
| `pq` | object | -- | Yes | Enable and configure [product quantization (PQ)](/developers/weaviate/concepts/vector-index.md#hnsw-with-product-quantizationpq) compression. <br/><br/> PQ assumes some data has already been loaded. You should have 10,000 to 100,000 vectors per shard loaded before you enable PQ. <br/><br/> For PQ configuration details, see [PQ configuration parameters](#pq-configuration-parameters). |

### PQ configuration parameters

Configure `pq` with these parameters.

import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />

<!-- ### Collection configuration example

This is a sample of collection that shows the [data schema](/developers/weaviate/manage-data/collections.mdx):


```json
{
  "class": "Article",
  "description": "string",
  "properties": [
    {
      "name": "title",
      "description": "string",
      "dataType": ["text"]
    }
  ],
  "vectorIndexType": "hnsw",
  "vectorIndexConfig": {
    "skip": false,
    "ef": 100,
    "efConstruction": 128,
    "maxConnections": 64,
  }
}
``` -->


### HNSW Configuration tips

To determine reasonable settings for your use case, consider the following questions and compare your answers in the table below:

1. How many queries do you expect per second?
1. Do you expect a lot of imports or updates?
1. How high should the recall be?

| Number of queries | Many imports or updates | Recall level | Configuration suggestions |
| --- | --- | --- | --- |
| not many | no | low | This is the ideal scenario. Keep both the `ef` and `efConstruction` settings low. You don't need a big machine and you will still be happy with the results. |
| not many | no | high | Here the tricky thing is that your recall needs to be high. Since you're not expecting a lot of requests or imports, you can increase both the `ef` and `efConstruction` settings. Keep increasing them until you are happy with the recall. In this case, you can get pretty close to 100%. |
| not many | yes | low | Here the tricky thing is the high volume of imports and updates. Be sure to keep `efConstruction` low. Since you don't need a high recall, and you're not expecting a lot of queries, you can adjust the `ef` setting until you've reached the desired recall. |
| not many | yes | high | The trade-offs are getting harder. You need high recall _and_ you're dealing with a lot of imports or updates. This means you need to keep the `efConstruction` setting low, but you can significantly increase your `ef` setting because your queries per second rate is low. |
| many | no | low | Many queries per second means you need a low `ef` setting. Luckily you don't need high recall so you can significantly increase the `efConstruction` value. |
| many | no | high | Many queries per second means a low `ef` setting. Since you need a high recall but you are not expecting a lot of imports or updates, you can increase your `efConstruction` until you've reached the desired recall. |
| many | yes | low | Many queries per second means you need a low `ef` setting. A high number of imports and updates also means you need a low `efConstruction` setting. Luckily your recall does not have to be as close to 100% as possible. You can set `efConstruction` relatively low to support your input or update throughput, and you can use the `ef` setting to regulate the query per second speed. |
| many | yes | high | Aha, this means you're a perfectionist _or_ you have a use case that needs the best of all three worlds. Increase your `efConstruction` value until you hit the time limit of imports and updates. Next, increase your `ef` setting until you reach your desired balance of queries per second versus recall. <br/><br/> While many people think they need maximize all three dimensions, in practice that's usually not the case. We leave it up to you to decide, and you can always ask for help in [our forum](https://forum.weaviate.io). |

:::tip
This set of values is a good starting point for many use cases.

|Parameter|Value|
|:--|:--|
|`ef`|`64`|
|`efConstruction`|`128`|
|`maxConnections`|`32`|
:::


## Flat indexes

:::info Added in `v1.23`
:::

Flat indexes are recommended for use cases where the number of objects per index is low, such as in multi-tenancy use cases.

| Parameter | Type | Default | Changeable | Details |
| :-- | :-- | :-- | :-- | :-- |
| `vectorCacheMaxObjects`| integer | `1e12` | Yes | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](../../concepts/vector-index.md#vector-cache-considerations). |
| `bq` | object | -- | No | Enable and configure [binary quantization (BQ)](../../concepts/vector-index.md#binary-quantization) compression. <br/><br/> For BQ configuration details, see [BQ configuration parameters](#bq-configuration-parameters). |

### BQ configuration parameters

Configure `bq` with these parameters.

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `enabled` | boolean | `false` | Enable BQ. Weaviate uses binary quantization (BQ) compression when `true`. |
| `rescoreLimit` | integer | -1 | The minimum number of candidates to fetch before rescoring. |
| `cache` | boolean | `false` | Whether to use the vector cache. |


## Asynchronous indexing

:::caution Experimental
Available starting in `v1.22`. This is an experimental feature. Please use with caution.
:::

Starting in Weaviate `1.22`, you can use asynchronous indexing by opting in.

To enable asynchronous indexing, set the `ASYNC_INDEXING` environment variable to `true` in your Weaviate configuration (the `docker-compose.yml` file if you use Docker Compose). This setting enables asynchronous indexing for all collections.

<details>
  <summary>Example Docker Compose configuration</summary>

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
      QUERY_DEFAULTS_LIMIT: 25
      QUERY_MAXIMUM_RESULTS: 10000
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-openai,text2vec-palm,generative-cohere,generative-openai,generative-palm'
      CLUSTER_HOSTNAME: 'node1'
      AUTOSCHEMA_ENABLED: 'false'
      ASYNC_INDEXING: 'true'
...
```

</details>

To get the index status, call the [node status](/developers/weaviate/api/rest/nodes.md#usage) endpoint.

<details>
  <summary><code>Node status</code> example usage</summary>

The `nodes/shards/vectorQueueLength` field shows the number of objects that still have to be indexed.

import Nodes from '/_includes/code/nodes.mdx';

<Nodes/>

Then, you can check the status of the vector index queue by inspecting the output.
<br/>

The `vectorQueueLength` field will show the number of remaining objects to be indexed. In the example below, the vector index queue has 425 objects remaining to be indexed on the `TestArticle` shard, out of a total of 1000 objects.

```json
{
  "nodes": [
    {
      "batchStats": {
        "ratePerSecond": 0
      },
      "gitHash": "e6b37ce",
      "name": "weaviate-0",
      "shards": [
        {
          "class": "TestArticle",
          "name": "nq1Bg9Q5lxxP",
          "objectCount": 1000,
          // highlight-start
          "vectorIndexingStatus": "INDEXING",
          "vectorQueueLength": 425
          // highlight-end
        },
      ],
      "stats": {
        "objectCount": 1000,
        "shardCount": 1
      },
      "status": "HEALTHY",
      "version": "1.22.1"
    },
  ]
}
```

</details>


:::info Related pages
- [Concepts: Indexing](../../concepts/indexing.md)
- [Concepts: Vector Indexing](../../concepts/vector-index.md)
:::

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
