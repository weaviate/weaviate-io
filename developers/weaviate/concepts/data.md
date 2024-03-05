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

## Data object nomenclature

Each data object in Weaviate belongs to a `collection` and has one or more `properties`.

Weaviate stores `data objects` in class-based collections. Data objects are represented as JSON-documents. Objects normally include a `vector` that is derived from a machine learning model. The vector is also called an `embedding` or a `vector embedding`.

Each collection contains objects of the same `class`. The objects are defined by a common `schema`.

### JSON documents as objects

Imagine we need to store information about an author named Alice Munro. In JSON format the data looks like this:

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

You can also attach `vector` representations to your data objects. Vectors are arrays of numbers that are stored under the `"vector"` property.

In this example, the `Alice Munro` data object has a small vector. The vector is some information about Alice, maybe a story or an image, that a machine learning model has transformed into an array of numerical values.

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

To generate vectors for your data, use one of Weaviate's vectorizer [modules](./modules.md). You can also use your own vectorizer.

### Collections

Collections are groups of objects that share a schema definition.

In this example, the `Author` collection holds objects that represent different authors.

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

The collection looks like this:

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

Every collection has its own vector space. This means that different collections can have different embeddings of the same object.

:::tip
Every object stored in Weaviate has a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). The UUID guarantees uniqueness across all collections.
:::

### Cross-references

If data objects are related, use [cross-references](/weaviate/manage-data/cross-references.mdx) to represent the relationships. Cross-references in Weaviate are like links that help you retrieve related information. Cross-references capture relationships, but they do not change the vectors of the underlying objects.

To create a reference, use a property from one collection to specify the value of a related property in the other collection.

#### Cross-reference example

For example, *"Paul Krugman writes for the New York Times"* describes a relationship between Paul Krugman and the New York Times. To capture that relationship, create a cross-reference between the `Publication` object that represents the New York Times and the `Author` object that represents Paul Krugman.

The New York Times `Publication` object looks like this. Note the UUID in the `"id"` field:

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

The Paul Krugman `Author` object adds a new property, `writesFor`, to capture the relationship.

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

The value of the `beacon` sub-property is the `id` value from the New York Times `Publication` object.

Cross-reference relationships are directional. To make the link bi-directional, update the `Publication` collection to add a ``hasAuthors` property points back to the `Author` collection.

### Multiple vectors

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

## Weaviate Schema

Weaviate requires a data schema before you add data. However, you don't have to create a data schema manually. If you don't provide one, Weaviate generates a schema based on the incoming data.

import SchemaDef from '/_includes/definition-schema.md';

<SchemaDef/>

:::note Schema vs. Taxonomy
A Weaviate data schema is slightly different from a taxonomy. A taxonomy has a hierarchy. Read more about how taxonomies, ontologies and schemas are related in this Weaviate [blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).
:::

Schemas fulfill several roles:

1. Schemas define collections and properties.
1. Schemas define cross-references that link collections, even collections that use different embeddings.
1. Schemas let you configure module behavior, ANN index settings, reverse indexes, and other features on a collection level.

For details on configuring your schema, see the [schema tutorial](../starter-guides/schema.md) or [schema configuration](../manage-data/collections.mdx).

## Multi-tenancy

:::info Multi-tenancy availability
- Multi-tenancy added in `v1.20`
- The tenant activity status setting added in `v1.21`
:::

To separate data within a cluster, use multi-tenancy. Weaviate partitions the cluster into shards. Each shard holds data for a single tenant.

Sharding has several benefits:

- Data isolation
- Fast, efficient querying
- Easy and robust setup and clean up

Starting in `v1.20`, shards are more lightweight. You can easily have 50,000, or more, active shards per node. This means that you can support 1M concurrently active tenants with just 20 or so nodes.

Starting in `v1.20.1`, you can specify tenants as active (`HOT`) or inactive (`COLD`). For more details on managing tenants, see [Multi-tenancy operations](../manage-data/multi-tenancy.md).

Multi-tenancy is especially useful when you want to store data for multiple customers, or when you want to store data for multiple projects.

### Tenancy and IDs

Each tenancy is like a namespace, so different tenants could, in theory, have objects with the same IDs. To avoid naming problems, object IDs in multi-tenant clusters combine the tenant ID and the object ID to create an ID that is unique across tenants.

### Tenancy and cross-references

Multi-tenancy supports some cross-references.

Cross-references like these are supported:

- From a multi-tenancy object to a non-multi-tenancy object.
- From a multi-tenancy object to another multi-tenancy object, as long as they belong to the same tenant.

Cross-references like these are not supported:

- From a non-multi-tenancy object to a multi-tenancy object.
- From a multi-tenancy object to another multi-tenancy object if they belong to different tenants.

### Key features

- Each tenant has a dedicated, high-performance vector index. Dedicated indexes mean faster query speeds. Instead of searching a shared index space, each tenant responds as if it was the only user on the cluster.
- Each tenant's data is isolated on a dedicated shard. This means that deletes are fast and do not affect other tenants.
- To scale out, add a new node to your cluster. Weaviate does not redistribute existing tenants, however Weaviate adds new tenants to the node with the least resource usage.

:::info Related pages
- [How-to: Manage Data | Multi-tenancy operations](../manage-data/multi-tenancy.md)
- [Multi-tenancy blog](/blog/multi-tenancy-vector-search)
:::

### Monitoring metrics

To group tenants together for monitoring, set [`PROMETHEUS_MONITORING_GROUP = true`](../config-refs/env-vars.md) in your system configuration file.

### Number of tenants per node

The number of tenants per node is limited by operating system constraints. The number of tenants cannot exceed the Linux open file limit per process.

For example, a 9-node test cluster built on `n1-standard-8` machines holds around 170k active tenants. There are 18,000 to 19,000 tenants per node.

Note that these numbers relate to active tenants only. If you [set unused tenants as `inactive`](../api/rest/schema.md#update-tenants), the open file per process limit does not apply.

### Lazy shard loading

:::info Added in `v1.23`
:::

When Weaviate starts, it loads data from all of the shards in your deployment. This process can take a long time. Prior to v1.23, you have to wait until all of the shards are loaded before you can query your data. Since every tenant is a shard, multi-tenant deployments can have reduced availability after a restart.

Lazy shard loading allows you to start working with your data sooner. After a restart, shards load in the background. If the shard you want to query is already loaded, you can get your results sooner. If the shard is not loaded yet, Weaviate prioritizes loading that shard and returns a response when it is ready.

To enable lazy shard loading, set `DISABLE_LAZY_LOAD_SHARDS = false` in your system configuration file.

### Tenant status

:::info Added in `v1.21`
:::

Tenants are `HOT` or `COLD`. Tenant status determines if Weaviate can access the shard.

| Status | State | Description |
| :-- | :-- | :-- |
|`HOT`| Active | Weaviate can read and write. |
|`COLD`| Inactive | Weaviate cannot read or write. Access attempts return an error message. |

## Related pages

For more information, see the following:

- [How-to manage data: Multi-tenancy operations](../manage-data/multi-tenancy.md)
- [References: REST API: Schema: Multi-tenancy](../api/rest/schema.md#multi-tenancy)
- [Configuration: Schema](../manage-data/collections.mdx)

## Summary

* The schema defines collections and properties.
* Collections contain data objects that are describe in JSON documents.
* Data objects can contain a vector and properties.
* Vectors come from machine learning models.
* Different collections represent different vector spaces.
* Cross-references link objects between schemas.
* Multi-tenancy isolates data for each tenant.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
