---
title: Replication
sidebar_position: 19
image: og/docs/configuration.jpg
# tags: ['configuration', 'operations', 'monitoring', 'observability']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::info Prerequisites
- [Concepts: Replication Architecture](../concepts/replication-architecture/index.md)
:::

Weaviate instances can be replicated to increase availability, read throughput and enable zero downtime upgrades. On this page, you will learn how to set replication for your Weaviate instance.

:::caution Note:
Starting with v1.17, you can set the Replication Factor per class in the schema. Consistency levels are tunable in queries, which will be available from v1.18 (except for [read consistency for objects by ID](../concepts/replication-architecture/consistency.md#tunable-read-consistency), which is tunable from v1.17). 
:::

For more about how replication is designed and built in Weaviate, see the [Replication Architecture](../concepts/replication-architecture/index.md) pages.

## How to configure: Schema

Replication is enabled per data class in the [data schema](./schema-configuration.md). This means you can set different replication factors per class in your dataset. To enable replication on a class (this is disabled by default), the replication factor has to be set. In a class in the schema, this looks like the following: `"replicationConfig": {"factor": 3"}` can be specified per class in the schema object.


```json
{
  "class": "ExampleClass",                        
  "properties": [                           
    {
      "name": "exampleProperty", 
      "dataType": [                         
        "string"
      ]
    }
  ],
  "replicationConfig": {
    "factor": 3   // Integer, default 1. How many copies of this class will be stored.
  }
}
```

Here's an example for all clients:

import SchemaReplication from '/_includes/code/schema.things.create.replication.mdx';

<SchemaReplication/>

When you set this replication factor in the data schema before you add data, you will have 3 replicas of the data stored. Weaviate can also handle changing this setting after you imported the data. Then the data is copied to the new replica nodes (if there are enough nodes), but note that this is experimental and will be more stable in the future.

:::caution Note:
Changing the replication factor after adding data is an **experimental feature** as of v1.17 and will become more stable in the future.
:::

The data schema has a write consistency level of `ALL`, which means when you upload or update a schema, this will be sent to `ALL` nodes (via a coordinator node). The coordinator node waits for a successful acknowledgement from `ALL` nodes before sending a success message back to the client. This ensures a highly consistent schema in your distributed Weaviate setup.


## How to use: Queries

When you add (write) or query (read) data, one or more replica nodes in the cluster will respond to the request. How many nodes need to send a successful response and acknowledgement to the coordinator node depends on the `consistency_level`. Available consistency levels are `ONE`, `QUORUM` (n/2+1) and `ALL`. Read more about consistency level [here](../concepts/replication-architecture/consistency.md).

The `consistency_level` can be specified at query time. 

:::caution Note:
In v1.17, only read queries that get data by ID have a tunable consistency level. All other queries have a consistency level of `ALL`. Starting with v1.18, all write and read queries are tunable to either `ONE`, `QUORUM` or `ALL`.
:::

```bash
# List all objects with a Bearer token
$ curl /v1/objects/{className}/{id}?consistency_level=ALL
```

import QueryReplication from '/_includes/code/replication.get.object.by.id.mdx';

<QueryReplication/>


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
