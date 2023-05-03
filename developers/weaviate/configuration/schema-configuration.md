---
title: Schema
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['configuration', 'schema']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::info Related pages
- [Tutorial: Schema](../tutorials/schema.md)
- [References: Schema](../config-refs/schema.mdx)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)
:::

## Overview

This page includes information on how to configure Weaviate's schema, which defines the structure of the data and corresponding indexes in Weaviate. For API-specific information, see the [`schema` REST API page](../api/rest/schema.md).

### Auto-schema

When a class definition is missing or inadequate for data import, the auto-schema feature can infer the missing definition by examining the data object's properties and applying default values ([learn more](../config-refs/schema.mdx#auto-schema)).

However, you might find it preferable to define the schema manually. This is because the properties inferred by the auto-schema may not always align with your specific requirements.

## Create a class

:::info Capitalization
Class and property names are treated equally no matter how the first letter is cased, eg "Article" == "article"
:::

A class describes a collection of data objects. They can be defined as a part of the schema, such as shown in the examples below.

:::info References
- See the `schema` REST endpoint [API references page](../api/rest/schema.md#create-a-class) for detailed information on the endpoint usage, and
- See the [Schema configuration references page](../config-refs/schema.mdx) for explanation of each parameter.
:::

### Minimal example

As a minimum, a class definition only requires a name.

import CodeSchemaCreateMinimal from '/_includes/code/schema.class.create.minimal.mdx';

<CodeSchemaCreateMinimal />

### Property definition

A class definition can specify any number of properties.

import CodeSchemaCreateProperty from '/_includes/code/schema.class.create.property.mdx';

<CodeSchemaCreateProperty />

In addition to the property name, you can figure parameters such as the data type, inverted index tokenization and more.

- [Property object configuration references](../config-refs/schema.mdx#property-object)

### Specify a vectorizer

Each class's vectorizer setting can be adjusted through the schema. The following example sets the `text2vec-openai` module to vectorize the `Article` class.

import CodeSchemaCreateVectorizer from '/_includes/code/schema.class.create.vectorizer.mdx';

<CodeSchemaCreateVectorizer />

- [Vectorizer configuration references](../config-refs/schema.mdx#vectorizer)

### Class-level module settings

Modules' behaviors can be set on a class level with the schema, with the `moduleConfig` parameter.

For example, the vectorizer could be configured to set the model used, or whether to vectorize the class name.

import CodeSchemaCreateVectorizerClass from '/_includes/code/schema.class.create.vectorizer.class.mdx';

<CodeSchemaCreateVectorizerClass />

The available parameters vary according to the module. See the [modules page](../modules/index.md) for more.

### Property-level module settings

Modules' behaviors can be also set on a property level with the schema, with the `moduleConfig` parameter under each class property.

For example, the vectorizer could be configured to set whether the property name is to be vectorized, or whether the property should be vectorized at all.

import CodeSchemaCreateVectorizerProperty from '/_includes/code/schema.class.create.vectorizer.property.mdx';

<CodeSchemaCreateVectorizerProperty />

The available parameters vary according to the module. See the [modules page](../modules/index.md) for more.

### Indexing, sharding and replication settings

Both of the inverted index and vector index configuration can be set using the schema, as well as sharding and replication settings.

The `vectorIndexConfig` parameter sets vector index parameters such as `efConstruction` and `maxConnections`, and the `invertedIndexConfig` parameters sets the inverted index parameters such as `stopwords`.

Sharding configurations can be set through the `shardingConfig` parameter and replication configurations can be set through the `replicationConfig` parameter.

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



## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
