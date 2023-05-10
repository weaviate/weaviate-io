---
title: Schema
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['configuration', 'schema']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

# How to configure a schema

## Overview

This page includes information on **how to configure** your schema in Weaviate. For other schema-related information, see related pages below.

:::info Related pages
- [Tutorial: Schema](../tutorials/schema.md)
- [References: Schema](../config-refs/schema.mdx)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)
:::

### Auto-schema

When a class definition is missing or inadequate for data import, the auto-schema feature infers it based on the object properties and defaults ([learn more](../config-refs/schema.mdx#auto-schema)).

However, you might find it preferable to define the schema manually to ensure that the schema aligns with your specific requirements.

## Create a class

:::info Capitalization
Class and property names are treated equally no matter how the first letter is cased, eg "Article" == "article".

Generally, however, Weaviate follows GraphQL conventions where classes start with a capital letter and properties start with a lowercase letter.
:::

A class describes a collection of data objects. They are defined as a part of the schema, such as shown in the examples below.

### Minimal example

As a minimum, you must specify the `class` parameter for the class name.

import CodeSchemaCreateMinimal from '/_includes/code/schema.class.create.minimal.mdx';

<CodeSchemaCreateMinimal />

### Property definition

You can use `properties` to specify properties. A class definition can include any number of properties.

import CodeSchemaCreateProperty from '/_includes/code/schema.class.create.property.mdx';

<CodeSchemaCreateProperty />

In addition to the property name, you can configure parameters such as the data type, inverted index tokenization and more.

- [Property object configuration references](../config-refs/schema.mdx#property-object)
- [Available data types](../config-refs/datatypes.md)

### Specify a vectorizer

You can set an optional `vectorizer` for each class, which will override any default values present in the configuration (e.g. in an [environment variable](../config-refs/env-vars.md)). The following sets the `text2vec-openai` module as the vectorizer for the `Article` class.

import CodeSchemaCreateVectorizer from '/_includes/code/schema.class.create.vectorizer.mdx';

<CodeSchemaCreateVectorizer />

- [Available vectorizers](../modules/retriever-vectorizer-modules/index.md)
- [Vectorizer configuration references](../config-refs/schema.mdx#vectorizer)

### Class-level module settings

You can set the `moduleConfig` parameter at the class-level to set class-wide settings for module behavior. For example, the vectorizer could be configured to set the model used (`model`), or whether to vectorize the class name (`vectorizeClassName`).

import CodeSchemaCreateVectorizerClass from '/_includes/code/schema.class.create.vectorizer.class.mdx';

<CodeSchemaCreateVectorizerClass />

The available parameters vary according to the module ([learn more](../modules/index.md)).

### Property-level module settings

You can also set the `moduleConfig` parameter at the property-level to set property-level settings for module behavior. For example, you could set whether to vectorizer the property name (`vectorizePropertyName`), or whether to skip the property from vectorization altogether (`skip`).

import CodeSchemaCreateVectorizerProperty from '/_includes/code/schema.class.create.vectorizer.property.mdx';

<CodeSchemaCreateVectorizerProperty />

The available parameters vary according to the module ([learn more](../modules/index.md)).

### Indexing, sharding and replication settings

You can also set indexing, sharding and replication settings through the schema. For example, a vector index distance metric can be set for a class, can a replication factor can be set as shown below.

import CodeSchemaIndexingReplication from '/_includes/code/schema.class.create.indexing.and.replication.mdx';

<CodeSchemaIndexingReplication />

You can read more about various parameters here.

- [Vector index configuration references](../config-refs/schema.mdx#vectorindexconfig)
- [Inverted index configuration references](../config-refs/schema.mdx#invertedindexconfig--stopwords-stopword-lists)
- [Sharding configuration references](../config-refs/schema.mdx#shardingconfig)
- [Replication configuration references](../config-refs/schema.mdx#replicationconfig)

## Delete a class

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

## Update a class definition

Some parts of a class definition may be updated, while others are immutable.

The following sections describe how to add a property in a class, or to modify parameters.

### Add a property

A new property can be added to an existing class.

import CodeSchemaAddProperty from '/_includes/code/schema.class.add.property.mdx';

<CodeSchemaAddProperty />

:::info Property removal/change currently not possible
Currently, a property cannot be removed from a class definition or renamed once it has been added. This is due to the high compute cost associated with reindexing the data in such scenarios.
:::

### Modify a parameter

You can modify some parameters of a schema as shown below. However, many parameters are immutable and cannot be changed once set.

import CodeSchemaUpdateParameter from '/_includes/code/schema.class.update.parameter.mdx';

<CodeSchemaUpdateParameter />

## Review schema

If you want to review the schema, you can retrieve it as shown below.

import SchemaDumpSimple from '/_includes/code/schema.dump.simple.mdx';

<SchemaDumpSimple />

The response will be a JSON object, such as the example shown below.

<details>
  <summary>Sample schema</summary>

```json
{
  "classes": [
    {
      "class": "Article",
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
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "title",
          "tokenization": "word"
        },
        {
          "dataType": [
            "text"
          ],
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "body",
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
        "distance": "cosine",
        "pq": {
          "enabled": false,
          "bitCompression": false,
          "segments": 0,
          "centroids": 256,
          "encoder": {
            "type": "kmeans",
            "distribution": "log-normal"
          }
        }
      },
      "vectorIndexType": "hnsw",
      "vectorizer": "text2vec-openai"
    }
  ]
}
```

</details>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
