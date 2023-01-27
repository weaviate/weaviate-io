---
title: Manual schema
sidebar_position: 3
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

In the previous section, you saw that we specified a class name the vectorizer to be used in this format:

import CodeAutoschemaMinimumSchema from '/_includes/code/getting.started.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

Then when you navigated to the [`schema` endpoint](../api/rest/schema.md) at `https://some-endpoint.weaviate.network/v1/schema`, you should have seen the above-specified class name and the vectorizer. 

### Auto-schema vs. manual schema

But you might have also noticed that the `schema` included a whole lot of information that you did not specify. 

They are required to specify the structure of the information to be saved to Weaviate. When any required information is missing as in the previous section, Weaviate will infer the rest from the data being imported as well as the default settings. 

This is called the [`Auto-schema` feature](../configuration/schema-configuration.md#auto-schema).

Although auto schema works well for some instances, we generally advise manually setting your schema to optimize Weaviate's performance.

So here, we will introduce you to manual specification of the schema as well as why you might want to.

## Prerequisites 

At this point, you should have: 

- An new instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face, and
- Installed your preferred Weaviate client library. 

If you have completed the previous section, your Weaviate instance will contain data objects and a schema. We recommend deleting it all before starting this section:

import CautionSchemaDeleteAll from '/_includes/schema-delete-all.mdx'

<CautionSchemaDeleteAll />

## Create a class

Let's add a class to store our quiz data as we did before. 

### About classes

Weaviate classes:
- Are always written with a capital letter first. This is to distinguish them from generic names for cross-referencing.
- Have properties, each specifying type of data values to store.
- Can each have different vectorizers (e.g. one class can have a `text2vec-openai` vectorizer, and another might have `multi2vec-clip` vectorizer, or `none` if providing own vectors).

### Create a basic class

Let's create a class called **Question** as we did before. 

Our **Question** class will:
- Contain three properties:
    - name `answer`: type `string`
    - name `question`: type `string`
- Use a `text2vec-openai` vectorizer

Run the below code in you application, which will define the schema for the **Question** class and display the created schema information.

import CodeCreateSchema from '/_includes/code/getting.started.schema.create.2.mdx';

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
                        "string"
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
                        "string"
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

Some of it is what we specified, such as the class name (`class`), and `properties` including their `dataType` and`name`. But the others are inferred by Weaviate based on the defaults and the data provided. 

### Class property specification examples

And depending on your needs, you might want to change any number of these. For example, you might change:

- `moduleConfig` to modify how each module behaves. In this case, you could change model and/or version for the OpenAI inference API, and the vectorization behavior such as whether the class name is used for vectorization.
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
            "dataType": ["string"],
            "description": "The question",
            "name": "question",
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": true
                }
            },            
        },
        {
            "dataType": ["string"],
            "description": "The answer",
            "name": "answer",
        },
    ]
}
```

With which you will have changed the specified properties from their defaults. 

You can read more about various schema, data type, modules, and index configuration options in the pages below. 

- [Schema](../configuration/schema-configuration.md)
- [Data types](../configuration/datatypes.md)
- [Modules](../configuration/modules.md)
- [Indexes](../configuration/indexes.md)

## Recap

* Weaviate has a schema where you will define how your data objects will be indexed.
* Weaviate's schema is class property based.
* The schema is highly configurable but comes with pre-defined settings.

## Next

* [Import data](./import.md)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
