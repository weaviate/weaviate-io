---
title: Indexes
sidebar_position: 13
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- Adds text re: configuration options from `Vector index plugins/HNSW`
::: -->

:::info Related pages
- [Concepts: Indexing](../concepts/indexing.md)
- [Concepts: Vector Indexing](../concepts/vector-index.md)
:::

## Vector index

Weaviate's vector-first storage system takes care of all storage operations with a vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices).

## Weaviate's vector index
The first vector index Weaviate supports is [HNSW](/developers/weaviate/concepts/vector-index.md#hnsw), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when in the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type. Stay tuned for updates!

### How to configure HNSW
Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](/developers/weaviate/configuration/schema-configuration.md).

- `vectorIndexType` is the ANN algorithm you want to use. By default, Weaviate selects `hnsw` -- the Hierarchical Navigable Small World (HNSW) algorithm.
- `"vectorIndexConfig"`: an object where you can set specific parameters to the chosen vector index type, in this case to hnsw, which has the following parameters:
  - `"distance"`: The distance metric to be used to calculate the distance between any two arbitrary vectors. Defaults to `cosine`. See [supported metrics here](/developers/weaviate/config-refs/distances.md).
  - `"ef"`: The higher `ef` is chosen, the more accurate, but also slower a search becomes. This helps in the recall/performance trade-off that is possible with HNSW. If you omit setting this field it will default to `-1` which means "Let Weaviate pick the right `ef` value". `ef` can be updated over time, and is not immutable like `efConstruction` and `maxConnections`.
  - `"efConstruction"`: controls index search speed/build speed tradeoff. The tradeoff here is on importing. So a high `efConstruction` means that you can lower your `ef` settings but that importing will be slower. Default is set to 128, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"maxConnections"`: the maximum number of connections per element in all layers. Default is set to 64, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"dynamicEfMin"`: If using dynamic `ef` (set to `-1`), this value acts as a lower boundary. Even if the limit is small enough to suggest a lower value, `ef` will never drop below this value. This helps in keeping search accuracy high even when setting very low limits, such as 1, 2, or 3. *Not available prior to `v1.10.0`. Defaults to `100`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"dynamicEfMax"`: If using dynamic `ef` (set to `-1`), this value acts as an upper boundary. Even if the limit is large enough to suggest a lower value, `ef` will be capped at this value. This helps to keep search speed reasonable when retrieving massive search result sets, e.g. 500+. Note that the maximum will not have any effect if the limit itself is higher than this maximum. In this case the limit will be chosen as `ef` to avoid a situation where `limit` would higher than `ef` which is impossible with HNSW. *Not available prior to `v1.10.0`. Defaults to `500`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"dynamicEfFactor"`: If using dynamic `ef` (set to `-1`), this value controls how `ef` is determined based on the given limit. E.g. with a factor of `8`, `ef` will be set to `8*limit` as long as this value is between the lower and upper boundary. It will be capped on either end, otherwise. *Not available prior to `v1.10.0`. Defaults to `8`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"vectorCacheMaxObjects"`: For optimal search and import performance all previously imported vectors need to be held in memory. However, Weaviate also allows for limiting the number of vectors in memory. By default, when creating a new class, this limit is set to one trillion (i.e. `1e12`) objects. A disk lookup for a vector is orders of magnitudes slower than memory lookup, so the cache should be used sparingly. This field is mutable after initially creating the class.
  Generally we recommend that:
    - During imports set the limit so that all vectors can be held in memory. Each import requires multiple searches so import performance will drop drastically as not all vectors can be held in the cache.
    - When only or mostly querying (as opposed to bulk importing) you can experiment with vector cache limits which are lower than your total dataset size. Vectors which aren't currently in cache will be added to the cache if there is still room. If the cache runs full it is dropped entirely and all future vectors need to be read from disk for the first time. Subsequent queries will be taken from the cache, until it runs full again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, but a large percentage of users only query a specific subset of vectors. In this case you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.
  - `"flatSearchCutoff"`: Absolute number of objects configured as the threshold for a [flat-search cutoff](/developers/weaviate/concepts/prefiltering.md#flat-search-cutoff). If a filter on a filtered vector search matches fewer than the specified elements, the HNSW index is bypassed entirely and a flat (brute-force) search is performed instead. This can speed up queries with very restrictive filters considerably. Optional, defaults to `40000`. Set to `0` to turn off flat-search cutoff entirely.
  - `"cleanupIntervalSeconds"`: How often the async process runs that "repairs" the HNSW graph after deletes and updates. (Prior to the repair/cleanup process, deleted objects are simply marked as deleted, but still a fully connected member of the HNSW graph. After the repair has run, the edges are reassigned and the datapoints deleted for good). Typically this value does not need to be adjusted, but if deletes or updates are very frequent it might make sense to adjust the value up or down. (Higher value means it runs less frequently, but cleans up more in a single batch. Lower value means it runs more frequently, but might not be as efficient with each run).
  - `"pq"`: **This is an experimental feature released with 1.18.** Used to enable [product quantization](/developers/weaviate/concepts/vector-index.md#hnsw-with-product-quantizationpq) which is a technique that allows for Weaviate’s HNSW vector index to store vectors using fewer bytes. As HNSW stores vectors in memory, this allows for running larger datasets on a given amount of memory. *Weaviate’s HNSW implementation assumes that product quantization will occur after some data has already been loaded. The reason for this is that the codebook needs to be trained on existing data. A good recommendation is to have 10,000 to 100,000 vectors per shard loaded before enabling product quantization.* Please refer to the parameters that can be configured for `"pq"` below:
    - `enabled`: Whether product quantization is enabled or not (defaults to `false`). To enable set to `true`.
    - `segments`: The number of segments to use. By default this is equal to the number of dimensions. Reducing the number of segments will further reduce the size of the quantized vectors. The number of segments must be divisible by the number of dimensions of each vector.
    - `centroids`: The number of centroids to use. Reducing the number of centroids will further reduce the size of quantized vectors at the price of recall. When using the `kmeans` encoder, centroids is set to 256 or one byte by default in Weaviate.
    - `encoder`: An object with encoder specific information. Here you can specify the `type` of encoder as either `kmeans`(default) or `tile`. If using the `tile` encoder you can also specify the `distribution` as `log-normal` (default) or `normal`.
  - `"skip"`: There are situations where it doesn't make sense to vectorize a class. For example if the class is just meant as glue between two other class (consisting only of references) or if the class contains mostly duplicate elements (Note that importing duplicate vectors into HNSW is very expensive as the algorithm uses a check whether a candidate's distance is higher than the worst candidate's distance for an early exit condition. With (mostly) identical vectors, this early exit condition is never met leading to an exhaustive search on each import or query). In this case, you can `skip` indexing a vector all-together. To do so, set `"skip"` to `"true"`. `skip` defaults to `false`; if not set to `true`, classes will be indexed normally. This setting is immutable after class initialization. _Note that the creation of a vector through a module is decoupled from storing the vector in Weaviate. So, simply skipping the indexing does not skip the generation of a vector if a vectorizer other than `none` is configured on the class (for example through a global default). It is therefore recommended to always set: `"vectorizer": "none"` explicitly when skipping the vector indexing. If vector indexing is skipped, but a vectorizer is configured (or a vector is provided manually) a warning is logged on each import._

Example of a class could be [configured in your data schema](/developers/weaviate/configuration/schema-configuration.md):

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

### Configuration tips

Now you might be wondering: "What settings do I need for my use case?"

To determine this, you need to ask yourself the following questions and compare your answers in the table below:

1. How many queries am I expecting per second?
1. Am I expecting a lot of imports or updates?
1. How high should the recall be?

| Answer to Q1 | Answer to Q2 | Answer to Q3 | configuration |
| --- | --- | --- | --- |
| not many | no | low | This is the ideal scenario, just keep increasing both the `ef` and `efConstruction` settings low. You don't need a big machine and you will still be happy with the results. |
| not many | no | high | Here the tricky thing is that your recall needs to be high, the fact you're not expecting a lot of requests or imports means that you can increase both the `ef` and `efConstruction` settings. Just keep increasing them until you are happy with the recall. In this case, you can get pretty close to 100%. |
| not many | yes | low | Here the tricky thing is the high volume of imports and updates. Whatever you do, make sure to keep `efConstruction` low. Luckily you don't need a high recall, and you're not expecting a lot of queries, so you can play around with the `ef` setting until you've reached the desired recall. |
| not many | yes | high | Now we need to start and pay attention, you need high recall _and_ you're dealing with a lot of imports or updates. This means that we need to keep the `efConstruction` setting low but we can significantly increase the `ef` settings because your queries per second will be low. |
| many | no | low | Many queries per second means a low `ef` setting. Luckily you don't need high accuracy and or recall so you can significantly increase the `efConstruction` value. |
| many | no | high | Many queries per second means a low `ef` setting. Because you need a high recall but are not expecting a lot of imports or updates, you can increase your `efConstruction` until you've reached the desired recall. |
| many | yes | low | Many queries per second means a low `ef` setting and a high amount of imports and updates means a low `efConstruction` as well. Luckily your recall does not have to be as close to 100% as possible, so you can set the `efConstruction` relatively low to support your input or update throughput while throttling the query per second speed with the `ef` setting. |
| many | yes | high | Aha, this means you're a perfectionist _or_ that you have a use case which needs the best of all three worlds. What we advise you to do is this: keep increasing your `efConstruction` until you've hit the time limit of imports and updates. Next, keep increasing the `ef` setting until you've reached the desired query per second vs recall trade-off. For what it's worth, many people _think_ they need this, but often they don't. We leave it up to you to decide, or ask for help on our [Slack channel](https://weaviate.io/slack).

:::tip
If you're looking for a starting point for values, we would advise an `efConstruction` of `128`, `maxConnections` of `32`, and `ef` of `64`.
:::


Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](/developers/weaviate/modules/index.md) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](/developers/weaviate/configuration/schema-configuration.md).

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

You can also enable an inverted index to search [based on timestamps](/developers/weaviate/config-refs/schema.mdx#invertedindexconfig--indextimestamps).

```js
{
    "class": "Author",
    "invertedIndexConfig": {
        "indexTimestamps": true // <== false by default
    },
    "properties": []
}
```

### Classes without indices

If you don't want to set an index at all, neither ANN nor inverted, this is possible too.

If we don't want to index the `Authors` we can simply skip all indices (vector _and_ inverted) like this:

```js
{
    "class": "Author",
    "description": "A description of this class, in this case, it's about authors",
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

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
