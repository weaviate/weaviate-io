---
title: Indexes
sidebar_position: 13
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---


<!-- :::caution Migrated From:
- Adds text re: configuration options from `Vector index plugins/HNSW`
::: -->

:::info Related pages
- [Concepts: Indexing](../concepts/indexing.md)
- [Concepts: Vector Indexing](../concepts/vector-index.md)
:::

## Vector index

Weaviate uses a vector index to facilitate efficient, vector-first data storage and retrieval. When vector indexes are combined with horizontal scaling and sharding, you can store and search *very* large amounts of data without decreasing performance.

## Weaviate's vector index
Weaviate supports the [Hierarchical Navigable Small Worlds (HNSW)](/developers/weaviate/concepts/vector-index.md#hnsw) indexing algorithm. HNSW indexes are scalable and super fast at query time, but HNSW algorithms are costly when you add data during the index building process. For an alternative approach to indexing that may help with some use cases, see [Asynchronous indexing](/developers/weaviate/configuration/indexes#asynchronous-indexing).

If you want to contribute to developing a new index type at Weaviate, please contact us or make a pull request in our GitHub project. Stay tuned for updates!

### Index configuration parameters

These parameters configure Weaviate indexing across index types. The `vectorIndexConfig` parameter provides a way to configure specific details for different types of index. Currently the only index type available is HNSW.

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `vectorIndexType` | string | `hnsw` | Optional. The algorithm that creates your index. HNSW is the only index type currently available. |
| `vectorIndexConfig` | object | - | Optional. Set parameters that are specific to the vector index type. See [HSNW specific parameters](#hnsw-index-parameters) |


#### HNSW index parameters

The HNSW algorithm builds a list of approximate nearest neighbors (ANN).

The `ef` parameter controls the size of the nearest neighbors list and helps to balance search speed and recall. You can set an explicit `ef` value or let Weaviate set a [dynamic `ef`](#dynamic-ef). These parameters let you tune `ef`, dynamic `ef`, and other aspects of the HNSW algorithm.

| Parameter | Type | Default | Changeable | Details |
| :-- | :-- | :-- | :-- | :-- |
| `cleanupIntervalSeconds` | integer | 300 | Yes | Cleanup frequency. This value does not normally need to be adjusted. A higher value means cleanup runs less frequently, but it does more in a single batch. A lower value means cleanup is more frequent, but it may be less efficient on each run. |
| `distance` | string | `cosine` | No | The metric that measures the distance between two arbitrary vectors. See [supported distance metrics](/developers/weaviate/config-refs/distances.md). |
| `ef` | integer | -1 | Yes |  Balance search speed and recall. Search is more accurate when `ef` is higher, but it is also slower. `ef` values greater than 512 show diminishing improvements in recall.<br/><br/>Dynamic `ef`. Weaviate automatically adjusts the `ef` value and creates a dynamic `ef` list when `ef` is set to -1. For more details, see [dynamic ef](#dynamic-ef). |
| `efConstruction` | integer | 128 | No | Balance index search speed and build speed. A high `efConstruction` value means you can lower your `ef` settings, but importing is slower.<br/><br/>`efConstruction` must be greater than 0. |
| `maxConnections` | integer | 64 | No | Maximum number of connections per element. `maxConnections` is the connection limit per layer for layers above the zero layer. The zero layer can have (2 * maxConnections) connections. <br/><br/> `maxConnections` must be greater than 0. |
| `dynamicEfMin` | integer | 100 | Yes | *New in `v1.10.0`.* <br/><br/> Lower bound for [dynamic `ef`](#dynamic-ef). Protects against a creating search list that is too short.<br/><br/>This setting is only used when `ef` is -1. |
| `dynamicEfMax` | integer | 500 | Yes | *New in `v1.10.0`.* <br/><br/> Upper bound for [dynamic `ef`](#dynamic-ef). Protects against creating a search list that is too long. <br/><br/>If `dynamicEfMax` is higher than the limit, `dynamicEfMax` does not have any effect. In this case, `ef` is the limit.<br/><br/>This setting is only used when `ef` is -1. |
| `dynamicEfFactor` | integer | 8 | Yes | *New in `v1.10.0`.* <br/><br/> Multiplier for [dynamic `ef`](#dynamic-ef). Sets the potential length of the search list. <br/><br/>This setting is only used when `ef` is -1. |
| `flatSearchCutoff` | integer | 40000 | Yes | Optional. Threshold for the [flat-search cutoff](/developers/weaviate/concepts/prefiltering.md#flat-search-cutoff). To force a vector index search, set `"flatSearchCutoff": 0`. |
| `skip` | boolean | `false` | No | When true, do not index the collection. <br/><br/> Weaviate decouples vector creation and vector storage. If you skip vector indexing, but a vectorizer is configured (or a vector is provided manually), Weaviate logs a warning each import. <br/><br/> To skip indexing and vector generation, set `"vectorizer": "none"` when you set `"skip": true`. <br/><br/> See [When to skip indexing](#when-to-skip-indexing). |
| `"vectorCacheMaxObjects"`:| integer | `1e12` | Yes | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](#vector-cache-considerations). |
| `pq` |document|-| Yes | Enable and configure [product quantization (PQ)](/developers/weaviate/concepts/vector-index.md#hnsw-with-product-quantizationpq) compression. <br/><br/> PQ assumes some data has already been loaded. You should have 10,000 to 100,000 vectors per shard loaded before you enable PQ. <br/><br/> For PQ configuration details, see [PQ configuration parameters](#pq-configuration-parameters). |

#### PQ configuration parameters

[Product quantization (PQ)](/developers/weaviate/concepts/vector-index.md#hnsw-with-product-quantizationpq) is a form of data compression that reduces the memory footprint of the index. HNSW is an in-memory index, so enabling PQ lets you work with larger datasets. For a discussion of how PQ saves memory, see [this blog post](/blog/pq-rescoring).

PQ relies on a codebook to compress the original vectors. The codebook defines 'centroids' that are used to calculate the compressed vector. Weaviate’s PQ implementation uses existing data to train the codebook. You must have some vectors loaded before you enable PQ so Weaviate can use them to define the centroids. A good recommendation is to have 10,000 to 100,000 vectors per shard loaded before you enable PQ.

These parameters let you fine tune `pq`.
 
| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `enabled` | boolean | `false` |  Enable PQ. Weaviate use product quantization (PQ) compression when `true`. |
| `trainingLimit` | integer | 100000 |  Object limit. The maximum number of objects, per shard, used to fit the centroids. Larger values increase the time it takes to fit the centroids. |
| `segments` | integer | - |T he number of segments to use. By default `segments` is equal to the number of vector dimensions. Reducing the number of segments reduces the size of the quantized (PQ compressed) vectors. <br/><br/> The number of segments must be divisible by the number of dimensions in each vector. |
| `centroids` | integer | 256 | The number of centroids to use. Reducing the number of centroids reduces the size of the quantized (PQ compressed) vectors at the price of recall. <br/><br/> If you use the `kmeans` encoder, `centroids` is set to 256 (one byte) by default. |
| `encoder` | string | `kmeans` | Encoder specification. There are two encoders. You can specify the `type` of encoder as either `kmeans`(default) or `tile`. | 
|`distribution`|string|`log-normal`| Encoder distribution type. Only used with the `tile` encoder. If you use the `tile` encoder, you can specify the `distribution` as `log-normal` (default) or `normal`. |

#### Collection configuration example 

This is a sample of collection that shows the [data schema](/developers/weaviate/configuration/schema-configuration.md):
  

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
```

### Dynamic ef

The `ef` parameter controls the size of the approximate nearest neighbors (ANN) list at query time. You can configure a specific size or else let Weaviate configure the list dynamically. If you choose dynamic `ef`, Weaviate provides several options to control the size of the ANN list.

The length of the list is determined by the query response limit that you set in your query. Weaviate uses the query limit as an anchor and modifies the size of ANN list according to the values you set for the `dynamicEf` parameters.

- `dynamicEfMin` sets a lower bound on the list length.
- `dynamicEfMax` sets an upper bound on the list length.
- `dynamicEfFactor` sets a range for the list.

To keep search recall high, the actual dynamic `ef` value stays above `dynamicEfMin` even if the query limit is small enough to suggest a lower value.

To keep search speed reasonable even when retrieving large result sets, the dynamic `ef` value is limited to `dynamicEfMax`. Weaviate doesn't exceed `dynamicEfMax` even if the query limit is large enough to suggest a higher value. If the query limit is higher than `dynamicEfMax`, `dynamicEfMax` does not have any effect. In this case, dynamic `ef` value is equal to the query limit.

To determine the length of the ANN list, Weaviate multiples the query limit by `dynamicEfFactor`. The list range is modified by `dynamicEfMin` and `dynamicEfMax`.

Consider this GraphQL query that sets a limit of 4.

```graphql
{
  Get {
    JeopardyQuestion(limit: 4) {
      answer
      question
    }
  }
}
```

Imagine the collection has dynamic `ef` configured.

```json
  "vectorIndexConfig": {
     "ef": -1,
     "dynamicEfMin": 5
     "dynamicEfMax": 25
     "dynamicEfFactor": 10
  }
```

The resulting ANN search list has these characteristics.

- A potential length of 40 objects ( ("dynamicEfFactor": 10) * (limit: 4) ).
- A minimum length of 5 objects ("dynamicEfMin": 5).
- A maximum length of 25 objects ("dynamicEfMax": 25).
- An actual size of 5 to 25 objects.

If you use the [`docker-compose.yml` file from Weavaite](/developers/weaviate/installation/docker-compose) to run your local instance, the file has an environment variable that sets a reasonable default query limit, `QUERY_DEFAULTS_LIMIT`. The value is significantly lower than QUERY_MAXIMUM_RESULTS to prevent out of memory errors.

To change the default limit, edit the value for `QUERY_DEFAULTS_LIMIT` when you configure your Weaviate instance.


### Configuration tips

Now you might be wondering: "What settings do I need for my use case?"

To determine this, you need to ask yourself the following questions and compare your answers in the table below:

1. How many queries am I expecting per second?
1. Am I expecting a lot of imports or updates?
1. How high should the recall be?

| Number of queries | Imports or updates | Recall level | Configuration suggestions |
| --- | --- | --- | --- |
| not many | no | low | This is the ideal scenario. Keep both the `ef` and `efConstruction` settings low. You don't need a big machine and you will still be happy with the results. |
| not many | no | high | Here the tricky thing is that your recall needs to be high, the fact you're not expecting a lot of requests or imports means that you can increase both the `ef` and `efConstruction` settings. Just keep increasing them until you are happy with the recall. In this case, you can get pretty close to 100%. |
| not many | yes | low | Here the tricky thing is the high volume of imports and updates. Whatever you do, make sure to keep `efConstruction` low. Luckily you don't need a high recall, and you're not expecting a lot of queries, so you can play around with the `ef` setting until you've reached the desired recall. |
| not many | yes | high | Now we need to start and pay attention, you need high recall _and_ you're dealing with a lot of imports or updates. This means that we need to keep the `efConstruction` setting low but we can significantly increase the `ef` settings because your queries per second will be low. |
| many | no | low | Many queries per second means a low `ef` setting. Luckily you don't need high accuracy and or recall so you can significantly increase the `efConstruction` value. |
| many | no | high | Many queries per second means a low `ef` setting. Because you need a high recall but are not expecting a lot of imports or updates, you can increase your `efConstruction` until you've reached the desired recall. |
| many | yes | low | Many queries per second means a low `ef` setting and a high amount of imports and updates means a low `efConstruction` as well. Luckily your recall does not have to be as close to 100% as possible, so you can set the `efConstruction` relatively low to support your input or update throughput while throttling the query per second speed with the `ef` setting. |
| many | yes | high | Aha, this means you're a perfectionist _or_ that you have a use case which needs the best of all three worlds. What we advise you to do is this: keep increasing your `efConstruction` until you've hit the time limit of imports and updates. Next, keep increasing the `ef` setting until you've reached the desired query per second vs recall trade-off. For what it's worth, many people _think_ they need this, but often they don't. We leave it up to you to decide, or ask for help in [our forum](https://forum.weaviate.io).

:::tip
If you're looking for a starting point for values, we would advise an `efConstruction` of `128`, `maxConnections` of `32`, and `ef` of `64`.
:::


Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](/developers/weaviate/modules/index.md) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](/developers/weaviate/configuration/schema-configuration.md).

### When to skip indexing

There are situations where it doesn't make sense to vectorize a collection. For example, if the collection consists solely of references between two other collections, or if the collection contains mostly duplicate elements.

Importing duplicate vectors into HNSW is very expensive. The import algorithm checks early on if a candidate vector's distance is greater than the worst candidate's distance. When there are lots of duplicate vectors, this early exit condition is never met so each import or query results in an exhaustive search.

To avoid indexing a collection, set `"skip"` to `"true"`. By default, collections are indexed.

### Deletions

Cleanup is an async process runs that rebuilds the HNSW graph after deletes and updates. Prior to cleanup, objects are marked as deleted, but they are still connected to the HNSW graph. During cleanup, the edges are reassigned and the objects are deleted for good.

### Asynchronous indexing (experimental)

:::info Available from version `v1.22`
:::

:::caution Experimental
As of `v1.22`, this is an experimental, opt-in feature. Please use with caution.
:::

Starting in Weaviate `1.22`, you can use asynchronous indexing by opting in.

Asynchronous indexing decouples object creation from vector index updates. Objects are created faster, and the vector index updates in the background. Asynchronous indexing is especially useful for importing large amounts of data.

Asynchronous indexing is off by default. It can be enabled by setting the `ASYNC_INDEXING` environment variable to `true` in the Weaviate configuration (e.g. in the `docker-compose.yml` file). This will enable asynchronous indexing for all collections.

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
    image: semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - "8080:8080"
     - "50051:50051"
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

If asynchronous indexing is enabled, and search is performed before vectir indexing is complete, a maximum of 100,000 un-indexed objects will be searched by brute force along with the indexed objects. This means that the search performance will be slower until the vector index has been fully updated, and any objects outside of the first 100,000 objects in the queue will not be searched.

The index status can be found through the [node status](/developers/weaviate/api/rest/nodes.md#usage) endpoint. The `nodes/shards/vectorQueueLength` field will show the number of remaining objects to be indexed.

import Nodes from '/_includes/code/nodes.mdx';

<Nodes/>

Then, you can check the status of the vector index queue by inspecting the output. The `vectorQueueLength` field will show the number of remaining objects to be indexed. In the example below, the vector index queue has 425 objects remaining to be indexed on the `TestArticle` shard, out of a total of 1000 objects.

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

## Inverted index

### Configure the inverted index

There are two indexes for filtering or searching the data, where the first (filterable) is for building a fast, Roaring Bitmaps index, and the second (searchable) index is for a BM25 or hybrid search.

So there are `indexFilterable` and `indexSearchable` keys that can be set to `true` (on) or `false` (off) on a property level. Both are _on_ by default.

The filterable index is only capable of filtering, while the searchable index can be used for both searching and filtering (though not as fast as the filterable index).

So, setting `"indexFilterable": false` and `"indexSearchable": true` (or not setting it at all) will have the trade-off of worse filtering performance but faster imports (due to only needing to update one index) and lower disk usage.

You can set these keys in the schema like shown below, at a property level:

```json
{
    "class": "Author",
    "properties": [ // <== note that the inverted index is set per property
        {
            "indexFilterable": false,  // <== turn off the filterable (Roaring Bitmap index) by setting `indexFilterable` to false
            "indexSearchable": false,  // <== turn off the searchable (for BM25/hybrid) by setting `indexSearchable` to false
            "dataType": [
                "text"
            ],
            "name": "name"
        }
    ]
}
```

A rule of thumb to follow when determining whether to switch off indexing is: _if you will never perform queries based on this property, you can turn it off._

:::tip Data types and indexes

Both `indexFilterable` and `indexSearchable` are available for all types of data. However, `indexSearchable` is only relevant for `text`/`text[]`, and in other cases it will be ignored.

:::

You can also enable an inverted index to search [based on timestamps](/developers/weaviate/config-refs/schema.md#invertedindexconfig--indextimestamps).

```js
{
    "class": "Author",
    "invertedIndexConfig": {
        "indexTimestamps": true // <== false by default
    },
    "properties": []
}
```

### Collections without indices

If you don't want to set an index at all, neither ANN nor inverted, this is possible too.

If we don't want to index the `Authors` we can simply skip all indices (vector _and_ inverted) like this:

```js
{
    "class": "Author",
    "description": "A description of this collection, in this case, it's about authors",
    "vectorIndexConfig": {
        "skip": true // <== disable vector index
    },
    "properties": [
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "indexSearchable": false,  // <== disable searchable index for this property
            "dataType": [
                "text"
            ],
            "description": "The name of the Author",
            "name": "name"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "int"
            ],
            "description": "The age of the Author",
            "name": "age"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "date"
            ],
            "description": "The date of birth of the Author",
            "name": "born"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "boolean"
            ],
            "description": "A boolean value if the Author won a nobel prize",
            "name": "wonNobelPrize"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "indexSearchable": false,  // <== disable searchable index for this property
            "dataType": [
                "text"
            ],
            "description": "A description of the author",
            "name": "description"
        }
    ]
}
```


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
