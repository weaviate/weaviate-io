---
title: Replication
sidebar_position: 60
image: og/docs/configuration.jpg
# tags: ['configuration', 'operations', 'monitoring', 'observability']
---

Weaviate instances can be replicated. Replication can improve read throughput, improve availability, and enable zero-downtime upgrades.

For more details on how replication is designed and built in Weaviate, see [Replication Architecture](../concepts/replication-architecture/index.md).

## How to configure

import RaftRFChangeWarning from '/_includes/1-25-replication-factor.mdx';

<RaftRFChangeWarning/>

Replication is disabled by default. It can be enabled per collection in the [collection configuration](../manage-data/collections.mdx#replication-settings). This means you can set different replication factors per class in your dataset.

To enable replication, you can set one or both of the following:
- `REPLICATION_MINIMUM_FACTOR` environment variable for the entire Weaviate instance, or
- `replicationFactor` parameter for a collection.

### Weaviate-wide minimum replication factor

The `REPLICATION_MINIMUM_FACTOR` environment variable sets the minimum replication factor for all collections in the Weaviate instance.

If you set the [replication factor for a collection](#replication-factor-for-a-collection), the collection's replication factor overrides the minimum replication factor.

### Replication factor for a collection

import SchemaReplication from '/_includes/code/schema.things.create.replication.mdx';

<SchemaReplication/>

In this example, there are three replicas. If you set the replication factor before you import data, all of the data is replicated three times.

The replication factor can be modified after you add data to a collection. If you modify the replication factor afterwards, new data is copied across the new and pre-existing replica nodes.

The example data schema has a [write consistency](../concepts/replication-architecture/consistency.md#tunable-write-consistency) level of `ALL`. When you upload or update a schema, the changes are sent to `ALL` nodes (via a coordinator node). The coordinator node waits for a successful acknowledgement from `ALL` nodes before sending a success message back to the client. This ensures a highly consistent schema in your distributed Weaviate setup.

## Data consistency

When Weaviate detects inconsistent data across nodes, it attempts to repair the out of sync data.

Starting in v1.26, Weaviate adds [async replication](../concepts/replication-architecture/consistency.md#async-replication) to proactively detect inconsistencies. In earlier versions, Weaviate uses a [repair-on-read](../concepts/replication-architecture/consistency.md#repair-on-read) strategy to repair inconsistencies at read time.

Repair-on-read is automatic. To activate async replication, set `asyncEnabled` to true in the `replicationConfig` section of your collection definition.

import ReplicationConfigWithAsyncRepair from '/_includes/code/configuration/replication-consistency.mdx';

<ReplicationConfigWithAsyncRepair />

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

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
