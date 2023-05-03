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

This page describes how to configure Weaviate's schema, which defines the structure of the data and corresponding indexes in Weaviate.

The schema can contain one or more classes defining a collection of data objects.

### Auto-schema

Creating a schema manually is not mandatory. If a data object is inserted into Weaviate without sufficient corresponding class definition, the `auto-schema` feature will infer the missing definition based on the data object's properties and defaults ([read more](../config-refs/schema.mdx#auto-schema)).

## Create a class

A class describes a collection of data objects. They can be defined as a part of the schema, such as shown in the examples below.

:::info For a full list of parameters
See the `schema` REST endpoint [API reference page](../api/rest/schema.md#create-a-class) for a full list of available parameters.
:::

### Minimal example

As a minimum, a class definition only requires a name.

import CodeSchemaCreateMinimal from '/_includes/code/schema.class.create.minimal.mdx';

<CodeSchemaCreateMinimal />

### Property definition

A class definition can specify any number of properties.

import CodeSchemaCreateProperty from '/_includes/code/schema.class.create.property.mdx';

<CodeSchemaCreateProperty />

In addition to the property name, you can figure parameters such as the data type, inverted index configuration and more.

### Specify a vectorizer

Each class's vectorizer setting can be adjusted through the schema. The following example sets the `text2vec-openai` module to vectorize the `Article` class.

import CodeSchemaCreateVectorizer from '/_includes/code/schema.class.create.vectorizer.mdx';

<CodeSchemaCreateVectorizer />

### Class-level module settings

Modules' behaviors can be set on a class level with the schema, with the `moduleConfig` parameter.

For example, the vectorizer could be configured to set the model used, or whether to vectorize the class name.

import CodeSchemaCreateVectorizerClass from '/_includes/code/schema.class.create.vectorizer.class.mdx';

<CodeSchemaCreateVectorizerClass />

### Property-level module settings

Modules' behaviors can be also set on a property level with the schema, with the `moduleConfig` parameter under each class property.

For example, the vectorizer could be configured to set whether the property name is to be vectorized, or whether the property should be vectorized at all.

import CodeSchemaCreateVectorizerProperty from '/_includes/code/schema.class.create.vectorizer.property.mdx';

<CodeSchemaCreateVectorizerProperty />

### Index configurations

Both of the inverted index and vector index configuration can be set using the schema.

For example, the following snippet includes the `vectorIndexConfig` parameter to set the vector index parameters such as `efConstruction` and `maxConnections`, and `invertedIndexConfig` to set the inverted index parameters such as `stopwords`.

import CodeSchemaCreateIndexProps from '/_includes/code/schema.class.create.index.props.mdx';

<CodeSchemaCreateIndexProps />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
