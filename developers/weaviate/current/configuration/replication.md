---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Replication
intro: 
description: Learn how to set replication for your Weaviate instance.
tags: ['Weaviate', 'replication']
menu-order: 8
open-graph-type: article
toc: true
---

Weaviate instances can be replicated to increase availability, read throughput and enable zero downtime upgrades. On this page, you will learn how to set replication for your Weaviate instance.

> 💡 From v1.17, you can set the Replication Factor per class in the schema. Consistency levels are tunable in queries, which will be available from v1.18 (except for [read consistency for objects by ID](../replication-architecture/consistency.html#tunable-read-consistency), which is tunable from v1.17). 

Read more about how Replication is designed and built in Weaviate on the [Replication Architecture](../replication-architecture/index.html) pages.

## How to configure: Schema

Replication is enabled per data class in the [data schema](). This means you can set different replication factors per class in your dataset. To enable replication on a class (this is disabled by default), the replication factor has to be set. In a class in the schema, this looks like the following. `"replication": {“factor”: 3”}` can be specified per class in the schema object.

> 💡 This is an experimental feature as of v1.17 and will become more stable in the future.

```json
{
  "class": "ExampleClass",                        
  "properties": [                           
    {
      "name": "exampleProperty", 
      "dataType": [                         
        "string"
      ],
    }
  ],
  "replication": {
    "factor": 3     // Integer, default is 1. Replication Factor is the amount of copies of this class that will be stored.
  }
}
```

The data schema has a write consistency level of `ALL`, which means when you upload or update a schema, this will be sent to `ALL` nodes (via a coordinator node). The coordinator node waits for a successful acknowledgement from `ALL` nodes before sending a success message back to the client. This ensures a high consistent schema in your distributed Weaviate setup.

## How to use: Queries

When you add (write) or query (read) data, one or more replica nodes in the cluster will respond to the request. How many nodes need to send a successful response and acknowledgement to the coordinator node depends on the `consistency_level`. Available consistency levels are ONE, QUORUM (n/2+1) and ALL. Read more about consistency level [here](../replication-architecture/consistency.html).

The `consistency_level` can be specified at query time. 

> 💡In v1.17, only read queries that get data by ID have a tunable consistency level. All other queries have a consistency level of ALL. From v1.18, all write and read queries are tunable to either ONE, QUORUM or ALL.

```bash
# List all objects with a Bearer token
$ curl /v1/objects/{className}/{id}?consistency_level=ALL
```

{% include code/1.x/replication-get-object-by-id.html %}

# More Resources

{% include docs-support-links.html %}
