---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Schema
description: Getting started with the Weaviate schema
tags: ['basics']
menu-order: 4
open-graph-type: article
toc: true
---

You've made it to the schema getting started guide! The schema is the place where you will not only set data types, cross-references, and more, but you'll be tweaking index settings (ANN, reverse index, BM25).

This will also be a guide to getting your hands dirty! O, and this guide is a bit longer 😉

## Prerequisites 

At this point, you should have Weaviate running either:

* in a sandbox on the [Weaviate Cloud Service](https://console.semi.technology)
    * if not, refer to the [Installation](./schema.html) lesson for instructions
* or locally with Docker
    0. Download [this `docker-compose.yml` file](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ site.weaviate_version }}).
    0. Run `$ docker-compose up`
    0. Make sure that you always run `$ docker-compose down` after a shutdown(!)

## Client Libraries

You can communicate with Weaviate from your code by using one of the available [client libraries](../client-libraries/) (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [restful API](/developers/weaviate/current/restful-api-references/).

First, point of business, is to add the client library to your project.

<!-- TODO: update it accordion -->

* For `Python` add the `weaviate-client` to your system libraries with `pip`:
  ```bash
$ pip install weaviate-client
  ```

* For `JavaScript` add `weaviate-client` to your project with `npm`:
  ```bash
$ npm install weaviate-client
  ```

* For `Java` add this dependency to your project:
  ```xml
  <dependency>
    <groupId>technology.semi.weaviate</groupId>
    <artifactId>client</artifactId>
    <version>3.2.0</version>
  </dependency>
  ```

* For `Go` add `weaviate-go-client` to your project with `go get`:
  ```bash
go get github.com/semi-technologies/weaviate-go-client/v4
  ```

## Connect to Weaviate

First, let's make sure that you can connect to your Weaviate instance. <br/>
To do this we need the `host` endpoint to your instance. 

* If you use WCS – it should be based on the `cluster-id` you've created in the previous lesson - just replace `some-endpoint` in the code example below with the `cluster-id`
* or `localhost:8080` if you are running Weaviate locally.

Run the below code in your project.

{% include code/1.x/getting-started.schema.connect.html %}

The result should look like this:

```json
{"classes": []}
```

This means you're connected to an empty Weaviate.

> From now on, all examples will provide the code using the WCS endpoint:<br/> `"some-endpoint.semi.network/"`<br/>Replace the value to match your host endpoint.

### Resetting your Weaviate instance
If this is not the case and you see (old) classes, you can restart your instance, or you can run the following if you're using the Python client:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

# delete all classes
client.schema.delete_all()

schema = client.schema.get()
print(json.dumps(schema))
```

## Create your first class!

Let's create your first class!

We'll take the example of the **Author** from the [basics](./basics.html#data-objects-in-weaviate) getting started guide because you're already familiar with it.

Our Author has the following properties:
* `name`: type `string`
* `age`: type `int`
* `born`: type `date`
* `wonNobelPrize`: type `boolean`
* `description`: type `text`

Run the below code in you application, which will define the schema for the **Author** class.

{% include code/1.x/getting-started.schema.create.1.html %}

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        }
    ]
}
```

Wow! Whut, that's a lot more than we've added!

Correct, that's Weaviate adding some default config for you. You can change, improve, tweak, and update this, but that's for a later expert guide. 

Now, let's add a second class called **Publication**. We will use to it store info about publication outlets like *The New York Time* or *The Guardian*.

Our Publication is made of:
* `name`: type `string`

Run the below code in your application.

{% include code/1.x/getting-started.schema.create.2.html %}

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Publication",
                    "name": "name",
                    "tokenization": "word"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        }
    ]
}
```

Note how we now have the **Author** _and_ the **Publication** in there!

<!-- TODO: Do we really need this? -->
<!-- > 💡 For those of you who can't wait (we get it, it's fine, we'll see you back here in a bit), an overview of all data types can be found [here](../data-schema/datatypes.html#introduction), an overview of the ANN index [here](../vector-index-plugins/), and the distance metrics [here](../vector-index-plugins/distances.html). -->

## Setting cross-references

Now, that we have these two classes, we can use a **cross-reference** to indicate that an `Author`, `writesFor` a `Publication`. To achieve this, we want to update the `Author` class to contain the cross-reference to `Publication`.

Run the below code in your application to update the `Author` class with the `writesFor` cross-reference to `Publication`.

{% include code/1.x/getting-started.schema.crossreference.1.html %}

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Publication",
                    "name": "name",
                    "tokenization": "word"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        }
    ]
}
```

