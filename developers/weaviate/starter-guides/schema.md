---
title: Schema (collection definitions)
sidebar_position: 20
image: og/docs/tutorials.jpg
# tags: ['basics']
---


## Overview

This tutorial will guide you through the process of defining a schema for your data, including commonly used settings and key considerations.

:::info Prerequisites
- (Recommended) Complete the [Quickstart tutorial](../quickstart/index.md).
- A Weaviate instance with an administrator API key.
- Install your preferred Weaviate client library.
:::

## Schema: An Introduction

### What is a schema?

The database schema defines how data is stored, organized and retrieved in Weaviate.

A schema **must** be defined before data can be imported. We generally recommend defining as much of the schema manually, although Weaviate can also infer the schema during import if [auto-schema feature](../config-refs/schema/index.md#auto-schema) is enabled.

Let's begin with a simple example before diving into the details.

### Basic schema creation

This example will create a simple collection called **Question**, with three properties (`answer`, `question`, and `category`), the `text2vec-openai` vectorizer and the `generative-cohere` module for RAG. It then retrieves the schema and displays it.

import CodeCreateSchema from '/_includes/code/tutorial.schema.create.mdx';

<CreateSchema />

The returned configuration should look something like this:

<details>
  <summary>See the returned schema</summary>

Note: results will vary depending on your client library.

```json
{
    "classes": [
        {
            "class": "Question",
            "description": "Information from a Jeopardy! question",
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
            "moduleConfig": {
                "text2vec-openai": {
                    "model": "ada",
                    "modelVersion": "002",
                    "type": "text",
                    "vectorizeClassName": true
                }
            },
            "properties": [
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "The question",
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "question",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "The answer",
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "answer",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "The category",
                    "moduleConfig": {
                        "text2vec-openai": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "category",
                    "tokenization": "word"
                }
            ],
            "replicationConfig": {
                "factor": 1
            },
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
                "vectorCacheMaxObjects": 1000000000000,
                "flatSearchCutoff": 40000,
                "distance": "cosine"
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-openai"
        }
    ]
}
```

</details>

Although we only specified the collection name and properties, the returned schema includes much more information.

This is because Weaviate infers the schema based on the data and defaults. Each of these options can be specified manually at collection creation time.

:::info FAQ: Are schemas mutable?
Yes, to an extent. There are no restrictions against adding new collections, or properties. However, not all settings are mutable within existing collections. For example, you can not change the vectorizer or the generative module. You can read more about this in the [schema reference](../config-refs/schema/index.md#mutability).
:::

## Schemas in detail

Conceptually, it may be useful to think of each Weaviate instance comprising of multiple collections, each of which is a set of objects that share a common structure.

For example, you might have a movie database with `Movie` and `Actor` collections, each with their own properties. Or you might have a news database with `Article`, `Author` and `Publication` collections.

### Available settings

For the most part, each collection should be thought of as isolated from the others (in fact, they are!). Accordingly, they can be configured independently. Each collection has:
- A set of `properties` specifying the object data structure.
- Multi-tenancy settings.
- Vectorizer and generative modules.
- Index settings (for vector and inverted indexes).
- Replication and sharding settings.

And depending on your needs, you might want to change any number of these.

### Properties

Each property has a number of settings that can be configured, such as the `dataType`, `tokenization`, and `vectorizePropertyName`. You can read more about these in the [schema reference](../config-refs/schema/index.md#properties).

So for example, you might specify a schema like the one below, with additional options for the `question` and `answer` properties:

import SchemaWithPropertyOptions from '/_includes/code/tutorial.schema.properties.options.mdx';

<SchemaWithPropertyOptions />

#### Cross-references

This is also where you would specify cross-references, which are a special type of property that links to another collection.

Cross-references can be very useful for creating relationships between objects. For example, you might have a `Movie` collection with a `withActor` cross-reference property that points to the `Actor` collection. This will allow you to retrieve relevant actors for each movie.

However, please be aware that using cross-references can be costly in terms of performance, so we recommend using them sparingly. Additionally, cross-reference properties do not affect the object's vector. So if you want the related properties to be considered in a vector search, they should be included in the object's vectorized properties.

You can find examples of how to define and use cross-references [here](../manage-data/cross-references.mdx).

### Vectorizer and generative modules

Each collection can be configured with a vectorizer and a generative module. The vectorizer is used to generate vectors for each object and also for any un-vectorized queries, and the generative module is used to perform retrieval augmented generation (RAG) queries.

These settings are currently immutable once the collection is created. Accordingly, you should choose the vectorizer and generative module carefully.

If you are not sure where to start, modules that integrate with popular API-based model providers such as Cohere or OpenAI are good starting points. You can find a list of available [vectorizer modules here](../modules/retriever-vectorizer-modules/index.md) and [generative modules here](../modules/reader-generator-modules/index.md).

### Multi-tenancy settings

Starting from version `v1.20.0`, each collection can be configured as a multi-tenancy collection. This allows separation of data between tenants, typically end-users, at a much lower overhead than creating separate collections for each tenant.

This is useful if you want to use Weaviate as a backend for a multi-tenant (e.g. SaaS) application, or if data isolation is required for any other reason.

import SchemaWithMT from '/_includes/code/tutorial.schema.multi-tenancy.mdx';

<SchemaWithMT />

### Index settings

Weaviate uses two types of indexes: vector indexes and inverted indexes. Vector indexes are used to store and organize vectors for fast vector similarity-based searches, and inverted indexes are used to store data for fast filtering and keyword searches.

import SchemaWithIndexSettings from '/_includes/code/tutorial.schema.index-settings.mdx';

<SchemaWithIndexSettings />

### Replication and sharding settings

#### Replication

Replication settings determine how many copies of the data are stored. For example, a replication setting of 3 means that each object is stored on 3 different replicas. This is important for providing redundancy and fault tolerance in production. (The default replication factor is 1.)

This goes hand-in-hand with consistency settings, which determine how many replicas must respond before an operation is considered successful.

We recommend that you read the [concepts page on replication](../concepts/replication-architecture/index.md) for information on how replication works in Weaviate. To specify a replication factor, follow [this how-to](../manage-data/collections.mdx#replication-settings).

#### Sharding

Sharding settings determine how each collection is sharded and distributed across nodes. This is not a setting that is typically changed, but you can use it to control how many shards are created in a cluster, and how many virtual shards are created per physical shard ([read more here](../config-refs/schema/index.md#shardingconfig)).

## Notes

### Collection & property names

Collection names always start with a capital letter. Properties always begin with a small letter. You can use `PascalCase` class names, and property names allow underscores. Read more [here](../config-refs/schema/index.md).

### Related resources

The following resources include more detailed information on schema settings and how to use them:

- [Schema - Reference: Configuration](../config-refs/schema/index.md): A reference of all available schema settings.
- [Collections - How-to: manage data](../manage-data/collections.mdx): Code examples for creating and managing collections, including how to configure various settings using client libraries.
- [Schema - Reference: REST](../api/rest/schema.md): A reference of all available schema settings for the REST API.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
