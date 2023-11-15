---
title: Indexing
sidebar_position: 20
image: og/docs/concepts.jpg
# tags: ['basics']
---


:::info Related pages
- [Concepts: Vector Indexing](./vector-index.md)
- [Configuration: Indexes](../configuration/indexes.md)
:::

## Introduction

Weaviate supports two types of indices.

1. An **approximate nearest neighbor index (ANN)** - the ANN index is used to serve all vector-search queries.
1. An **inverted index** - the inverted index allows for filtering by properties, as well as serve BM25 queries.

You can configure indices in Weaviate per class. One of Weaviate's core strengths is combining the ANN index with an inverted index.

Some things to bear in mind:

* Especially for large datasets, configuring the indices is important because the more you index, the more storage is needed.
* A rule of thumb -- if you don't query over a specific field or vector space, don't index it.
* One of Weaviate's unique features is how the indices are configured (learn more about this [here](../concepts/prefiltering.md)).

### ANN indexing

What's important to know, is that the "A" in ANN (i.e., the "approximate") comes with a trade-off. That is, the index is _approximate_ and, therefore _not_ always 100% accurate. This is what the experts mean when they talk about the "recall of the algorithm."

:::tip
There are different ANN algorithms, you can find a nice overview of them on <a href="http://ann-benchmarks.com/" data-proofer-ignore>this website</a>. Only those algorithms which support [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) can be used in Weaviate (we want that sweet database UX) and Weaviate's ANN system is [completely plug-and-playable](../concepts/index.md#weaviate-architecture) so that we can always add other algorithms in the future.
:::

<!-- TODO: Not sure if we need this here -->
<!-- If you always want total recall (i.e., a 100% recall, not to be confused with the Arnold Schwarzenegger movie), you need brute-force vector comparisons that are super slow (as in, _really_ slow) and not useful for production settings (hence ANN algorithms exist). -->

:::note
Because vector search use cases are growing rapidly, more and more ANN-algorithm are produced. A "good" ANN algorithm means that the recall is high _and_ that it's fast. You can dive into the rabbit hole right [here](https://arxiv.org/search/?query=approximate+nearest+neighbor&searchtype=all). But! Don't be like Alice; just make sure to come back here.
:::

Let's take a look a few ANN settings in an example schema.

_(note that we've removed some JSON that's irrelevant to the topic at hand)._

```js
{
    "classes": [
        {
            "class": "Publication",
            "properties": [],
            "vectorIndexType": "hnsw" // <== the current ANN algorithm
            "vectorIndexConfig": { // <== the vector index settings
                "skip": false,
                "cleanupIntervalSeconds": 300,
                "pq": {"enabled": False,}
                "maxConnections": 64,
                "efConstruction": 128,
                "ef": -1,
                "dynamicEfMin": 100,
                "dynamicEfMax": 500,
                "dynamicEfFactor": 8,
                "vectorCacheMaxObjects": 2000000,
                "flatSearchCutoff": 40000,
                "distance": "cosine"
            }
        },
        { } // <== the Author class
    ]
}
```

As shown above, there are quite a few configurable parameters available for an ANN index. Modifying them can affect Weaviate's performance, such as tradeoffs between the recall performance and query time, or between query time and import time.

Read more below on:
- [Configuring the vector index](../configuration/indexes.md)
- [Explanation of vector indexes](../concepts/vector-index.md)
- [Compressing indexes in memory](developers/weaviate/configuration/pq-compression)

:::note
The [ANN benchmark page](/developers/weaviate/benchmarks/ann.md) contains a wide variety of vector search use cases and relative benchmarks. This page is ideal for finding a dataset similar to yours and learning what the most optimal settings are.
:::

## Module configuration
<!-- TODO: Check whether this can be removed. Feels duplicated. -->

You can use Weaviate with or without modules. To use Weaviate _with_ modules, you must configure them in the schema.

An example configuration:

```js
{
    "class": "Author",
    "moduleConfig": { // <== module config on class level
        "text2vec-transformers": { // <== the name of the module (in this case `text2vec-transformers`)
            // the settings based on the chosen modules
        }
    },
    "properties": [ ]
}
```

When using vectorizers, you need to set vectorization at the class and property level. If you use text vectorizers, the way the vectorizers work is explained [here](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md#configure-semantic-indexing).

```js
{
    "class": "Author",
    "moduleConfig": { // <== class level configuration
        "text2vec-transformers": { // <== name of the module
            "vectorizeClassName": false // <== vectorize the class name?
        }
    },
    "properties": [{
        "moduleConfig": { // <== property level configuration
            "text2vec-transformers": { // <== name of the module
                "skip": false, // <== skip this `string` for vectorization?
                "vectorizePropertyName": false // <== vectorize the property name?
            }
        },
        "dataType": [
            "text"
        ],
        "name": "name"
    }]
}
```

:::note
Because Weaviate's vectorizer module configuration is set on class and property level, you can have multiple vectorizers for different classes. You can even mix multimodal, NLP, and image modules.
:::

## Recap

* The ANN index needs to be set for your use case (especially if you have a large dataset)
* You can enable or disable the index based on your use case
* You can configure Weaviate modules in the schema


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
