---
title: Horizontal Scaling
sidebar_position: 30
image: og/docs/concepts.jpg
# tags: ['architecture', 'horizontal scaling', 'cluster', 'replication', 'sharding']
---

Weaviate can be scaled horizontally by being run on a set of multiple nodes in a cluster. This section lays out various ways in which Weaviate can be scaled, as well as factors to consider while scaling, and Weaviate's architecture in relation to horizontal scaling.

## Motivation to scale Weaviate
Generally there are (at least) three distinct motivations to scale out horizontally which all will lead to different setups.

### Motivation 1: Maximum Dataset Size
Due to the [memory footprint of an HNSW graph](./resources.md#the-role-of-memory) it may be desirable to spread a dataset across multiple servers ("nodes"). In such a setup, a single class index is composed of multiple shards and shards are spread across servers.

Weaviate does the required orchestration at import and query time fully automatically. The only adjustment required is to specify the desired shard count. See [Sharding vs Replication](#sharding-vs-replication) below for trade-offs involved when running multiple shards.

**Solution: Sharding across multiple nodes in a cluster**

:::note
The ability to shard across a cluster was added in Weaviate `v1.8.0`.
:::

### Motivation 2: Higher Query Throughput
When you receive more queries than a single Weaviate node can handle, it is desirable to add more Weaviate nodes which can help in responding to your users' queries.

Instead of sharding across multiple nodes, you can replicate (the same data) across multiple nodes. This process also happens fully automatically and you only need to specify the desired replication factor. Sharding and replication can also be combined.

**Solution: Replicate your classes across multiple nodes in a cluster**

### Motivation 3: High Availability

When serving critical loads with Weaviate, it may be desirable to be able to keep serving queries even if a node fails completely. Such a failure could be either due to a software or OS-level crash or even a hardware issue. Other than unexpected crashes, a highly available setup can also tolerate zero-downtime updates and other maintenance tasks.

To run a highly available setup, classes must be replicated among multiple nodes.

**Solution: Replicate your classes across multiple nodes in a cluster**

## Sharding vs Replication
The motivation sections above outline when it is desirable to shard your classes across multiple nodes and when it is desirable to replicate your classes - or both. This section highlights the implications of a sharded and/or replicated setup.

:::note
All of the scenarios below assume that - as sharding or replication is increased - the cluster size is adapted accordingly. If the number of shards or the replication factor is lower than the number of nodes in the cluster, the advantages no longer apply.*
:::

### Advantages when increasing sharding
* Run larger datasets
* Speed up imports.

To use multiple CPUs efficiently, create multiple shards for your collection. For the fastest imports, create multiple shards even on a single node.

### Disadvantages when increasing sharding
* Query throughput does not improve when adding more sharded nodes

### Advantages when increasing replication
* System becomes highly available
* Increased replication leads to near-linearly increased query throughput

### Disadvantages when increasing replication
* Import speed does not improve when adding more replicated nodes

## Sharding Keys ("Partitioning Keys")
Weaviate uses specific characteristics of an object to decide which shard it belongs to. As of `v1.8.0`, a sharding key is always the object's UUID. The sharding algorithm is a 64bit Murmur-3 hash. Other properties and other algorithms for sharding may be added in the future.

## Resharding

Weaviate uses a virtual shard system to assign objects to shards. This makes it more efficient to re-shard, as minimal data movement occurs when re-sharding. However, due to the HNSW index, resharding is still a very costly process and should be used rarely. The cost of resharding is roughly that of an initial import with regards to the amount of data that needs to be moved.

Example - assume the following scenario: A class is comprised of 4 shards and taking 60 minutes to import all data. When changing the sharding count to 5, each shard will roughly transfer 20% of its data to the new shard. This is equivalent to an import of 20% of the dataset, so the expected time for this process would be ~12 minutes.

:::note
The groundwork to be able to re-shard has been laid by using Weaviate's Virtual shard system. Re-sharding however is not yet implemented and not currently prioritized. See Weaviate's [Architectural Roadmap](/developers/weaviate/roadmap/index.md).
:::

## Node Discovery

Nodes in a cluster use a gossip-like protocol through [Hashicorp's Memberlist](https://github.com/hashicorp/memberlist) to communicate node state and failure scenarios.

Weaviate - especially when running as a cluster - is optimized to run on Kubernetes. The [Weaviate Helm chart](/developers/weaviate/installation/kubernetes.md#weaviate-helm-chart) makes use of a `StatefulSet` and a headless `Service` that automatically configures node discovery. All you have to do is specify the desired node count.

## Node affinity of shards and/or replication shards

Weaviate tries to select the node with the most available disk space.

This only applies when creating a new class, rather than when adding more data to an existing single class.

<details>
  <summary>Pre-<code>v1.18.1</code> behavior</summary>

In versions `v1.8.0`-`v1.18.0`, users could not specify the node-affinity of a specific shard or replication shard.

Shards were assigned to 'live' nodes in a round-robin fashion starting with a random node.

</details>

## Consistency and current limitations

* Changes to the schema are strongly consistent across nodes, whereas changes to data has a tunable consistency.
* Starting with `v1.25.0`, Weaviate adopts the [Raft consensus algorithm](https://raft.github.io/) to ensure strong consistency for schema changes. This brings an additional benefit in that concurrent schema changes are now supported.<br/>If you are a Kubernetes user, see the [`1.25 migration guide`](/developers/weaviate/more-resources/migration/weaviate-1-25.md) before you upgrade. To upgrade, you have to delete your existing StatefulSet.
* As of `v1.8.0`, the process of broadcasting schema changes across the cluster uses a form of two-phase transaction that as of now cannot tolerate node failures during the lifetime of the transaction.
* As of `v1.8.0`, replication is currently under development. ([See Roadmap](/developers/weaviate/roadmap/index.md)).
* As of `v1.8.0`, dynamically scaling a cluster is not fully supported yet. New nodes can be added to an existing cluster, however it does not affect the ownership of shards. Existing nodes can not yet be removed if data is present, as shards are not yet being moved to other nodes prior to a removal of a node. ([See Roadmap](/developers/weaviate/roadmap/index.md)).



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
