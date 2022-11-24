---
title: Indexing
sidebar_position: 3

# layout: layout-documentation
# solution: weaviate
# sub-menu: Core Knowledge
# description: Core Knowledge for Indexing in Weaviate
# tags: ['basics']
# open-graph-type: article
# toc: true
---

## Intro to index settings

In Weaviate, you configure indices per class. Weaviate supports two types of indices.

1. An **approximate nearest neighbor index (ANN)** - the ANN index is used to serve all vector-search queries.
1. An **inverted index** - the inverted index allows for filtering by properties, as well as serve BM25 queries

Some things to bear in mind:

* Especially for large datasets, configuring the indices is important because the more you index, the more storage is needed.
* A rule of thumb -- if you don't query over a specific field or vector space, don't index it.
* One of Weaviate's unique features is how the indices are regulated (learn more about this [here](../architecture/prefiltering.html)).  

### Configure the ANN index

As you've learned in the [basics section](./basics.html#what-is-weaviate), one of Weaviate's core strengths is combining the ANN index with an inverted index. What's important to know, is that the "A" in ANN (i.e., the "approximate") comes with a trade-off. That is, the index is _approximate_ and, therefore _not_ always 100% accurate. This is what the experts mean when they talk about the "recall of the algorithm."

:::tip
There are different ANN algorhythms, you can find a nice overview of them on <a href="http://ann-benchmarks.com/" data-proofer-ignore>this website</a>. Only those algorhythms which support [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) can be used in Weaviate (we want that sweet database UX) and Weaviate's ANN system is [completely plug-and-playable](../architecture/index.html#weaviates-architecture-from-above) so that we can always add other algorhythms in the future.
:::

<!-- TODO: Not sure if we need this here -->
<!-- If you always want total recall (i.e., a 100% recall, not to be confused with the Arnold Schwarzenegger movie), you need brute-force vector comparisons that are super slow (as in, _really_ slow) and not useful for production settings (hence ANN algorithms exist). -->

:::note
Because vector search use cases are growing rapidly, more and more ANN-algorithm are produced. A "good" ANN algorithm means that the recall is high _and_ that it's fast. You can dive into the rabbit hole right [here](https://arxiv.org/search/?query=approximate+nearest+neighbor&searchtype=all). But! Don't be like Alice; just make sure to come back here.
:::

Let's take a look at the ANN settings Weaviate predefined for us when we created the classes.

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

We have a dedicated section containing all the [vector index settings](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters), but there are a few we would like to highlight in this getting-started guide.

* `vectorIndexType` is the ANN algorithm you want to use. By default, Weaviate selects `hnsw` -- the Hierarchical Navigable Small World (HNSW) algorithm.
* `ef` is HNSW specific, and is used to find the right vectors stored in the index. The higher you set it the more accurate the recall but the slower the search becomes (more about picking the right index strategy below). By default Weaviate sets the value to `-1` which means: "Let Weaviate pick the right ef value for me."
* `efConstruction` is HNSW specific, you can't change it after creating the class (i.e., it is immutable) but it mitigates the above-mentioned `ef` settings. The tradeoff here is on importing. So a high `efConstruction` means that you can lower your `ef` settings but that importing will be slower.
* `vectorCacheMaxObjects` is the Weaviate cache. By default it is set to 2,000,000. We would recommend setting this to a number _greater_ than your total object amount.
* `distance` is the type of distance calculation in vector space, for most machine learning models cosine similatiry, is the distance metric that we need, but Weaviate does [support other distance metrics as well](../vector-index-plugins/distances.html).

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
| many | yes | high | Aha, this means you're a perfectionist _or_ that you have a use case which needs the best of all three worlds. What we advise you to do is this: keep increasing your `efConstruction` until you've hit the time limit of imports and updates. Next, keep increasing the `ef` setting until you've reached the desired query per second vs recall trade-off. For what it's worth, many people _think_ they need this, but often they don't. We leave it up to you to decide, or ask for help on our [Slack channel]({{ site.slack_signup_url }}).

:::tip
If you're looking for a starting point for values, we would advise an `efConstruction` of `128`, `maxConnections` of `32`, and `ef` of `64`.
:::

:::note
The [ANN benchmark page](../benchmarks/ann.html) contains a wide variety of vector search use cases and relative benchmarks. This page is ideal for finding a dataset similar to yours and learning what the most optimal settings are. 
:::

### Configure the inverted index

The inverted index is surprisingly simple to configure, it's on or it's off and indexes on a property level.

The inverted index is by default _on_. You can simply turn it of like this:

```js
{
    "class": "Author",
    "properties": [ // <== note that the inverted index is set per property
        {
            "indexInverted": false, // <== turn it off by setting `indexInverted` to false
            "dataType": [
                "string"
            ],
            "name": "name"
        }
    ]
}
```

A rule of thumb to follow when determining if you turn it on or off is this: _if you don't need it to query, turn it off._

:::note
We support both `string` and `text` data types, they play a role in tokenization in the inverted index, more information can be found [here](../schema/datatypes.html#datatype-string-vs-text).
:::

You can also enable an inverted index to search [based on timestamps](../schema/schema-configuration.html#invertedindexconfig--indextimestamps).

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
            "indexInverted": false, // <== disable inverted index for this property
            "dataType": [
                "string"
            ],
            "description": "The name of the Author",
            "name": "name"
        },
        {
            "indexInverted": false, // <== disable inverted index for this property
            "dataType": [
                "int"
            ],
            "description": "The age of the Author",
            "name": "age"
        },
        {
            "indexInverted": false, // <== disable inverted index for this property
            "dataType": [
                "date"
            ],
            "description": "The date of birth of the Author",
            "name": "born"
        },
        {
            "indexInverted": false, // <== disable inverted index for this property
            "dataType": [
                "boolean"
            ],
            "description": "A boolean value if the Author won a nobel prize",
            "name": "wonNobelPrize"
        },
        {
            "indexInverted": false, // <== disable inverted index for this property
            "dataType": [
                "text"
            ],
            "description": "A description of the author",
            "name": "description"
        }
    ]
}
```

## Module configuration

As you've learned in the [basics getting started guide](./basics.html#modules), you can use Weaviate with or without modules. To use Weaviate _with_ modules, you must configure them in the schema.

An example configuration:

```js
{
    "class": "Author",
    "moduleConfig": { // <== module config on class level
        "text2vec-transformers": { // <== the name of the module (in this case `text2vec-transformers`)
            // the settings based on the choosed modules
        }
    },
    "properties": [ ]
}
```

When using vectorizers, you need to set vectorization on the class and property level. In the case you use text vectorizers, the way the vectorizers work is explained [here](../retriever-vectorizer-modules/text2vec-contextionary.html#regulate-semantic-indexing).

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
            "string"
        ],
        "name": "name"
    }]
}
```

:::note
Because Weaviate's vectorizer module configuration is set on class and property level, you can have multiple vectorizers for different classes. You can even mix multimodal, NLP, and image modules.
:::

## Recapitulation

* The ANN index needs to be set for your use case (especially if you have a large dataset)
* You can enable or disable the index based on your use case
* You can configure Weaviate modules in the schema

## What would you like to learn next?

* [Learn how to import data](../getting-started/import.html)
* [Learn how to query data based on a schema](../getting-started/query.html)
* [Take me one step back to the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}