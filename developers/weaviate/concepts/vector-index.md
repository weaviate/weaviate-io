---
title: Vector Indexing
sidebar_position: 4
image: og/docs/concepts.jpg
# tags: ['vector index plugins']
---

import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- From `Vector Index (ANN) Plugins:Index` + `HNSW`
  - Note: Configuration options from `HNSW` are now in `References: Configuration/Vector index#How to configure HNSW`
::: -->

## Overview

This page explains what vector indices are, and what purpose they serve in Weaviate.

:::info Related pages
- [Concepts: Indexing](./indexing.md)
- [Configuration: Indexes](../configuration/indexes.md)
- [Configuration: Schema (Configure semantic indexing)](../configuration/schema-configuration.md#configure-semantic-indexing)
:::

## Introduction

Weaviate's vector-first storage system takes care of all storage operations with a vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices). 

## Why index data as vectors?
Now, a long list of numbers does not carry any meaning by itself. But if the numbers in this list are chosen to indicate the [semantic similarity](https://en.wikipedia.org/wiki/Semantic_similarity) between the data objects represented by other vectors, then the new vector contains information about the data object's meaning and relation to other data. 

To make this concept more tangible, think of vectors as coordinates in a *n*-dimensional space. For example, we can represent *words* in a 2-dimensional space. If you use an algorithm that learned the relations of words or co-occurrence statistics between words from a corpus (like [GloVe](https://github.com/stanfordnlp/GloVe)), then single words can be given the coordinates (vectors) according to their similarity to other words. These algorithms are powered by Machine Learning and Natural Language Processing concepts. In the picture below, you see how this concept looks (simplified). The words `Apple` and `Banana` are close to each other. The distance between those words, given by the distance between the vectors, is small. But these two fruits are further away from the words `Newspaper` and `Magazine`. 

![2D Vectors visualization](./img/vectors-2d.svg "2D Vectors visualization")

Another way to think of this is how products are placed in a supermarket. You'd expect to find `Apples` close to `Bananas`, because they are both fruit. But when you are searching for a `Magazine`, you would move away from the `Apples` and `Bananas`, more towards the aisle with, for example, `Newspapers`. This is how the semantics of concepts can be stored in Weaviate as well, depending on the module you're using to calculate the numbers in the vectors. Not only words or text can be indexed as vectors, but also images, video, DNA sequences, etc. Read more about which model to use [here](/developers/weaviate/modules/index.md).

![Supermarket map visualization](./img/supermarket.svg "Supermarket map visualization")

## How to choose the right vector index type
The first vector-storage type Weaviate supports is [HNSW](./vector-index.md#hnsw), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when it comes to the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type. Stay tuned for updates!

## Configuration of vector index type
The index type can be specified per data class. Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](/developers/weaviate/configuration/schema-configuration.md). 

Example of a class [vector index configuration in your data schema](/developers/weaviate/configuration/schema-configuration.md): 
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
  "vectorIndexType": " ... ",
  "vectorIndexConfig": { ... }
}
```

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](/developers/weaviate/modules/index.md) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](/developers/weaviate/configuration/schema-configuration.md).

## Can Weaviate support multiple vector index (ANN) types?

* The short answer: _yes_
* The longer answer: currently, we have a [custom implementation](../more-resources/faq.md#q-does-weaviate-use-hnswlib) of HNSW to have [full CRUD-support](https://db-engines.com/en/blog_post/87) in Weaviate. In principle, if an ANN algorithm allows for full CRUD support, Weaviate can support it. If you have ideas, suggestions, or plans (e.g., for a research project) for another ANN index type besides HNSW, please let us know in our [Slack channel](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw).


## HNSW
[HNSW](https://arxiv.org/abs/1603.09320) is the first vector index type supported by Weaviate.

### What is HNSW?
HNSW stands for Hierarchical Navigable Small World, a multilayered graph. Every object that is in the database, are captured in the lowest layer (layer 0 in the picture). These data objects are very well connected. On each layer on top of the lowest layer, there are fewer data points represented. These datapoints match with lower layers, but there are exponentially fewer points in each higher layer. If a search query comes in, the closest datapoints will be found in the highest layer. In the example below that is only one more datapoint. Then it goes one layer deeper, and finds the closest datapoints from the first found datapoint in the highest layer, and searches nearest neighbors from there. In the deepest layer, the actual closest data object to the search query will be found. 

If there were no hierarchical layers in this approach, only the deepest layer (0) would be present and significantly more datapoints would have needed to be explored from the search query, since all data objects are present there. In higher layers, with less datapoints, fewer hops between datapoints need to be made, over larger distances. HNSW is a very fast and memory efficient approach of similarity search, because only the highest layer (top layer) is kept in cache instead of all the datapoints in the lowest layer. Only the datapoints that are closest to the search query are loaded once they are requested by a higher layer, which means that only a small amount of memory needs to be reserved.

The picture shows how a HNSW algorithm is used to go from a search query vector (blue) on the top layer to the closes search result (green) in the lowest layer. Only three data hops are made (indicated by blue solid arrows), whereas more data objects would have need to be search through when this layering was not present (the closest datapoint of *all* datapoints in each layer needs to be found).h

![HNSW layers](./img/hnsw-layers.svg "HNSW layers")

### Distance metrics

All [distance metrics supported in Weaviate](/developers/weaviate/configuration/distances.md) are also supported with the HNSW index type.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
