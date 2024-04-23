---
title: Replication
sidebar_position: 60
image: og/docs/configuration.jpg
# tags: ['configuration', 'operations', 'monitoring', 'observability']
---

Weaviate instances can be replicated to increase availability and read throughput, and to enable zero-downtime upgrades. On this page, you will learn how to set replication for your Weaviate instance.

For more about how replication is designed and built in Weaviate, see the [Replication Architecture](../concepts/replication-architecture/index.md) pages.

## How to configure

Replication is disabled by default and can be enabled per data class in the [collection configuration](../manage-data/collections.mdx#replication-settings). This means you can set different replication factors per class in your dataset. To enable replication on a class, the replication factor has to be set, which looks like the following:


```yaml
{
  "class": "ExampleClass",
  "properties": [
    {
      "name": "exampleProperty",
      "dataType": [
        "text"
      ]
    }
  ],
  # highlight-start
  "replicationConfig": {
    "factor": 3   # Integer, default 1. How many copies of this class will be stored.
  }
  # highlight-end
}
```

Here's an example for all clients:

import SchemaReplication from '/_includes/code/schema.things.create.replication.mdx';

<SchemaReplication/>

When you set this replication factor in the data schema before you add data, you will have 3 replicas of the data stored. Weaviate can also handle changing this setting after you imported the data. Then the data is copied to the new replica nodes (if there are enough nodes), but note that this is experimental and will be more stable in the future.

:::caution Note:
Changing the replication factor after adding data is an **experimental feature** as of v1.17 and will become more stable in the future.
:::

The data schema has a [write consistency level](../concepts/replication-architecture/consistency.md#tunable-write-consistency) of `ALL`, which means when you upload or update a schema, this will be sent to `ALL` nodes (via a coordinator node). The coordinator node waits for a successful acknowledgement from `ALL` nodes before sending a success message back to the client. This ensures a highly consistent schema in your distributed Weaviate setup.


## How to use: Queries

When you add (write) or query (read) data, one or more replica nodes in the cluster will respond to the request. How many nodes need to send a successful response and acknowledgement to the coordinator node depends on the `consistency_level`. Available [consistency levels](../concepts/replication-architecture/consistency.md) are `ONE`, `QUORUM` (replication_factor / 2 + 1) and `ALL`.

The `consistency_level` can be specified at query time:

```bash
# Get an object by ID, with consistency level ONE
curl "http://localhost:8080/v1/objects/{ClassName}/{id}?consistency_level=ONE"
```

:::note
In v1.17, only [read queries that get data by ID](../manage-data/read.mdx#get-an-object-by-id) had a tunable consistency level. All other object-specific REST endpoints (read or write) used the consistency level `ALL`. Starting with v1.18, all write and read queries are tunable to either `ONE`, `QUORUM` (default) or `ALL`. GraphQL endpoints use the consistency level `ONE` (in both versions).
:::

import QueryReplication from '/_includes/code/replication.get.object.by.id.mdx';

<QueryReplication/>

## Related pages
- [Concepts: Replication Architecture](../concepts/replication-architecture/index.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
