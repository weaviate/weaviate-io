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

You've made it to the schema getting started guide! The schema is the place where you will not only set data types, cross-references, and more, but you'll be tweaking index settings (ANN, reverse index,  BM25).

This will also be a guide to getting your hands dirty! This guide is a bit longer, tho 😉

## Set up your Weaviate instance

You can set up your Weaviate instance:

0. By creating a sandbox on the [Weaviate Cloud Service](https://console.semi.technology).
    0. Make sure to disable OIDC.
0. By running a Weaviate locally with Docker.
    0. Download [this `docker-compose.yml` file](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ site.weaviate_version }}).
    0. Run `$ docker-compose up`
    0. Make sure that you always run `$ docker-compose down` after a shutdown(!)

Choose one of the [client libraries](../client-libraries/) you want to use.

Let's make sure that you can connect to you Weaviate instance:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

schema = client.schema.get()
print(json.dumps(schema))
```

The result should look like this:

```json
{"classes": []}
```

This means you're connected to an empty Weaviate.

If this is not the case and you see (old) classes, you can run:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

# delete all classes
client.schema.delete_all()

schema = client.schema.get()
print(json.dumps(schema))
```

## Create your first class!

Let's create your first class!

We'll take the example of the [basics](./basics.html#data-objects-in-weaviate) getting started guide because you're already familiar with it.

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

# delete all classes, just to make sure we
# start with a clean Weaviate.
client.schema.delete_all()

# we will create the class "Author" and the properties
# from the basics section of this guide
class_obj = {
    "class": "Author", # <= note the capital "A".
    "description": "A description of this class, in this case, it's about authors",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Author",
            "name": "name",
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
            "name": "description"
        }
    ]
}

# add the schema
client.schema.create_class(class_obj)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

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

Correct, that's Weaviate adding some default config for you. You can all change, improve, tweak, and update this, but that's for a later expert guide. For now, let's add a second class.

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

# we will create the class "Publication" and the properties
# from the basics section of this guide
class_obj = {
    "class": "Publication",
    "description": "A description of this class, in this case, it's about authors",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Publication",
            "name": "name",
        }
    ]
}

# add the schema
client.schema.create_class(class_obj)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

This should look something like this:

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

Note how we now have the Author _and_ the Publication in there!

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 For those of you who can't wait (we get it, it's fine, we'll see you back here in a bit), an overview of all data types can be found [here](../data-schema/datatypes.html#introduction), an overview of the ANN index [here](../vector-index-plugins/), and the distance metrics [here](../vector-index-plugins/distances.html).
</div>

## Setting cross-references

Because we currently have two classes, we can make a cross-reference.

An `Author`, `writesFor` a `Publication`. To achieve this, we want to update the `Author` class to contain the cross-reference to `Publication`.

Let's set that cross-reference:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose


add_prop = {
  "dataType": [
      "Publication" # <== note how the name of the class is the cross reference
  ],
  "name": "writesFor"
}

# Add the property
client.schema.property.create("Author", add_prop)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

The response should contain something like this:

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

We can also set it the other way around, a `Publication`, `has`, `Author`s. To achieve this, we want to update the `Publication` class to contain the cross-reference to `Author`.

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# or
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose

add_prop = {
  "dataType": [
      "Author" # <== note how the name of the class is the cross reference
  ],
  "name": "has"
}