Note this part (this is just a chunk of the response):

```json
{
    "classes": [
        {
            "class": "Author",
            "properties": [
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ]
        }
    ]
}
```

We can also set it the other way around, a `Publication`, `has`, `Authors`. To achieve this, we want to update the `Publication` class to contain the `has` cross-reference to `Author`.

{% include code/1.x/getting-started.schema.crossreference.2.html %}

This results in:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Publication",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "Author"
                    ],
                    "name": "has"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
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
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        }
    ]
}
```

Note this part (this is just a chunk of the response):

```json
{
    "classes": [
        {
            "class": "Author",
            "properties": [
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ]
        },
        {
            "class": "Publication",
            "properties": [
                {
                    "dataType": [
                        "Author"
                    ],
                    "name": "has"
                }
            ]
        }
    ]
}
```

> 💡 You can set cross-references in all directions and later (as we will see [while querying](./query.html)) filter on them. Please, be aware that Weaviate is **not** a graph database ([remember](./basics.html#what-is-weaviate)?). This means that dealing with -for example- many-to-many relationships or things like shortest path algorithms is not in our wheelhouse.

## Intro to index settings

In Weaviate, you configure indices per class. Weaviate supports two types of indices.

0. An **approximate nearest neighbor index (ANN)** - the ANN index is used to serve all vector-search queries.
0. An **inverted index** - the inverted index allows for filtering by properties, as well as serve BM25 queries

Some things to bear in mind:

* Especially for large datasets, configuring the indices is important because the more you index, the more storage is needed.
* A rule of thumb -- if you don't query over a specific field or vector space, don't index it.
* One of Weaviate's unique features is how the indices are regulated (learn more about this [here](../architecture/prefiltering.html)).  

### Configure the ANN index

As you've learned in the [basics section](./basics.html#what-is-weaviate), one of Weaviate's core strengths is combining the ANN index with an inverted index. What's important to know, is that the "A" in ANN (i.e., the "approximate") comes with a trade-off. That is, the index is _approximate_ and, therefore _not_ always 100% accurate. This is what the experts mean when they talk about the "recall of the algorithm."

> 💡 There are different ANN algorhythms, you can find a nice overview of them on [this website](http://ann-benchmarks.com/). Only those algorhythms which support [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) can be used in Weaviate (we want that sweet database UX) and Weaviate's ANN system is [completely plug-and-playable](../architecture/index.html#weaviates-architecture-from-above) so that we can always add other algorhythms in the future.

<!-- TODO: Not sure if we need this here -->
<!-- If you always want total recall (i.e., a 100% recall, not to be confused with the Arnold Schwarzenegger movie), you need brute-force vector comparisons that are super slow (as in, _really_ slow) and not useful for production settings (hence ANN algorithms exist). -->

> 💡 Because vector search use cases are growing rapidly, more and more ANN-algorithm are produced. A "good" ANN algorithm means that the recall is high _and_ that it's fast. You can dive into the rabbit hole right [here](https://arxiv.org/search/?query=approximate+nearest+neighbor&searchtype=all){:target="_blank"}. But! Don't be like Alice; just make sure to come back here.

Let's take a look at the ANN settings Weaviate predefined for us when we created the classes.

_(note that we've removed some JSON that's irrelevant to the topic at hand)._

```js
{
    "classes": [
        {
            "class": "Publication",
            "properties": [],
            "vectorIndexType": "hnsw" // <== the current ANN algorhythm
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
* `ef` is HNSW specific, and is used to find the right vectors stored in the index. The higher you set it the more accurate the recall but the slower the search becomes (more about picking the right index strategy below). By default Weaviate sets the value to `-1` which means as much as: "Let Weaviate pick the right ef value for me."
* `efConstruction` is HNSW specific, you can't change it after creating the class (i.e., it is immutable) but it mitigates the above-mentioned `ef` settings. The tradeoff here is on importing. So a high `efConstruction` means that you can lower your `ef` settings but that importing will be slower.
* `vectorCacheMaxObjects` is the Weaviate cache. By default it is set to 2,000,000. We would recommend setting this to a number _greater_ than your total object amount.
* `distance` is the type of distance calculation in vector space, for most machine learning models cosine similatiry, is the distance metric that we need, but Weaviate does [support other distance metrics as well](../vector-index-plugins/distances.html).

Now you might be wondering: "What settings do I need for my use case?"

To determine this, you need to ask yourself the following questions and compare your answers in the table below:

0. How many queries am I expecting per second?
0. Am I expecting a lot of imports or updates?
0. How high should the recall be?

| Answer to Q1 | Answer to Q2 | Answer to Q3 | configuration |
| --- | --- | --- | --- |
| not many | no | low | This is the ideal scenario, just keep increasing both the `ef` and `efConstruction` settings low. You don't need a big machine and you will still be happy with the results. |
| not many | no | high | Here the tricky thing is that your recall needs to be high, the fact you're not expecting a lot of requests or imports means that you can increase both the `ef` and `efConstruction` settings. Just keep increasing them until you are happy with the recall. In this case, you can get pretty close to 100%. |
| not many | yes | low | Here the tricky thing is the high volume of imports and updates. Whatever you do, make sure to keep `efConstruction` low. Luckily you don't need a high recall, and you're not expecting a lot of queries, so you can play around with the `ef` setting until you've reached the desired recall. |
| not many | yes | high | Now we need to start and pay attention, you need high recall _and_ you're dealing with a lot of imports or updates. This means that we need to keep the `efConstruction` setting low but we can significantly increase the `ef` settings because your queries per second will be low. |
| many | no | low | Many queries per second means a low `ef` setting. Luckily you don't need high accuracy and or recall so you can significantly increase the `efConstruction` value. |
| many | no | high | Many queries per second means a low `ef` setting. Because you need a high recall but are not expecting a lot of imports or updates, you can increase your `efConstruction` until you've reached the desired recall. |
| many | yes | low | Many queries per second means a low `ef` setting and a high amount of imports and updates means a low `efConstruction` as well. Luckily your recall does not have to be as close to 100% as possible, so you can set the `efConstruction` relatively low to support your input or update throughput while throttling the query per second speed with the `ef` setting. |
| many | yes | high | Aha, this means you're a perfectionist _or_ that you have a use case which needs the best of all three worlds. What we advice to do is this: keep increasing your `efConstruction` until you've hit the time limit of imports and updates. Next, keep increasing the `ef` setting until you've reached the desired query per second vs recall trade-off. For what it's worth, many people _think_ they need this, but often they don't. We leave it up to you to decide, or ask for help on our [Slack channel]({{ site.slack_signup_url }}).

> 💡 If you're looking for a starting point for values, we would advise an `efConstruction` of `128`, `maxConnections` of `32`, and `ef` of `64`.

> 💡 The [ANN benchmark page](../benchmarks/ann.html) contains a wide variety of vector search use cases and relative benchmarks. This page is ideal for finding a dataset similar to yours and learning what the most optimal settings are. 

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

> 💡 We support both `string` and `text` data types, they play a role in tokenization in the inverted index, more information can be found [here](../data-schema/datatypes.html#datatype-string-vs-text).

You can also enable an inverted index to search [based on timestamps](../data-schema/schema-configuration.html#invertedindexconfig--indextimestamps).

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

> 💡 Because Weaviate's vectorizer module configuration is set on class and property level, you can have multiple vectorizers for different classes. You can even mix multimodal, NLP, and image modules.

## Auto schema feature

You can import data into Weaviate without creating a schema. Weaviate will use all default settings, and guess what data type you use. If you have a setup with modules, Weaviate will also guess the default settings for the modules.

Although auto schema works well for some instances, we always advise manually setting your schema to optimize Weaviate's performance.

## Other schema operations

All schema operations are available in the [API documentation for the schema endpoint](../restful-api-references/schema.html). The documentation also includes examples in different client languages.

## Recapitulation

* Weaviate has a schema where you will define how your data objects will be indexed.
* Weaviate's schema is class property based.
* The schema is highly configurable but comes with pre-defined settings.
* The ANN index needs to be set for your use case (especially if you have a large dataset)
* You can enable or disable the index based on your use case
* You can configure Weaviate modules in the schema
* There is an auto schema function, but for optimal usage, it's better to manually create a schema

## What would you like to learn next?

* [Learn how to import data](./import.html)
* [Learn how to query data based on a schema](query.html)
* [Take me one step back to the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}
