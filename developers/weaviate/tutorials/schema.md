---
title: Schemas in detail
sidebar_position: 20
image: og/docs/tutorials.jpg
# tags: ['basics']
---


## Overview

In this section, we will explore schema construction, including discussing some of the more commonly specified parameters. We will also discuss the auto-schema feature and why you might want to take the time to manually set the schema.

## Prerequisites

We recommend you complete the [Quickstart tutorial](../quickstart/index.md) first.

Before you start this tutorial, you should follow the steps in the tutorials to have:

- A new instance of Weaviate running (e.g. on the [Weaviate Cloud Services](https://console.weaviate.cloud)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face, and
- Installed your preferred Weaviate client library.

If you have completed the entire Quickstart tutorial, your Weaviate instance will contain data objects and a schema. **We recommend deleting the `Question` class before starting this section.** See below for details on how to do so:

### Deleting classes

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

## Introduction

### What is a schema?

import SchemaDef from '/_includes/definition-schema.md';

<SchemaDef/>

### Quickstart recap

In the [Quickstart tutorial](../quickstart/index.md), you saw how to specify the name and the vectorizer for a data collection, called a "class" in Weaviate:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart/collection.definition.mdx'

<CodeAutoschemaMinimumSchema />

Then when you navigated to the [`schema` endpoint](../api/rest/schema.md) at `https://some-endpoint.weaviate.network/v1/schema`, you will have seen the above-specified class name and the vectorizer.

But you might have also noticed that the `schema` included a whole lot of information that you did not specify.

That's because Weaviate inferred them for us, using the "auto-schema" feature.

### Auto-schema vs. manual schema

Weaviate requires a complete schema for each class of data objects.

If any required information is missing, Weaviate will use the [auto-schema feature](../config-refs/schema/index.md#auto-schema) to fill in infer the rest from the data being imported as well as the default settings.

While this may be suitable in some circumstances, in many cases you may wish to explicitly define a schema. Manually defining the schema will help you ensure that the schema is suited for your specific data and needs.

## Create a class

A collection of data in Weaviate is called a "class". We will be adding a class to store our quiz data.

### About classes

Here are some key considerations about classes:

Each Weaviate class:
- Is always written with a capital letter first. This is to distinguish them from generic names for cross-referencing.
- Constitutes a distinct vector space. A search in Weaviate is always restricted to a class.
- Can have its own vectorizer. (e.g. one class can have a `text2vec-openai` vectorizer, and another might have `multi2vec-clip` vectorizer, or `none` if you do not intend on using a vectorizer).
- Has `property` values, where each `property` specifies the data type to store.

:::info Can I specify my own vectors?
Yes! You can bring your own vectors and pass them to Weaviate directly. See [this reference](../api/rest/objects.md#with-a-custom-vector) for more information.
:::

### Create a basic class

Let's create a class called **Question** for our data.

Our **Question** class will:
- Contain three properties:
    - name `answer`: type `text`
    - name `question`: type `text`
    - name `category`: type `text`
- Use a `text2vec-openai` vectorizer

Run this code with your client to define the schema for the **Question** class and display the created schema information.

import CodeCreateSchema from '/_includes/code/quickstart.schema.create.mdx';

<CodeCreateSchema />

:::note Classes and Properties - best practice
Classes always start with a capital letter. Properties always begin with a small letter. You can use `PascalCase` class names, and property names allow underscores. Read more about schema classes, properties and data types [here](../config-refs/schema/index.md).
:::

The result should look something like this:

<details>
  <summary>See the returned schema</summary>

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

We get back a lot of information here.

Some of it is what we specified, such as the class name (`class`), and `properties` including their `dataType` and `name`. But the others are inferred by Weaviate based on the defaults and the data provided.

### Class property specification examples

And depending on your needs, you might want to change any number of these. For example, you might change:

- `dataType` to modify the type of data being saved. For example, classes with dataType `text` will be tokenized differently to those with `string` dataType ([read more](../config-refs/schema/index.md#property-tokenization)).
- `moduleConfig` to modify how each module behaves. In this case, you could change the model and/or version for the OpenAI inference API, and the vectorization behavior such as whether the class name is used for vectorization.
- `properties` / `moduleConfig` to further modify module behavior at a class data property level. You might choose to skip a particular property being included for vectorization.
- `invertedIndexConfig` to add or remove particular stopwords, or change BM25 indexing constants.
- `vectorIndexConfig` to change vector index (e.g. HNSW) parameters, such as for speed / recall tradeoffs.

So for example, you might specify a schema like the one below:

```json
{
    "class": "Question",
    "description": "Information from a Jeopardy! question",
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": false  // Default: true
        }
    },
    "invertedIndexConfig": {
        "bm25": {
            "k1": 1.5,  // Default: 1.2
            "b": 0.75
        }
    },
    "properties": [
        {
            "dataType": ["text"],
            "description": "The question",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": true  // Default: false
                }
            },
            "name": "question",
        },
        ...
    ]
}
```

With this you will have changed the specified properties from their defaults. Note that in the rest of the tutorials, we assume that you have not done this.

You can read more about various schema, data types, modules, and index configuration options in the pages below.

- [Schema](../manage-data/collections.mdx)
- [Data types](../config-refs/datatypes.md)
- [Modules](../configuration/modules.md)
- [Indexes](../config-refs/schema/vector-index.md)

## Recap

- The schema is where you define the structure of the information to be saved.
- A schema consists of classes and properties, which define concepts.
<!-- - Words in the schema (names of classes and properties) must be part of the `text2vec-contextionary`. -->
- Any unspecified setting is inferred by the auto-schema feature based on the data and defaults.
- The schema can be modified through the [RESTful API](../api/rest/schema.md).
- A class or property in Weaviate is immutable, but can always be extended.

## Suggested reading

- [Reference: `schema` endpoint RESTful API](../api/rest/schema.md)
- [Tutorial: Import in detail](./import.md)
- [Tutorial: Queries in detail](./query.md)
- [Tutorial: Introduction to modules](./modules.md)
- [Tutorial: Introduction to Weaviate Console](../../wcs/guides/console.mdx)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
