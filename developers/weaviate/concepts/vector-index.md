---
title: Vector Indexing
sidebar_position: 23
image: og/docs/concepts.jpg
# tags: ['vector index plugins']
---



<!-- :::caution Migrated From:
- From `Vector Index (ANN) Plugins:Index` + `HNSW`
  - Note: Configuration options from `HNSW` are now in `References: Configuration/Vector index#How to configure HNSW`
::: -->

## Overview

This page explains what vector indices are, and what purpose they serve in Weaviate.

:::info Related pages
- [Concepts: Indexing](./indexing.md)
- [Configuration: Indexes](../configuration/indexes.md)
- [Configuration: Schema (Configure semantic indexing)](../config-refs/schema.md#configure-semantic-indexing)
:::

## Introduction

Weaviate's vector-first storage system takes care of all storage operations with a vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices).

## Why index data as vectors?
Now, a long list of numbers does not carry any meaning by itself. But if the numbers in this list are chosen to indicate the [semantic similarity](https://en.wikipedia.org/wiki/Semantic_similarity) between the data objects represented by other vectors, then the new vector contains information about the data object's meaning and relation to other data.

To make this concept more tangible, think of vectors as coordinates in a *n*-dimensional space. For example, we can represent *words* in a 2-dimensional space. If you use an algorithm that learned the relations of words or co-occurrence statistics between words from a corpus (like [GloVe](https://github.com/stanfordnlp/GloVe)), then single words can be given the coordinates (vectors) according to their similarity to other words. These algorithms are powered by Machine Learning and Natural Language Processing concepts. In the picture below, you see how this concept looks (simplified). The words `Apple` and `Banana` are close to each other. The distance between those words, given by the distance between the vectors, is small. But these two fruits are further away from the words `Newspaper` and `Magazine`.

![2D Vectors visualization](./img/vectors-2d.png "2D Vectors visualization")

Another way to think of this is how products are placed in a supermarket. You'd expect to find `Apples` close to `Bananas`, because they are both fruit. But when you are searching for a `Magazine`, you would move away from the `Apples` and `Bananas`, more towards the aisle with, for example, `Newspapers`. This is how the semantics of concepts can be stored in Weaviate as well, depending on the module you're using to calculate the numbers in the vectors. Not only words or text can be indexed as vectors, but also images, video, DNA sequences, etc. Read more about which model to use [here](/developers/weaviate/modules/index.md).

![Supermarket map visualization](./img/supermarket.svg "Supermarket map visualization")

## How to choose the right vector index type

The first vector-storage type Weaviate supports is [HNSW](./vector-index.md#hnsw), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when it comes to the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type. Stay tuned for updates!

## Configuration of vector index type

The index type can be specified per data class via the [class definition](/developers/weaviate/configuration/schema-configuration.md). Currently the only index type is HNSW.

Example of a class [vector index configuration in your data schema](/developers/weaviate/configuration/schema-configuration.md):

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
  "vectorIndexType": " ... ",
  "vectorIndexConfig": { ... }
}
```

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](/developers/weaviate/modules/index.md) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](/developers/weaviate/configuration/schema-configuration.md).

## Can Weaviate support multiple vector index (ANN) types?

* The short answer: _yes_
* The longer answer: we have a [custom implementation](../more-resources/faq.md#q-does-weaviate-use-hnswlib) of the Hierarchical Navigable Small World (HNSW) algorithm that offers full [CRUD-support](https://db-engines.com/en/blog_post/87). In principle, if another ANN algorithm also offers full CRUD support, Weaviate can support it too. If you have suggestions for implementing other ANN index types, please let us know in our [forum](https://forum.weaviate.io).


## Hierarchical Navigable Small World (HNSW)
[HNSW](https://arxiv.org/abs/1603.09320) is the first vector index type Weaviate supports.

### What is HNSW?
HNSW stands for Hierarchical Navigable Small World. HNSW is an algorithm that works on multi-layered graphs. It is also an index type, and refers to vector indexes that are created using the HNSW algorithm.

Consider this diagram of a search using HNSW.

![HNSW layers](./img/hnsw-layers.svg "HNSW layers")

An individual object can exist in more than one layer, but every object in the database is represented in the lowest layer (layer zero in the picture). The layer zero data objects are very well connected to each other. Each layer above the lowest layer has fewer data object, and fewer connections. The data objects in the higher layers correspond to the objects in the lower layers, but each higher layer has exponentially fewer objects than the layer below. The HNSW algorithm takes advantage of the layers to efficiently process large amounts of data.

When a search query comes in, the HNSW algorithm finds the closest matching data points in the highest layer. Then, HNSW goes one layer deeper, and finds the closest data points in that layer to the ones in the higher layer. These are teh nearest neighbors. The algorithm searches the lower layer to create a new list of nearest neighbors. Then, HNSW uses the new list and repeats the process on the next layer down. When it gets to the deepest layer, the HNSW algorithm returns the data objects closest to the search query.

Since there are relatively few data objects on the higher layers, HNSW has to search fewer objects. This means HNSW 'jumps' over large amounts of data that it doesn't need to search. When a data store has only one layer, the search algorithm can't skip unrelated objects. It has to search significantly more data objects even though they are unlikely to match.

HNSW is very fast, memory efficient, approach to similarity search. The memory cache only stores the highest layer instead of storing all of the data objects in the lowest layer. When the search moves from a higher layer to a lower one, HNSW only adds the data objects that are closest to the search query. This means HNSW uses a relatively small amount of memory compared to other search algorithms.

Have another look at the diagram; it demonstrates how the HNSW algorithm searches. The blue search vector in the top layer connects to a partial result in layer one. The objects in layer one lead HNSW to the result set in layer zero. HNSW makes three hops through the layers (the dotted blue lines) and skips objects that are unrelated to the search query.

### Distance metrics

All of [the distance metrics](/developers/weaviate/config-refs/distances.md) Weaviate supports are also supported with the HNSW index type.

## Managing search quality vs speed tradeoffs

HNSW parameters can be adjusted to adjust search quality against speed.

The `ef` parameter is a critical setting for balancing the trade-off between search speed and quality. The `ef` parameter dictates the size of the dynamic list used by the HNSW algorithm during the search process. A higher `ef` value results in a more extensive search, enhancing accuracy but potentially slowing down the query.

In contrast, a lower `ef` makes the search faster but might compromise on accuracy. This balance is crucial in scenarios where either speed or accuracy is a priority. For instance, in applications where rapid responses are critical, a lower `ef` might be preferable, even at the expense of some accuracy. Conversely, in analytical or research contexts where precision is paramount, a higher `ef` would be more suitable, despite the increased query time.

Weaviate allows for `ef` to be configured ef either explicitly or dynamically. If `ef` is set to -1, Weaviate adjusts it dynamically based on the query response limit, enabling a more flexible approach to managing this trade-off. The dynamic `ef` adjustment takes into account the query limit and modifies the size of the ANN (Approximate Nearest Neighbors) list accordingly, bounded by the parameters `dynamicEfMin`, `dynamicEfMax`, and influenced by `dynamicEfFactor`. This feature is particularly beneficial in environments with varying query patterns, as it automatically optimizes the balance between speed and recall based on real-time query requirements.

## HNSW with compression

HNSW uses memory efficiently. However, you can also use compression to reduce memory requirements even more. [Product quantization (PQ)](#what-is-product-quantization) is a technique Weaviate offers that lets you compress a vector so it uses fewer bytes. Since HNSW stores vectors in memory, PQ compression lets you use larger datasets without increasing your system memory.

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

To configure HNSW, see [Configuration: Indexes](/developers/weaviate/configuration/indexes).

To configure PQ, see [Compression](/developers/weaviate/configuration/compression.md).

### What is Product Quantization?

Quantization techniques represent larger vectors with a finite set of smaller vectors. A familiar example is rounding a number to the nearest integer.

[Product quantization](https://ieeexplore.ieee.org/document/5432202) is a multi-step quantization technique. The starting vector is represented as a product of smaller vectors that are called 'segments' or 'subspaces.' Then, each segment is quantized independently to create a compressed vector representation.

![PQ illustrated](./img/pq-illustrated.png "PQ illustrated")

When you enable PQ, you should already have about 10,000 to 100,000 vectors loaded per shard. Weaviate divides these initial vectors into segments. After the segments are created, there is a training step to calculate 'centroids' for each segment. By default, Weaviate clusters each segment into 256 centroids. The centroids make up a codebook that Weaviate uses in later steps to compress the vectors.

Once the codebook is ready, Weaviate uses the id of the closest centroid to compress each vector segment. The new vector representation reduces memory significantly. Imagine a collection where each vector has 768 four byte elements. Before PQ compression, each vector requires `768 x 4 = 3072` bytes of storage. After PQ compression, each vector requires `128 x 1 = 128` bytes of storage. The original representation is almost 24 times as large as the PQ compressed version. (It is not exactly 24x because there is a small amount of overhead for the codebook.)

### Distance calculation and rescoring

With product quantization distances are then calculated asymmetrically with a query vector with the goal being to keep all the original information in the query vector when calculating distances.

Additionally as Weaviate has the original vectors stored on disk, rescoring will occur when using product quantization. After HNSW PQ has produced the candidate vectors from a search the original vectors will be fetched from disk improving recall. Rescoring occurs by default.

### Segments

The PQ `segments` controls the tradeoff between memory and recall. A larger `segments` parameter means higher memory usage and recall. An important thing to note is that the segments must divide evenly the original vector dimension.

Below is a list segment values for common vectorizer modules:

| Module      | Model                                   | Dimensions | Segments               |
|-------------|-----------------------------------------|------------|------------------------|
| openai      | text-embedding-ada-002                  | 1536       | 512, 384, 256, 192, 96 |
| cohere      | multilingual-22-12                      | 768        | 384, 256, 192, 96      |
| huggingface | sentence-transformers/all-MiniLM-L12-v2 | 384        | 192, 128, 96           |

### Conversion of an existing Class to use PQ

:::caution Important
To use PQ, we recommend using Weaviate 1.20.5 or higher.
:::

You can convert an existing class to use product quantization by updating the vector index configuration. It is recommended to run a [backup](../configuration/backups.md) first before enabling if you are in production and may want to roll back.

As PQ has a training stage, data must already exist in the class prior to enabling. To reduce training times you can also use the `trainingLimit` parameter.

```python
client.schema.update_config("DeepImage", {
  "vectorIndexConfig": {
    "pq": {
      "enabled": True,
      "trainingLimit": 100000,
      "segments": 0 # see above section for recommended values
    }
  }
})
```

:::tip
To learn more about other configuration settings for PQ refer to the documentation in [Configuration: Indexes](../configuration/indexes.md)
:::

The command will return immediately and a job will run in the background to convert an index. During this time the index will be read-only. Shard status will return to `READY` after conversion.

```python
client.schema.get_class_shards("DeepImage")

[{'name': '1Gho094Wev7i', 'status': 'READONLY'}]
```

You can now query and write to the index as normal. Distances may be slightly different due to the effects of quantization.

```python
client.query.get("DeepImage", ["i"]) \
	.with_near_vector({"vector": vector}) \
	.with_additional(["distance"]) \
	.with_limit(10).do()

{'data': {'Get': {'DeepImage': [{'_additional': {'distance': 0.18367815},
     'i': 64437},
    {'_additional': {'distance': 0.18895388}, 'i': 97342},
    {'_additional': {'distance': 0.19454134}, 'i': 14852},
    {'_additional': {'distance': 0.20019263}, 'i': 84393},
    {'_additional': {'distance': 0.20580399}, 'i': 71091},
    {'_additional': {'distance': 0.2110992}, 'i': 15182},
    {'_additional': {'distance': 0.2117207}, 'i': 92370},
    {'_additional': {'distance': 0.21241724}, 'i': 98583},
    {'_additional': {'distance': 0.21241736}, 'i': 8064},
    {'_additional': {'distance': 0.21257097}, 'i': 537}]}}}
```

### Encoders
In the configuration above you can see that you can set the `encoder` object to specify how the codebook centroids are generated. Weaviate’s PQ supports using two different encoders. The default is `kmeans` which maps to the traditional approach used for creating centroid.

Alternatively, there is also the `tile` encoder. This encoder is currently experimental but does have faster import times and better recall on datasets like SIFT and GIST. The `tile` encoder has an additional `distribution` parameter that controls what distribution to use when generating centroids. You can configure the encoder by setting `type` to `tile` or `kmeans` the encoder creates the codebook for product quantization. For more details about configuration please refer to [Configuration: Indexes](../configuration/indexes.md).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
