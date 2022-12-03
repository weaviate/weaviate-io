---
title: Vector Index
sidebar_position: 3
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Vector Index Type
# description: Vector Index Type
# tags: ['configuration', 'vector index']
# sidebar_position: 2
# open-graph-type: article
# toc: true
# redirect_from:
#     - /docs/weaviate/v1.11.0/configuration/vector-index-type.html
---

## Introduction

Weaviate's vector-first storage system takes care of all storage operations with a pluggable vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices). 

## Weaviate's vector index plugin
The first vector-storage plugin Weaviate supports is [HNSW](/docs/weaviate/vectorization/hnsw.md), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when in the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type, stay tuned for updates!

### How to configure HNSW
Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](/docs/weaviate/references/schema-configuration.md). 
- `"vectorIndexType": "hnsw"`: indicates which vector index type to use, in this case hnsw, which is provided by Weaviate itself. 
- `"vectorIndexConfig"`: an object where you can set specific parameters to the chosen vector index type, in this case to hnsw, which has the following parameters:
  - `"distance"`: The distance metric to be used to calculate the distance between any two arbitrary vectors. Defaults to `cosine`. See [supported metrics here](/docs/weaviate/references/distances.md).
  - `"ef"`: The higher `ef` is chosen, the more accurate, but also slower a search becomes. This helps in the recall/performance trade-off that is possible with HNSW. If you omit setting this field it will default to `-1` which means "Let Weaviate pick the right `ef` value". `ef` can be updated over time, and is not immutable like `efConstruction` and `maxConnections`.
  - `"efConstruction"`: controls index search speed/build speed tradeoff. Default is set to 128, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"maxConnections"`: the maximum number of connections per element in all layers. Default is set to 64, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"dynamicEfMin"`: If using dynamic `ef` (set to `-1`), this value acts as a lower boundary. Even if the limit is small enough to suggest a lower value, `ef` will never drop below this value. This helps in keeping search accuracy high even when setting very low limits, such as 1, 2, or 3. *Not available prior to `v1.10.0`. Defaults to `100`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"dynamicEfMax"`: If using dynamic `ef` (set to `-1`), this value acts as an upper boundary. Even if the limit is large enough to suggest a lower value, `ef` will be capped at this value. This helps to keep search speed reasonable when retrieving massive search result sets, e.g. 500+. Note that the maximum will not have any effect if the limit itself is higher than this maximum. In this case the limit will be chosen as `ef` to avoid a situation where `limit` would higher than `ef` which is impossible with HNSW. *Not available prior to `v1.10.0`. Defaults to `500`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"dynamicEfFactor"`: If using dynamic `ef` (set to `-1`), this value controls how `ef` is determined based on the given limit. E.g. with a factor of `8`, `ef` will be set to `8*limit` as long as this value is between the lower and upper boundary. It will be capped on either end, otherwise. *Not available prior to `v1.10.0`. Defaults to `8`. This setting has no effect if `ef` has a value other than `-1`.*
  - `"vectorCacheMaxObjects"`: For optimal search and import performance all previously imported vectors need to be held in memory. However, Weaviate also allows for limiting the number of vectors in memory. By default, when creating a new class, this limit is set to 2M objects. A disk lookup for a vector is orders of magnitudes slower than memory lookup, so the cache should be used sparingly. This field is mutable after initially creating the class.
  Generally we recommend that:
    - During imports set the limit so that all vectors can be held in memory. Each import requires multiple searches so import performance will drop drastically as not all vectors can be held in the cache.
    - When only or mostly querying (as opposed to bulk importing) you can experiment with vector cache limits which are lower than your total dataset size. Vectors which aren't currently in cache will be added to the cache if there is still room. If the cache runs full it is dropped entirely and all future vectors need to be read from disk for the first time. Subsequent queries will be taken from the cache, until it runs full again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, but a large percentage of users only query a specific subset of vectors. In this case you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.
  - `"flatSearchCutoff"`: Absolute number of objects configured as the threshold for a [flat-search cutoff](/docs/weaviate/architecture/prefiltering.md#flat-search-cutoff). If a filter on a filtered vector search matches fewer than the specified elements, the HNSW index is bypassed entirely and a flat (brute-force) search is performed instead. This can speed up queries with very restrictive filters considerably. Optional, defaults to `40000`. Set to `0` to turn off flat-search cutoff entirely.
  - `"cleanupIntervalSeconds"`: How often the async process runs that “repairs” the HNSW graph after deletes and updates. (Prior to the repair/cleanup process, deleted objects are simply marked as deleted, but still a fully connected member of the HNSW graph. After the repair has run, the edges are reassigned and the datapoints deleted for good). Typically this value does not need to be adjusted, but if deletes or updates are very frequent it might make sense to adjust the value up or down. (Higher value means it runs less frequently, but cleans up more in a single batch. Lower value means it runs more frequently, but might not be as efficient with each run).
  - `"skip"`: There are situations where it doesn't make sense to vectorize a class. For example if the class is just meant as glue between two other class (consisting only of references) or if the class contains mostly duplicate elements (Note that importing duplicate vectors into HNSW is very expensive as the algorithm uses a check whether a candidate's distance is higher than the worst candidate's distance for an early exit condition. With (mostly) identical vectors, this early exit condition is never met leading to an exhaustive search on each import or query). In this case, you can `skip` indexing a vector all-together. To do so, set `"skip"` to `"true"`. `skip` defaults to `false`; if not set to `true`, classes will be indexed normally. This setting is immutable after class initialization. _Note that the creation of a vector through a module is decoupled from storing the vector in Weaviate. So, simply skipping the indexing does not skip the generation of a vector if a vectorizer other than `none` is configured on the class (for example through a global default). It is therefore recommended to always set: `"vectorizer": "none"` explicitly when skipping the vector indexing. If vector indexing is skipped, but a vectorizer is configured (or a vector is provided manually) a warning is logged on each import._

Example of a class could be [configured in your data schema](/docs/weaviate/references/schema-configuration.md): 
```json
{
  "class": "Article",
  "description": "string",
  "properties": [ 
    {
      "name": "title",
      "description": "string",
      "dataType": ["string"]
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

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](/docs/weaviate/modules/index.md) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](/docs/weaviate/references/schema-configuration.md).
## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
