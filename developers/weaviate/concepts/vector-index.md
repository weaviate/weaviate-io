---
title: Vector Indexing
sidebar_position: 23
image: og/docs/concepts.jpg
# tags: ['vector index plugins']
---

Vector indexing is a key component of vector databases. It can help to [significantly **increase the speed** of the search process of similarity search](https://weaviate.io/blog/why-is-vector-search-so-fast) with only a minimal tradeoff in search accuracy ([HNSW index](#hnsw-index)), or efficiently store many subsets of data in a small memory footprint ([flat index](#flat-index)). The [dynamic index](#dynamic-index) can even start off as a flat index and then dynamically switch to the HNSW index as it scales past a threshold.

Weaviate's vector-first storage system takes care of all storage operations with a vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices).

Weaviate supports two types of vector indexing:
* [flat index](#flat-index): a simple, lightweight index that is designed for small datasets.
* [HNSW index](#hnsw-index): a more complex index that is slower to build, but it scales well to large datasets as queries have a logarithmic time complexity.
* [dynamic index](#dynamic-index): allows you to automatically switch from a flat index to an HNSW index as object count scales

:::caution Experimental feature
Dynamic indexing was added in `v1.25` and is currently an experimental feature. Please use with caution.
:::

This page explains what vector indices are, and what purpose they serve in the Weaviate vector database.


## Why do you need vector indexing?

[Vector embeddings](https://weaviate.io/blog/vector-embeddings-explained) are a great way to represent meaning. Vectors embeddings are arrays of elements that can capture meaning from different data types, such as texts, images, videos, and other content. The number of elements are called dimensions. High dimension vectors capture more information, but they are harder to work with.

Vector databases make it easier to work with high dimensional vectors. Consider search; Vector databases efficiently measure semantic similarity between data objects. When you run a [similarity search](https://weaviate.io/developers/weaviate/search/similarity), a vector database like Weaviate uses a vectorized version of the query to find objects in the database that have vectors similar to the query vector.

Vectors are like coordinates in a multi-dimensional space. A very simple vector might represent objects, *words* in this case, in a 2-dimensional space.

In the graph below, the words `Apple` and `Banana` are shown close to each other. `Newspaper` and `Magazine` are also close to each other, but they are far away from `Apple` and `Banana` in the same vector space.

Within each pair, the distance between words is small because the objects have similar vector representations. The distance between the pairs is larger because the difference between the vectors is larger. Intuitively, fruits are similar to each other, but fruits are not similar to reading material.

For more details of this representation, see: ([GloVe](https://github.com/stanfordnlp/GloVe)) and [vector embeddings](https://weaviate.io/blog/vector-embeddings-explained#what-exactly-are-vector-embeddings).

![2D Vector embedding visualization](./img/vectors-2d.png "2D Vectors visualization")

Another way to think of this is how products are placed in a supermarket. You'd expect to find `Apples` close to `Bananas`, because they are both fruit. But when you are searching for a `Magazine`, you would move away from the `Apples` and `Bananas`, more towards the aisle with, for example, `Newspapers`. This is how the semantics of concepts can be stored in Weaviate as well, depending on the module you're using to calculate the numbers in the vectors. Not only words or text can be indexed as vectors, but also images, video, DNA sequences, etc. Read more about which model to use [here](/developers/weaviate/modules/index.md).

![Supermarket map visualization as analogy for vector indexing](./img/supermarket.svg "Supermarket map visualization")

:::tip
You might be also interested in our blog post [Why is vector search to fast?](https://weaviate.io/blog/why-is-vector-search-so-fast).
:::

## Hierarchical Navigable Small World (HNSW) index

**Hierarchical Navigable Small World (HNSW)** is an algorithm that works on multi-layered graphs. It is also an index type, and refers to vector indexes that are created using the HNSW algorithm. HNSW indexes enable very fast queries, but rebuilding the index when you add new vectors can be resource intensive.

Weaviate's `hnsw` index is a [custom implementation](../more-resources/faq.md#q-does-weaviate-use-hnswlib) of the Hierarchical Navigable Small World ([HNSW](https://arxiv.org/abs/1603.09320)) algorithm that offers full [CRUD-support](https://db-engines.com/en/blog_post/87).

At build time, the HNSW algorithm creates a series of layers. At query time, the HNSW algorithm uses the layers to build a list of approximate nearest neighbors (ANN) quickly and efficiently.

Consider this diagram of a vector search using HNSW.

![HNSW layers](./img/hnsw-layers.svg "HNSW layers")

An individual object can exist in more than one layer, but every object in the database is represented in the lowest layer (layer zero in the picture). The layer zero data objects are very well connected to each other. Each layer above the lowest layer has fewer data object, and fewer connections. The data objects in the higher layers correspond to the objects in the lower layers, but each higher layer has exponentially fewer objects than the layer below. The HNSW algorithm takes advantage of the layers to efficiently process large amounts of data.

When a search query comes in, the HNSW algorithm finds the closest matching data points in the highest layer. Then, HNSW goes one layer deeper, and finds the closest data points in that layer to the ones in the higher layer. These are the nearest neighbors. The algorithm searches the lower layer to create a new list of nearest neighbors. Then, HNSW uses the new list and repeats the process on the next layer down. When it gets to the deepest layer, the HNSW algorithm returns the data objects closest to the search query.

Since there are relatively few data objects on the higher layers, HNSW has to search fewer objects. This means HNSW 'jumps' over large amounts of data that it doesn't need to search. When a data store has only one layer, the search algorithm can't skip unrelated objects. It has to search significantly more data objects even though they are unlikely to match.

HNSW is very fast, memory efficient, approach to similarity search. The memory cache only stores the highest layer instead of storing all of the data objects in the lowest layer. When the search moves from a higher layer to a lower one, HNSW only adds the data objects that are closest to the search query. This means HNSW uses a relatively small amount of memory compared to other search algorithms.

Have another look at the diagram; it demonstrates how the HNSW algorithm searches. The blue search vector in the top layer connects to a partial result in layer one. The objects in layer one lead HNSW to the result set in layer zero. HNSW makes three hops through the layers (the dotted blue lines) and skips objects that are unrelated to the search query.

If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)).

### Managing search quality vs speed tradeoffs

HNSW parameters can be adjusted to adjust search quality against speed.

The `ef` parameter is a critical setting for balancing the trade-off between search speed and quality.

The `ef` parameter dictates the size of the dynamic list used by the HNSW algorithm during the search process. A higher `ef` value results in a more extensive search, enhancing accuracy but potentially slowing down the query.

In contrast, a lower `ef` makes the search faster but might compromise on accuracy. This balance is crucial in scenarios where either speed or accuracy is a priority. For instance, in applications where rapid responses are critical, a lower `ef` might be preferable, even at the expense of some accuracy. Conversely, in analytical or research contexts where precision is paramount, a higher `ef` would be more suitable, despite the increased query time.

`ef` can be configured explicitly or dynamically. This feature is particularly beneficial in environments with varying query patterns. When `ef` is configured dynamically, Weaviate optimizes the balance between speed and recall based on real-time query requirements.

To enable dynamic `ef`, set `ef`: -1. Weaviate adjusts the size of the ANN list based on the query response limit. The calculation also takes into account the values of `dynamicEfMin`, `dynamicEfMax`, and `dynamicEfFactor`.

### Dynamic ef

The `ef` parameter controls the size of the ANN list at query time. You can configure a specific list size or else let Weaviate configure the list dynamically. If you choose dynamic `ef`, Weaviate provides several options to control the size of the ANN list.

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

The resulting search list has these characteristics.

- A potential length of 40 objects ( ("dynamicEfFactor": 10) * (limit: 4) ).
- A minimum length of 5 objects ("dynamicEfMin": 5).
- A maximum length of 25 objects ("dynamicEfMax": 25).
- An actual size of 5 to 25 objects.

If you use the [`docker-compose.yml` file from Weaviate](/developers/weaviate/installation/docker-compose) to run your local instance, the `QUERY_DEFAULTS_LIMIT` environment variable sets a reasonable default query limit. To prevent out of memory errors,`QUERY_DEFAULTS_LIMIT` is significantly lower than `QUERY_MAXIMUM_RESULTS`.

To change the default limit, edit the value for `QUERY_DEFAULTS_LIMIT` when you configure your Weaviate instance.

### Deletions

Cleanup is an async process runs that rebuilds the HNSW graph after deletes and updates. Prior to cleanup, objects are marked as deleted, but they are still connected to the HNSW graph. During cleanup, the edges are reassigned and the objects are deleted for good.

### Asynchronous indexing

:::caution Experimental
Available starting in `v1.22`. This is an experimental feature. Please use with caution.
:::

Starting in Weaviate `1.22`, you can use asynchronous indexing by opting in.

Asynchronous indexing decouples object creation from vector index updates. Objects are created faster, and the vector index updates in the background. Asynchronous indexing is especially useful for importing large amounts of data.

While the vector index is updating, Weaviate can search a maximum of 100,000 un-indexed objects by brute force, that is, without using the vector index. This means that the search performance is slower until the vector index has been fully updated. Also, any additional new objects beyond the first 100,000 in the queue are not include in the search.

:::tip
You might be also interested in our blog post [Vamana vs. HNSW - Exploring ANN algorithms Part 1](https://weaviate.io/blog/ann-algorithms-vamana-vs-hnsw).
:::

## Flat index

:::info Added in `v1.23`
:::

The **flat index** is a simple, lightweight index that is fast to build and has a very small memory footprint. This index type is a good choice for use cases where each end user (i.e. tenant) has their own, isolated, dataset, such as in a SaaS product for example, or a database of isolated record sets.

As the name suggests, the flat index is a single layer of disk-backed data objects and thus a very small memory footprint. The flat index is a good choice for small collections, such as for multi-tenancy use cases.

A drawback of the flat index is that it does not scale well to large collections as it has a linear time complexity as a function of the number of data objects, unlike the `hnsw` index which has a logarithmic time complexity.

## Dynamic index

:::caution Experimental feature
Dynamic indexing was added in `v1.25` and is currently an experimental feature. Please use with caution.
:::

The flat index is ideal for use cases with a small object count and provides lower memory overhead and good latency. As the object count increases the HNSW index provides a more viable solution as HNSW speeds up search. The goal of the dynamic index is to shorten latencies during querying time at the cost of a larger memory footprint as you scale.

By configuring a dynamic index, you can automatically switch from flat to HNSW indexes. This switch occurs when the object count exceeds a prespecified threshold (by default 10,000). This functionality only works with async indexing enabled. When the threshold is hit while importing, all the data piles up in the async queue, the HNSW index is constructed in the background and when ready the swap from flat to HNSW is completed.

Currently, this is only a one-way upgrade from a flat to an HNSW index, it does not support changing back to a flat index even if the object count goes below the threshold due to deletion.

This is particularly useful in a multi-tenant setup where building an HNSW index per tenant would introduce extra overhead. With a dynamic index, as individual tenants grow their index will switch from flat to HNSW, while smaller tenants' indexes remain flat.

## Vector cache considerations

For optimal search and import performance, previously imported vectors need to be in memory. A disk lookup for a vector is orders of magnitudes slower than memory lookup, so the disk cache should be used sparingly. However, Weaviate can limit the number of vectors in memory. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created.

During import set `vectorCacheMaxObjects` high enough that all vectors can be held in memory. Each import requires multiple searches. Import performance drops drastically when there isn't enough memory to hold all of the vectors in the cache.

After import, when your workload is mostly querying, experiment with vector cache limits that are less than your total dataset size.

Vectors that aren't currently in cache are added to the cache if there is still room. If the cache fills, Weaviate drops the whole cache. All future vectors have to be read from disk for the first time. Then, subsequent queries run against the cache until it fills again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, and a large percentage of users only query a specific subset of vectors. In this case you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.

## Vector indexing FAQ

### Can I use vector indexing with vector quantization?

Yes, you can read more about it in [vector quantization (compression)](./vector-quantization.md).

### Which vector index is right for me?

A simple heuristic is that for use cases such as SaaS products where each end user (i.e. tenant) has their own, isolated, dataset, the `flat` index is a good choice. For use cases with large collections, the `hnsw` index may be a better choice.

Note that the vector index type parameter only specifies how the vectors of data objects are *indexed*. The index is used for data retrieval and similarity search.

The `vectorizer` parameter determines how the data vectors are created (which numbers the vectors contain). `vectorizer` specifies a [module](/developers/weaviate/modules/index.md), such as `text2vec-contextionary`, that Weaviate uses to create the vectors. (You can also set to `vectorizer` to `none` if you want to import your own vectors).

To learn more about configuring the collection, see [this how-to page](../manage-data/collections.mdx).

### Which distance metrics can I use with vector indexing?

All of [the distance metrics](/developers/weaviate/config-refs/distances.md), such as cosine similarity, can be used with any vector index type.

### How to configure the vector index type in Weaviate?

The index type can be specified per data collection via the [collection definition](/developers/weaviate/manage-data/collections.mdx#set-vector-index-type) settings, according to available [vector index settings](../config-refs/schema/vector-index.md).

### When to skip indexing

There are situations where it doesn't make sense to vectorize a collection. For example, if the collection consists solely of references between two other collections, or if the collection contains mostly duplicate elements.

Importing duplicate vectors into HNSW is very expensive. The import algorithm checks early on if a candidate vector's distance is greater than the worst candidate's distance. When there are lots of duplicate vectors, this early exit condition is never met so each import or query results in an exhaustive search.

To avoid indexing a collection, set `"skip"` to `"true"`. By default, collections are indexed.

## Further resources

:::info Related pages
- [Concepts: Indexing](./indexing.md)
- [Concepts: Vector quantization (compression)](./vector-quantization.md)
- [Configuration: Vector index](../config-refs/schema/vector-index.md)
- [Configuration: Schema (Configure semantic indexing)](../config-refs/schema/index.md#configure-semantic-indexing)
:::

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
