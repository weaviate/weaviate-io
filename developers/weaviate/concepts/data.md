---
title: Data structure
sidebar_position: 10
image: og/docs/concepts.jpg
# tags: ['basics']
---


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

Following on our author example, Weaviate can store multiple authors like this:

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
Creating cross-references does not affect object vectors in either direction.
:::

Where data objects have relationships with each other, they can be represented in Weaviate with cross-references.

For example, let's say that we want to represent the fact that *"Paul Krugman writes for the New York Times"*. We can do this by establishing a cross-reference relationship that Paul Krugman writes for the New York Times. More specifically, a `Publication` object representing the New York Times can have a cross-reference to an `Author` object representing Paul Krugman.

So, given the following `Publication` object for the New York Times:

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

We can identify it with its `UUID`, and specify it in the `writesFor` property for the `Author`. An object containing a cross-reference may look like this:

```json
{
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        ...
// highlight-start
        "writesFor": [
            {
                "beacon": "weaviate://localhost/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
                "href": "/v1/objects/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
            }
        ],
// highlight-end
    },
    "vector": [...]
}
```

Each cross-reference relationship in Weaviate is directional.

So, in addition to the `Author` class having a `writesFor` property that points to the `Publication` class, you could have a `hasAuthors` property in the `Publication` class that points to the `Author` class.

Cross-references in Weaviate can be best thought of as links to help you retrieve related information. Cross-references do not affect the vector of the `from`, or the `to` object.

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

## Multi-tenancy

:::info Related pages
- [How-to manage data: Multi-tenancy operations](../manage-data/multi-tenancy.md)
- [References: REST API: Schema: Multi-tenancy](../api/rest/schema.md#multi-tenancy)
:::

:::info Multi-tenancy availability
- Multi-tenancy added in `v1.20`
- Tenant activity status setting added in `v1.21`
:::

If you want to use a single Weaviate cluster to store data that is segregated from other data in the cluster, use multi-tenancy. Every class can be configured to isolate data for a `tenant` by providing a tenant key.

When multi-tenancy is enabled, Weaviate uses partition shards to store each tenant's data. Sharding has several benefits:

- Data isolation
- Fast, efficient querying
- Easy and robust setup and clean up

Staring in `v1.20`, shards are more lightweight. You can easily have 50,000, or more, active shards per node. This means that you can support 1M concurrently active tenants with just 20 or so nodes.

Starting in `v1.20.1`, you can specify tenants as active (`HOT`) or inactive (`COLD`). For more details on managing tenants, see [Multi-tenancy operations](../manage-data/multi-tenancy.md).

Multi-tenancy is especially useful when you want to store data for multiple customers, or when you want to store data for multiple projects.

### Tenancy and IDs

Each tenancy works like a namespace. So, different tenants could have objects with the same IDs. What makes an object’s ID unique is not just the object ID itself, but the combination of the tenant and the object ID.

### Tenancy and cross-references

When using multi-tenancy, cross-references can be made as follows:

- From a multi-tenancy object to a non-multi-tenancy object.
- From a multi-tenancy object to a multi-tenancy object, as long as they belong to the same tenant.

You **cannot** create cross-references:

- From a non-multi-tenancy object to a multi-tenancy object, or
- From a multi-tenancy object to a multi-tenancy object, if they belong to different tenants.

### Key features

- Each tenant has a dedicated high-performance vector index providing query speeds as if the tenant was the only user on the cluster.
- As each tenant's data is isolated to a dedicated shard, deletes are fast, easy and do not affect other tenants.
- To scale up, add a new node to your cluster. Weaviate will automatically schedule new tenants on the node with the least resource usage.

:::info Related pages
- [How-to: Manage Data | Multi-tenancy operations](../manage-data/multi-tenancy.md)
- [Multi-tenancy blog](/blog/multi-tenancy-vector-search)
:::

### Monitoring metrics with multi-tenancy

When using multi-tenancy, we suggest setting the `PROMETHEUS_MONITORING_GROUP` [environment variable](../config-refs/env-vars.md) as `true` so that data across all tenants are grouped together for monitoring.

### Tenancy size per node

Although there is no inherent limit of tenants per node, the current limit is from Linux's open file limit per process. With a class with 6 properties, we could store ~70,000 tenants on a single node before running out of file descriptors.

Concretely, a 9-node cluster using `n1-standard-8` machines in our tests could hold around 170k active tenants, with 18-19k tenants per node.

Note that these numbers relate to active tenants only. The size of tenants per node can be increased by [setting unused tenants as inactive](../api/rest/schema.md#update-tenants).

### Tenant status

:::info Added in `v1.21`
:::

A tenant status can be `HOT` or `COLD`. If `HOT`, the tenant's shard is active, and if `COLD`, the tenant's shard is inactive. An inactive shard is turned off to save resources, meaning Weaviate can not read from or write to the shard in that state. Any attempt to access it will result in an error, with a message that tenant is not active

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
* You can use multi-tenancy to isolate data for each tenant.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
