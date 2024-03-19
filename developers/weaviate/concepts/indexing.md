---
title: Indexing
sidebar_position: 20
image: og/docs/concepts.jpg
# tags: ['basics']
---


:::info Related pages
- [Concepts: Vector Indexing](./vector-index.md)
- [Configuration: Vector index](../config-refs/schema/vector-index.md)
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

For more information see:
- [Configuring the vector index](../config-refs/schema/vector-index.md)
- [Explanation of vector indexes](../concepts/vector-index.md)
- [Compressing indexes in memory](/developers/weaviate/configuration/pq-compression.md)

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

## Inverted index

### Configure the inverted index

There are two inverted indexes for filtering or searching the data. The first (filterable) index is for building a fast, Roaring Bitmaps index, and the second (searchable) index is for a BM25 or hybrid search.

The `indexFilterable` and `indexSearchable` keys can be set to `true` (on) or `false` (off) on a property level. Both are _on_ by default.

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

You can also enable an inverted index to search [based on timestamps](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--indextimestamps).

```js
{
    "class": "Author",
    "invertedIndexConfig": {
        "indexTimestamps": true // <== false by default
    },
    "properties": []
}
```

## Collections without indices

If you don't want to set an index at all, neither ANN nor inverted, this is possible too.

To create a collection without any indexes, skip indexing on the collection and on the properties.

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


## Recap

* The ANN index needs to be set for your use case (especially if you have a large dataset)
* You can enable or disable the index based on your use case
* You can configure Weaviate modules in the schema


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
