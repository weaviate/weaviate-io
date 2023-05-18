---
title: Data structure
sidebar_position: 1
image: og/docs/concepts.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- `Core knowledge/Basics`
  - Refactored to contain subject matter to data structure in Weaviate
  - Introductory "What is Weaviate" sections removed as duplicated by `Introduction`
  - `Console`, `Benchmarks` and `Monitoring` paragraphs removed
::: -->

:::info Related pages
- [Configuration: Schema](../configuration/schema-configuration.md)
:::

## Overview

This document lays out how Weaviate deals with data objects, including how they are stored, represented, and linked to each other.

## Data object nomenclature

Each data object in Weaviate always belongs to a Class, and has one or more Properties.

Weaviate stores _data objects_ (represented as JSON-documents) in _class-based collections_, where each object can be represented by a machine learning _vector_ (i.e., an embedding).

Each _class-based collection_ contains objects of the same _class_, which are defined by a common _schema_.

Let's unpack this with an example.

### JSON documents as objects

Imagine we need to store information about the following author: Alice Munro.

The data about this author can be represented in JSON like this:

```json
{
    "name": "Alice Munro",
    "age": 91,
    "born": "1931-07-10T00:00:00.0Z",
    "wonNobelPrize": true,
    "description": "Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time."
}
```

### Vectors

As mentioned earlier, we can also attach `vector` representations to our data objects. This is represented as an array of numbers under a `"vector"` property, like this:

```json
{
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Alice Munro",
        (...)
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}
```

You can generate vectors yourself outside of Weaviate, or use one of Weaviate's vectorizer [modules](./modules.md).

### Class Collections

Weaviate groups all Authors under the `Author` class and places them in the same _class collection_.

<!-- [Alice Munro
Born: July 10, 1931 (age 91)
Nobel Prize Winner

"Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time...."
]

[Paul Krugman
Born: February 28, 1953 (age 69)
Nobel Prize Winner

"Paul Robin Krugman is an American economist and public intellectual, who is..."
] -->

Following on our author example, Weaviate can store multipe authors like this:

```json
[{
    "id": "dedd462a-23c8-32d0-9412-6fcf9c1e8149",
    "class": "Author",
    "properties": {
        "name": "Alice Munro",
        "age": 91,
        "born": "1931-07-10T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time."
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}, {
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist and public intellectual, who is Distinguished Professor of Economics at the Graduate Center of the City University of New York, and a columnist for The New York Times. In 2008, Krugman was the winner of the Nobel Memorial Prize in Economic Sciences for his contributions to New Trade Theory and New Economic Geography."
    },
    "vector": [
        -0.93070928,
        -0.03782172,
        -0.56288009
    ]
}]
```

:::tip
Every object stored in Weaviate has a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier), which guarantees uniqueness across all collections.
:::

### Cross-references

:::note Cross-references do not affect vectors
Creating cross-references do not affect object vectors in either direction.
:::

In some cases we need to link data objects with each other.

For example: *"Paul Krugman writes for the New York Times"*.<br/>
To represent this relationship between the `Author` and the `Publication`, we need to cross-reference the objects.

Let's say we have a *New York Times* object, like this:

```json
{
    "id": "32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
    "class": "Publication",
    "properties": {
        "name": "The New York Times"
    },
    "vector": [...]
}
```

Then we can use the `UUID` from the above object, to attach it to the `Author` like this (see `"writesFor"`):

<!-- TODO: check if the href format is correct. Shouldn't this include /Publication ?
 "href": "/v1/objects/Publication/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
 -->

```json
{
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        ...
        "writesFor": [
            {
                "beacon": "weaviate://localhost/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
                "href": "/v1/objects/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
            }
        ]
    },
    "vector": [...]
}
```

:::tip `Hrefs` vs `beacons`
`Hrefs` and `beacons` are the locations within Weaviate, which allow us to retrieve cross-referenced objects. We will discuss the difference further as we go forward.
:::

## Weaviate Schema

Weaviate requires a data schema to be built before adding data.

import SchemaDef from '/_includes/definition-schema.md';

<SchemaDef/>

Designing and adding a data schema does not need to be done manually. In the absence of a data schema specification, Weaviate will generate a schema automatically from the provided data.

:::note Schema vs. Taxonomy
A Weaviate data schema is slightly different from a taxonomy, which has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).
:::

To learn how to build a schema, [see our schema tutorial](../tutorials/schema.md), or [how-to on schema configuration](../configuration/schema-configuration.md).

For now, what's important to know is this:

1. Classes and properties (as explained above) are defined in the schema.
1. Every class has its own vector space, which means that you can attach vectors from different models to different classes.
1. You can link classes (even if they use different embeddings) by setting cross-references.
1. You can configure module behavior, ANN index settings, reverse index types, etc. In the schema as well (more about this in the [schema tutorial](../tutorials/schema.md)).

## Recap

* Inside Weaviate, you can store _data objects_ which can be represented by a machine learning vector.
* Weaviate represents data objects as JSON documents.
* Every data object can contain a vector.
* You can set cross-references as datatypes to link to other objects.
* You will define classes and properties in a schema.
* Different classes can represent different vector spaces.
* The schema has a class-property data structure.
* You define classes and properties in the schema.
* We can query using the GraphQL-interface or -in some cases- the RESTful API.
* Vectors come from machine learning models that you inference yourself or through a Weaviate module.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
