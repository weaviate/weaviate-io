---
layout: layout-documentation
solution: weaviate
sub-menu: Vector Index (ANN) Plugins
title: HNSW
description: HNSW
tags: ['HNSW']
sidebar_position: 1
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/vector-index-plugins/hsnw.html
---

# Introduction
[HNSW](https://arxiv.org/abs/1603.09320) is the first vector index type supported by Weaviate.

# What is HNSW?
HNSW stands for Hierarchical Navigable Small World, a multilayered graph. Every object that is in the database, are captured in the lowest layer (layer 0 in the picture). These data objects are very well connected. On each layer on top of the lowest layer, there are fewer data points represented. These datapoints match with lower layers, but there are exponentially less points in each higher layer. If a search query comes in, the closest datapoints will be found in the highest layer. In the example below that is only one more datapoint. Then it goes one layer deeper, and finds the closest datapoints from the first found datapoint in the highest layer, and searches nearest neighbors from there. In the deepest layer, the actual closest data object to the search query will be found. 

If there were no hierarchical layers in this approach, only the deepest layer (0) would be present and significantly more datapoints would have needed to be explored from the search query, since all data objects are present there. In higher layers, with less datapoints, fewer hops between datapoints need to be made, over larger distances. HNSW is a very fast and memory efficient approach of similarity search, because only the highest layer (top layer) is kept in cache instead of all the datapoints in the lowest layer. Only the datapoints that are closest to the search query are loaded once they are requested by a higher layer, which means that only a small amount of memory needs to be reserved.

The picture shows how a HNSW algorithm is used to go from a search query vector (blue) on the top layer to the closes search result (green) in the lowest layer. Only three data hops are made (indicated by blue solid arrows), whereas more data objects would have need to be search through when this layering was not present (the closest datapoint of *all* datapoints in each layer needs to be found). 

<!-- ![HNSW layers](/img/guides/hnsw-layers.svg "HNSW layers"){:height="50%" width="50%"} -->

## Distance metrics

All [distance metrics supported in Weaviate](../vector-index-plugins/distances.html) are also supported with the HNSW index type.

# How to use HNSW and parameters
Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](../schema/schema-configuration.html). 
- `"vectorIndexType": "hnsw"`: indicates which vector index type to use, in this case hnsw, which is provided by Weaviate itself. 
- `"vectorIndexConfig"`: an object where you can set specific parameters to the chosen vector index type, in this case to hnsw, which has the following parameters:
  - `"distance"`: The distance metric to be used to calculate the distance between any two arbitrary vectors. Defaults to `cosine`. See [supported metrics here](../vector-index-plugins/distances.html).
  - `"ef"`: The higher `ef` is chosen, the more accurate, but also slower a search becomes. This helps in the recall/performance trade-off that is possible with HNSW. If you omit setting this field it will default to `-1` which means "Let Weaviate pick the right `ef` value". `ef` can be updated over time, and is not immutable like `efConstruction` and `maxConnections`.
  - `"efConstruction"`: controls index search speed/build speed tradeoff. Default is set to 128, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"maxConnections"`: the maximum number of connections per element in all layers. Default is set to 64, the integer should be greater than 0. This setting is immutable after class initialization.
  - `"dynamicEfMin"`: If using dynamic `ef` (set to `-1`), this value acts as a
    lower boundary. Even if the limit is small enough to suggest a lower value,
    `ef` will never drop below this value. This helps in keeping search
    accuracy high even when setting very low limits, such as 1, 2, or 3.
    *Not available prior to `v1.10.0`. Defaults to `100`. This setting has no
    effect if `ef` has a value other than `-1`.*
  - `"dynamicEfMax"`: If using dynamic `ef` (set to `-1`), this value acts as
    an upper boundary. Even if the limit is large enough to suggest a lower
    value, `ef` will be capped at this value. This helps to keep search speed
    reasonable when retrieving massive search result sets, e.g. 500+. Note that
    the maximum will not have any effect if the limit itself is higher than
    this maximum. In this case the limit will be chosen as `ef` to avoid a
    situation where `limit` would higher than `ef` which is impossible with
    HNSW. *Not available prior to `v1.10.0`. Defaults to `500`. This setting
    has no effect if `ef` has a value other than `-1`.*
  - `"dynamicEfFactor"`: If using dynamic `ef` (set to `-1`), this value
    controls how `ef` is determined based on the given limit. E.g. with a
    factor of `8`, `ef` will be set to `8*limit` as long as this value is
    between the lower and upper boundary. It will be capped on either end,
    otherwise. *Not available prior to `v1.10.0`. Defaults to `8`. This setting
    has no effect if `ef` has a value other than `-1`.*
  - `"vectorCacheMaxObjects"`: For optimal search and import performance all previously imported vectors need to be held in memory. However, Weaviate also allows for limiting the number of vectors in memory. By default, when creating a new class, this limit is set to 2M objects. A disk lookup for a vector is orders of magnitudes slower than memory lookup, so the cache should be used sparingly. This field is mutable after initially creating the class.
  Generally we recommend that:
    - During imports set the limit so that all vectors can be held in memory. Each
      import requires multiple searches so import performance will drop drastically
      as not all vectors can be held in the cache.
    - When only or mostly querying (as opposed to bulk importing) you can
      experiment with vector cache limits which are lower than your total dataset
      size. Vectors which aren't currently in cache will be added to the cache if
      there is still room. If the cache runs full it is dropped entirely and all
      future vectors need to be read from disk for the first time. Subsequent
      queries will be taken from the cache, until it runs full again and the
      procedure repeats. Note that the cache can be a very valuable tool if you
      have a large dataset, but a large percentage of users only query a specific
      subset of vectors. In this case you might be able to serve the largest user
      group from cache while requiring disk lookups for "irregular" queries.
  - `"flatSearchCutoff"`: Absolute number of objects configured as the
    threshold for a [flat-search
    cutoff](../architecture/prefiltering.html#flat-search-cutoff). If a filter
    on a filtered vector search matches fewer than the specified elements, the
    HNSW index is bypassed entirely and a flat (brute-force) search is
    performed instead. This can speed up queries with very restrictive filters
    considerably. Optional, defaults to `40000`. Set to `0` to turn off
    flat-search cutoff entirely.
  - `"cleanupIntervalSeconds"`: How often the async process runs that “repairs” the HNSW graph after deletes and updates. (Prior to the repair/cleanup process, deleted objects are simply marked as deleted, but still a fully connected member of the HNSW graph. After the repair has run, the edges are reassigned and the datapoints deleted for good). Typically this value does not need to be adjusted, but if deletes or updates are very frequent it might make sense to adjust the value up or down. (Higher value means it runs less frequently, but cleans up more in a single batch. Lower value means it runs more frequently, but might not be as efficient with each run).
  - `"skip"`: There are situations where it doesn't make sense to vectorize a class. For example if the class is just meant as glue between two other class (consisting only of references) or if the class contains mostly duplicate elements (Note that importing duplicate vectors into HNSW is very expensive as the algorithm uses a check whether a candidate's distance is higher than the worst candidate's distance for an early exit condition. With (mostly) identical vectors, this early exit condition is never met leading to an exhaustive search on each import or query). In this case, you can `skip` indexing a vector all-together. To do so, set `"skip"` to `"true"`. `skip` defaults to `false`; if not set to `true`, classes will be indexed normally. This setting is immutable after class initialization. _Note that the creation of a vector through a module is decoupled from storing the vector in Weaviate. So, simply skipping the indexing does not skip the generation of a vector if a vectorizer other than `none` is configured on the class (for example through a global default). It is therefore recommended to always set: `"vectorizer": "none"` explicitly when skipping the vector indexing. If vector indexing is skipped, but a vectorizer is configured (or a vector is provided manually) a warning is logged on each import._

Example of a class could be [configured in your data schema](../schema/schema-configuration.html): 
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

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](../modules/index.html) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](../schema/schema-configuration.html).


# More Resources

{% include docs-support-links.html %}