# Add the property
client.schema.property.create("Publication", add_prop)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

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

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 You can set cross-references in all directions and later (as we see [while querying](./query.html)) filter on them. But know that Weaviate is _not_ a graph database ([remember](./basics.html#what-is-weaviate)?). This means that dealing with -for example- many-to-many relationships or things like shortest path algorithms is not in our wheelhouse.
</div>

## Intro to index settings

In Weaviate, you configure indices per class. Weaviate supports two types of indices.

0. An **approximate nearest neighbor index (ANN)** - the ANN index is used to serve all vector-search queries.
0. An **inverted index** - the inverted index allows for filtering by properties, as well as serve BM25 queries

Some things to bear in mind:

* Especially for large datasets, configuring the indices is important because the more you index, the more storage is needed.
* Simply put, if you don't query over a specific field or vector space, don't index it.
* One of Weaviate's unique features is how the indices are regulated (learn more about this [here](../architecture/prefiltering.html)).  

## Configure the ANN index

As you've learned in the basics section (we mean [this](./basics.html#what-is-weaviate) part), one of Weaviate's core strengths is combining the ANN index with an inverted index. What's important to know, is that the "A" in ANN (i.e., the "approximate") comes with a trade-off. That is, the index is _approximate_ and, therefore _not_ always 100% accurate. This is what the experts mean when they talk about the "recall of the algorithm."

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 There are different ANN algorhythms, you can find a nice overview of them on [this website](http://ann-benchmarks.com/). Only those algorhythms which support [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) can be used in Weaviate (we want that sweet database UX) and Weaviate's ANN system is [completely plug-and-playable](../architecture/index.html#weaviates-architecture-from-above) so that we can always add other algorhythms in the future.
</div>

If you always want total recall (i.e., a 100% recall, not to be confused with the Arnold Schwarzenegger movie), you need brute-force vector comparisons that are super slow (as in, _really_ slow) and not useful for production settings (hence ANN algorithms exist).

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 Because vector search use cases are growing rapidly, more and more ANN-algorithm are produced. A "good" ANN algorithm means that the recall is high _and_ that it's fast. You can dive into the rabbit hole right [here](https://arxiv.org/search/?query=approximate+nearest+neighbor&searchtype=all). But! Don't be like Alice; just make sure to come back here.
</div>

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

* `vectorIndexType` is the ANN algorithm you want to use. By default, Weaviate selects the Hierarchical Navigable Small World (HNSW) algorithm.
* `ef` is HNSW specific, and is used to find the right vectors stored in the index. The higher you set it the more accurate the recall but the slower the search becomes (more about picking the right index strategy below). By default Weaviate sets the value to `-1` which means as much as: "Let Weaviate pick the right ef value for me."
* `efConstruction` is HNSW specific, you can't change it after creating the class (i.e., it is immutable) but it mitigates the above-mentioned `ef` settings. The tradeoff here is on importing. So a high `efConstruction` means that you can lower your `ef` settings but that importing will be slower.
* `vectorCacheMaxObjects` is the Weaviate cache. By default it is set to 2,000,000. We would recommend setting this to a number _greater_ than your total object amount.
* `distance` is the type of distance calculation in vector space, for most machine learning models cosine similatiry, is the distance metric that we need, but Weaviate does [support other distance metrics as well](../vector-index-plugins/distances.html).

Now you might be wondering: "What settings do I need for my use case?"

To determine this, you need to ask yourself the following questions and compare your answers in the table below:

0. How many queries am I expecting per second?
0. I'm I expecting a lot of imports or updates?
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

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 The [ANN benchmark page](../benchmarks/ann.html) contains a wide variety of vector search use cases and relative benchmarks. This page is ideal for finding a dataset similar to yours and learning what the most optimal settings are. 
</div>

## Configure the inverted index

...

## Configure the BM25 index

...

## Classes without indices

If you don't want to set an index at all, this is possible too.

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

...

## Autoschema feature

...

## Other schema operations

...

see API docs

...

## Recapitulation

* Weaviate has a schema where you will define how your data objects will be indexed.
* Weaviate's schema is class property based.
* The schema is highly configurable but comes with pre-defined settings.
* The ANN index needs to be set for your use case (especially if you have a large dataset)
* You can enable or disable the index based on your use case

## What would you like to learn next?

* [Learn how to import data](./import.html)
* [Learn how to query data based on a schema](query.html)
* [Take me one step back to the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}
