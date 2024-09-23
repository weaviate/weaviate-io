---
title: Vector indexes overview
sidebar_position: 10
image: og/docs/indexing.jpg
# tags: ['vector index plugins']
---

Weaviate is a vector database. Most objects in Weaviate collections have one or more vectors. Individual vectors can have thousands of dimensions. Collections can have millions of objects. The resulting vector space can be exceedingly large.

Weaviate uses vector indexes to [efficiently search]((https://weaviate.io/blog/why-is-vector-search-so-fast)) the vector space. Different vector index types offer trade-offs in resource use, speed, and accuracy.

import VectorIntro from '/_includes/indexes/vector-intro.mdx';

<VectorIntro/>

## Vector indexing

[Vector embeddings](https://weaviate.io/blog/vector-embeddings-explained) are arrays of elements that can capture meaning. The original data can come from text, images, videos, or other content types. A model transforms the underlying data into an embedding. The elements in the embedding are called dimensions. High dimension vectors, with thousands of elements, capture more information, but they are harder to work with.

Vector databases make it easier to work with high dimensional vector embeddings. Embeddings that capture similar meanings are closer to each other than embeddings that capture different meanings. To find objects that have similar semantics, vector databases must efficiently calculate the "distance" between the objects' embeddings.

In Weaviate, the [distance calculation method](/developers/weaviate/manage-data/collections#specify-a-distance-metric) is configurable. The [distance threshold](/developers/weaviate/search/similarity#set-a-similarity-threshold) is also configurable. A lower threshold returns more specific results.

### Example - relative dimensions in space

The elements in a vector define a point in a multi-dimensional space, similar to how the coordinates (X,Y) define a point on a graph and (X,Y,Z) define a point in three dimensional space.

Consider a very simple vector embedding that uses two elements to represent the meanings of some English words. Taken together, the vectors in the collection define a two dimensional space like this one:

![2D Vector embedding visualization](./img/vectors-2d.png "2D Vectors visualization")

Apples and bananas are both fruits. Newspapers and magazines are both publications. In the representation, the fruits are close to each other. The publications are also close to each other, but relatively far from the fruits. The vector distances are smaller between items with similar semantics and larger between objects that don't share similar meanings.

In a real example, the embeddings would have hundreds or thousands of elements. The vector space is difficult to visualize, but the concept is the same. Similar embeddings capture similar meanings and are closer to each other than to embeddings that capture different meanings.

For more details on this representation, see the [GloVe model](https://github.com/stanfordnlp/GloVe) from Stanford or our [vector embeddings blog post](https://weaviate.io/blog/vector-embeddings-explained#what-exactly-are-vector-embeddings).

### Example - supermarket layout

Consider how items are arranged in a supermarket. Similar products are close to each other. Apples and bananas are close to each other in the fruit section. Newspapers and magazines aren't fruit. They aren't even food. They are displayed in a different section of the supermarket.

![Supermarket map visualization as analogy for vector indexing](./img/supermarket.svg "Supermarket map visualization")

If you walk into the supermarket to buy an apple, you move away from the publications and move towards the fruits. You minimize the distance from where you are to the object you are searching for.

Vector search works the same way. Weaviate turns search queries into vector embeddings and then searches the collection to find objects that are close to the query in the vector space.

## HNSW indexes

import HNSWIntro from '/_includes/indexes/hnsw-intro.mdx';

<HNSWIntro/>

HNSW indexes build a multi-layered object graph. The graph structure and HNSW algorithm result in fast, approximate nearest neighbor [(ANN)](https://en.wikipedia.org/wiki/Nearest_neighbor_search) searches.

The index and graph structure are stored in RAM memory. This makes HNSW indexes fast, but RAM is an expensive resource. Consider using [compression](./compression.mdx) to reduce the size of for your HNSW indexes.

Weaviate offers these methods to compress ("quantize") your HNSW index:

import CompressionAlgorithms from '/_includes/starter-guides/compression-types.mdx';

<CompressionAlgorithms/>

For more details, see [HNSW indexes](/developers/weaviate/concepts/indexing/hnsw-indexes).

## Flat indexes

import FlatIntro from '/_includes/indexes/flat-intro.mdx';

<FlatIntro/>

Flat indexes are best suited for collections that have relatively small object counts. If you expect the object count to grow significantly, consider using a [dynamic index](#dynamic-indexes).

[Binary quantization (BQ)](/developers/weaviate/configuration/compression/bq-compression) is a compression technique that also improves search speed for flat indexes. BQ reduces the amount of data the search engine reads. It also permits efficient binary calculations. These benefits of compression shorten the time needed to calculate vector distances during search.

For more details, see [flat indexes](/developers/weaviate/concepts/indexing/flat-indexes).

## Dynamic indexes

:::info Added in `v1.25`
:::

import DynamicIntro from '/_includes/indexes/dynamic-intro.mdx';

<DynamicIntro/>

For more details, see [dynamic indexes](/developers/weaviate/concepts/indexing/dynamic-indexes).


# # # # # # # # #  # NEXT

Not only words or text can be indexed as vectors, but also images, video, DNA sequences, etc. Read more about which model to use [here](/developers/weaviate/modules/index.md).

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

Add summary

## Dynamic index

Add summary

## Vector cache considerations

For optimal search and import performance, previously imported vectors need to be in memory. A disk lookup for a vector is orders of magnitudes slower than memory lookup, so the disk cache should be used sparingly. However, Weaviate can limit the number of vectors in memory. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created.

During import set `vectorCacheMaxObjects` high enough that all vectors can be held in memory. Each import requires multiple searches. Import performance drops drastically when there isn't enough memory to hold all of the vectors in the cache.

After import, when your workload is mostly querying, experiment with vector cache limits that are less than your total dataset size.

Vectors that aren't currently in cache are added to the cache if there is still room. If the cache fills, Weaviate drops the whole cache. All future vectors have to be read from disk for the first time. Then, subsequent queries run against the cache until it fills again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, and a large percentage of users only query a specific subset of vectors. In this case you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.

## Vector indexing FAQ

### Can I use vector indexing with vector quantization?

Yes, you can read more about it in [vector quantization (compression)]DWCTODO.

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

- [Concepts: Inverted indexes](/developers/weaviate/concepts/indexing/inverted-indexes)
- [Concepts: Vector quantization (compression)](/developers/weaviate/concepts/vector-quantization)
- [Configuration: Vector index](/developers/weaviate/config-refs/schema/vector-index)
- [Configuration: Schema (Configure semantic indexing)](/developers/weaviate/config-refs/schema#configure-semantic-indexing)
- [Compression overview](/developers/weaviate/starter-guides/managing-resources/compression)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
