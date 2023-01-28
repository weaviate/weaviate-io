---
title: Schemas in detail
sidebar_position: 3
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

In the previous section, you saw how to specify the name and the vectorizer for a data collection, called a "class" in Weaviate:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

Then when you navigated to the [`schema` endpoint](../api/rest/schema.md) at `https://some-endpoint.weaviate.network/v1/schema`, you should have seen the above-specified class name and the vectorizer. 

But you might have also noticed that the `schema` included a whole lot of information that you did not specify. 

That's because Weaviate inferred them for us. 

### Auto-schema vs. manual schema

A schema specifies to Weaviate the structure of the information to be saved. 

When any required information is missing as in the previous section, Weaviate will infer the rest from the data being imported as well as the default settings. 

This is called the [`Auto-schema` feature](../configuration/schema-configuration.md#auto-schema).

Although Auto-schema works well for some instances, we generally advise manually setting your schema to optimize Weaviate's performance.

In this section, we will explore the schema in more detail, including discussing some of the more commonly specified parameters, and why you might want to take the time to manually set the schema.

## Prerequisites 

At this point, you should have: 

- A new instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face, and
- Installed your preferred Weaviate client library. 

If you have completed the previous section, your Weaviate instance will contain data objects and a schema. 

**We recommend deleting it all before starting this section.**

import CautionSchemaDeleteAll from '/_includes/schema-delete-all.mdx'

<CautionSchemaDeleteAll />

## Create a class

A collection of data in Weaviate is called a "class". We will be adding a class to store our quiz data. 

### About classes

Weaviate classes:
- Are always written with a capital letter first. This is to distinguish them from generic names for cross-referencing.
- Have `property` values, and each `property` specifies the data types to store.
- Can each have different vectorizers (e.g. one class can have a `text2vec-openai` vectorizer, and another might have `multi2vec-clip` vectorizer, or `none` if providing your own vectors).

### Create a basic class

Let's create a class called **Question** as we did before. 

Our **Question** class will:
- Contain three properties:
    - name `answer`: type `text`
    - name `question`: type `text`
    - name `category`: type `string`    
- Use a `text2vec-openai` vectorizer

Run the below code with your client to define the schema for the **Question** class and display the created schema information.

import CodeCreateSchema from '/_includes/code/quickstart.schema.create.mdx';

<CodeCreateSchema />

The result should look something like this:

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
                        "string"
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

We get back a lot of information here. 

Some of it is what we specified, such as the class name (`class`), and `properties` including their `dataType` and `name`. But the others are inferred by Weaviate based on the defaults and the data provided. 

### Class property specification examples

And depending on your needs, you might want to change any number of these. For example, you might change:

- `dataType` to modify the type of data being saved. Above, classes with dataType `text` will be indexed after tokenization, whereas `string` classes will not be.
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
            "vectorizeClassName": false
        }
    },
    "invertedIndexConfig": {
        "bm25": {
            "k1": 1.5,
            "b": 0.75
        }
    },    
    "properties": [
        {
            "dataType": ["text"],
            "description": "The question",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": true
                }
            },             
            "name": "question",
        },
        {
            "dataType": ["text"],
            "description": "The answer",
            "name": "answer",
        },
        {
            "dataType": ["string"],
            "description": "The category",
            "name": "category",
        },           
    ]
}
```

And with this you will have changed the specified properties from their defaults. 

You can read more about various schema, data types, modules, and index configuration options in the pages below. 

- [Schema](../configuration/schema-configuration.md)
- [Data types](../configuration/datatypes.md)
- [Modules](../configuration/modules.md)
- [Indexes](../configuration/indexes.md)

## Recap

* The schema is where you define the structure of the information to be saved.
* The schema is class property based.
* Any unspecified setting is inferred by the auto-schema feature based on the data and defaults.

## Next

* [Imports in detail](./import.md)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
