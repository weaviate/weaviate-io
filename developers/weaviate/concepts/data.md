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
- [Configuration: Schema](../manage-data/collections.mdx)
:::


## Data object nomenclature

Each data object in Weaviate belongs to a `collection` and has one or more `properties`.

Weaviate stores _data objects_ in _class-based collections_. The data objects are represented as JSON-documents. Objects normally include a vector representation that is derived from a machine learning model. The _vector_ is also called an _embedding_ or a _vector embedding_.

Each collection contains objects of the same _class_ that are all defined by a common _schema_.

### JSON documents as objects

Imagine we need to store information about the following author: Alice Munro.

The data about this author is represented in JSON like this:

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

As mentioned earlier, we can also attach `vector` representations to our data objects. The vector is an array of numbers stored under the `"vector"` property like this:

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

To generate vectors, use one of Weaviate's vectorizer [modules](./modules.md) or use your own vectorizer.

### Collections

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

:::tip
Every object stored in Weaviate has a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). The UUID guarantees uniqueness across all collections.
:::

### Cross-references

:::note Cross-references do not affect vectors
Cross-references link objects, but they do not change the vectors in either direction.
:::

If data objects are related, use cross-references to represent the relationships. Cross-references in Weaviate are like links that help you retrieve related information. Cross-references capture relationships, but they do not change the vectors of the underlying objects.

To create a reference, use a property from one collection to specify the value of a related property in the other collection.

#### Cross-reference example

For example, to represent the fact that *"Paul Krugman writes for the New York Times"*. Create a cross-reference between the author and the publication. More specifically, create a cross-reference between the `Publication` object that represents the New York Times and the `Author` object that represents Paul Krugman.

This example uses the UUID of an object in the `publication` collection to specify the `writesFor` property in an object in the `Author` collection. The `beacon` property in the `Author` collection is the `id` for the New York Times `Publication` object.

The New York Times `Publication` object looks like this:

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

The Paul Krugman `Author` object looks like this:

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

Cross-reference relationships are directional. To make the link bi-directional, update the `Publication` collection to add a ``hasAuthors` property points back to the `Author` collection.

## Weaviate Schema

Weaviate requires a data schema before you add data. You do not have to create a data schema manually, however. If you don't provide one, Weaviate generates a schema based on the incoming data.

import SchemaDef from '/_includes/definition-schema.md';

<SchemaDef/>

:::note Schema vs. Taxonomy
A Weaviate data schema is slightly different from a taxonomy. A taxonomy has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in this [blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).
:::

Schemas fulfill several roles:

1. Collections and properties are defined in schemas.
1. Every collection has its own vector space. This means that different collections can have different embeddings of the same object.
1. Schemas define cross-references that link collections, even collections that use different embeddings.
1. Schemas let you configure mModule behavior, ANN index settings, reverse indexes, and other features per collection.

For details on configuring your schema, see the [schema tutorial](../starter-guides/schema.md)) or [schema configuration](../manage-data/collections.mdx).

## Multi-tenancy

:::info Multi-tenancy availability
- Multi-tenancy added in `v1.20`
- The tenant activity status setting added in `v1.21`
:::

To separate data within a cluster, use multi-tenancy. When you configure the collections in the cluster, provide a tenant key for each `tenant`. Weaviate partitions the cluster into shards. Each shard holds data for a single tenant. Sharding has several benefits:

- Data isolation
- Fast, efficient querying
- Easy and robust setup and clean up

Starting in `v1.20`, shards are more lightweight. You can easily have 50,000, or more, active shards per node. This means that you can support 1M concurrently active tenants with just 20 or so nodes.

Starting in `v1.20.1`, you can specify tenants as active (`HOT`) or inactive (`COLD`). For more details on managing tenants, see [Multi-tenancy operations](../manage-data/multi-tenancy.md).

Multi-tenancy is especially useful when you want to store data for multiple customers, or when you want to store data for multiple projects.

### Tenancy and IDs

Each tenancy is like a namespace. Different tenants could, in theory, have objects with the same IDs. To avoid naming problems, object IDs in multi-tenant clusters combine the tenant ID and the object ID.

### Tenancy and cross-references

Multi-tenancy supports some cross-references. Cross-references like these are supported:

- From a multi-tenancy object to a non-multi-tenancy object.
- From a multi-tenancy object to another multi-tenancy object, as long as they belong to the same tenant.

You **cannot** create cross-references like these:

- From a non-multi-tenancy object to a multi-tenancy object.
- From a multi-tenancy object to another multi-tenancy object if they belong to different tenants.

### Key features

- Each tenant has a dedicated, high-performance vector index. Dedicated indexes mean faster query speeds.  as if the tenant was the only user on the cluster.
- Each tenant's data is isolated on a dedicated shard. This means deletes are fast and do not affect other tenants.
- To scale out, add a new node to your cluster. Weaviate automatically schedules new tenants on the node with the least resource usage.

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

### Lazy shard loading

:::info Added in `v1.23`
:::

When Weaviate starts up, it loads data from all of the shards in your deployment. This process can take a long time. Prior to v1.23, you have to wait until all of the shards are loaded before you can query your data. Since every tenant is a shard, multi-tenant deployments can have reduced availability after a restart.

Lazy shard loading allows you to start working with your data sooner. After a restart, shards load in the background. If the shard you want to query is already loaded, you can get your results sooner. If the shard is not loaded yet, Weaviate prioritizes loading that shard and returns a response when it is ready.

To enable lazy shard loading, set `DISABLE_LAZY_LOAD_SHARDS = false` in your system configuration file.

### Tenant status

:::info Added in `v1.21`
:::

A tenant status can be `HOT` or `COLD`. If `HOT`, the tenant's shard is active, and if `COLD`, the tenant's shard is inactive. An inactive shard is turned off to save resources, meaning Weaviate can not read from or write to the shard in that state. Any attempt to access it will result in an error, with a message that tenant is not active

### Related pages

For more information on multi-tenancy, see the followig:

- [How-to manage data: Multi-tenancy operations](../manage-data/multi-tenancy.md)
- [References: REST API: Schema: Multi-tenancy](../api/rest/schema.md#multi-tenancy)


## Summary

* Weaviate stores data objects that are represented as machine learning vectors.
* Weaviate represents data objects as JSON documents.
* Every data object can contain a vector.
* Cross-references are datatypes that link to other objects.
* Classes and properties are defined in a schema.
* Different classes represent different vector spaces.
* The schema has a class-property data structure.
* We can query using the GraphQL-interface or -in some cases- the RESTful API.
* Vectors come from machine learning models that you inference yourself or through a Weaviate module.
* You can use multi-tenancy to isolate data for each tenant.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
