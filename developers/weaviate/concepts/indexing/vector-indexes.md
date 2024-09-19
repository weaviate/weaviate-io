---
title: Vector indexes overview
sidebar_position: 10
image: og/docs/indexing.jpg
# tags: ['vector index plugins']
---

Vector indexing is a key component of vector databases. It can help to [significantly **increase the speed** of the search process of similarity search](https://weaviate.io/blog/why-is-vector-search-so-fast) with only a minimal tradeoff in search accuracy ([HNSW index](#hierarchical-navigable-small-world-hnsw-index)), or efficiently store many subsets of data in a small memory footprint ([flat index](#flat-index)). The [dynamic index](#dynamic-index) can even start off as a flat index and then dynamically switch to the HNSW index as it scales past a threshold.

Weaviate's vector-first storage system takes care of all storage operations with a vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indexes).

Weaviate supports these vector index types:
* [flat index](#flat-index): a simple, lightweight index that is designed for small datasets.
* [HNSW index](#hierarchical-navigable-small-world-hnsw-index): a more complex index that is slower to build, but it scales well to large datasets as queries have a logarithmic time complexity.
* [dynamic index](#dynamic-index): allows you to automatically switch from a flat index to an HNSW index as object count scales

:::caution Experimental feature
Available starting in `v1.25`. This is an experimental feature. Use with caution.
:::

This page explains what vector indexes are, and what purpose they serve in the Weaviate vector database.

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

Add summary

### Asynchronous indexing

:::caution Experimental
Available starting in `v1.22`. This is an experimental feature. Use with caution.
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
Available starting in `v1.25`. This is an experimental feature. Use with caution.
:::

import DynamicAsyncRequirements from '/_includes/dynamic-index-async-req.mdx';

<DynamicAsyncRequirements/>

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

Yes, you can read more about it in [vector quantization (compression)](DWCTODO).

### Which vector index is right for me?

A simple heuristic is that for use cases such as SaaS products where each end user (i.e. tenant) has their own, isolated, dataset, the `flat` index is a good choice. For use cases with large collections, the `hnsw` index may be a better choice.

Note that the vector index type parameter only specifies how the vectors of data objects are *indexed*. The index is used for data retrieval and similarity search.

The `vectorizer` parameter determines how the data vectors are created (which numbers the vectors contain). `vectorizer` specifies a [module](/developers/weaviate/modules/index.md), such as `text2vec-contextionary`, that Weaviate uses to create the vectors. (You can also set to `vectorizer` to `none` if you want to import your own vectors).

To learn more about configuring the collection, see [this how-to page](/developers/weaviate/manage-data/collections).

### Which distance metrics can I use with vector indexing?

All of [the distance metrics](/developers/weaviate/config-refs/distances.md), such as cosine similarity, can be used with any vector index type.

### How to configure the vector index type in Weaviate?

The index type can be specified per data collection via the [collection definition](/developers/weaviate/manage-data/collections.mdx#set-vector-index-type) settings, according to available [vector index settings](/developers/weaviate/config-refs/schema/vector-index).

### When to skip indexing

There are situations where it doesn't make sense to vectorize a collection. For example, if the collection consists solely of references between two other collections, or if the collection contains mostly duplicate elements.

Importing duplicate vectors into HNSW is very expensive. The import algorithm checks early on if a candidate vector's distance is greater than the worst candidate's distance. When there are lots of duplicate vectors, this early exit condition is never met so each import or query results in an exhaustive search.

To avoid indexing a collection, set `"skip"` to `"true"`. By default, collections are indexed.

### What ANN algorithms exist?

There are different ANN algorithms, you can find a nice overview of them on <a href="http://ann-benchmarks.com/" data-proofer-ignore>this website</a>.

### Are there indicative benchmarks for Weaviate's ANN performance?

The [ANN benchmark page](/developers/weaviate/benchmarks/ann.md) contains a wide variety of vector search use cases and relative benchmarks. This page is ideal for finding a dataset similar to yours and learning what the most optimal settings are.

## Further resources

:::info Related pages
- [Concepts: Inverted indexes](/developers/weaviate/concepts/indexing/inverted-indexes)
- [Concepts: Vector quantization (compression)](/developers/weaviate/concepts/vector-quantization)
- [Configuration: Vector index](/developers/weaviate/config-refs/schema/vector-index)
- [Configuration: Schema (Configure semantic indexing)](/developers/weaviate/config-refs/schema#configure-semantic-indexing)
:::

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
