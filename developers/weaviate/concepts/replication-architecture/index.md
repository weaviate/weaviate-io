---
title: Replication Architecture
sidebar_position: 0
image: og/docs/concepts.jpg
# tags: ['architecture']
---

:::info Added in `v1.17`
:::

Weaviate can automatically replicate data across nodes in the background in a cluster with multiple server nodes. This enables a variety of [use cases](./motivation.md). For example, if a node goes down, another node can shoulder the load without loss of availability or data. Database replication improves reliability, scalability, and/or performance.

The user can control trade-offs between consistency and availability through [tunable consistency](./consistency.md).

Weaviate adopts two different replication architectures for schema consistency and data consistency.

- **Schema replication** is strongly consistent, meaning that schema changes are guaranteed to be consistent across all nodes. As of Weaviate `v1.25`, schema changes use the [Raft](https://raft.github.io/) consensus algorithm, which is a leader-based consensus algorithm.
- **Data replication** is tunable, meaning that data changes are not guaranteed to be consistent across all nodes at all times. Data replication uses a leaderless design, where all nodes are equal in status.

Note that regardless of whether data is replicated, the schema is always replicated across all nodes.

In this Replication Architecture section, you will find information about:

* **General Concepts**, on this page
  * What is replication?
  * CAP Theorem
  * Why replication for Weaviate?
  * Replication vs. Sharding
  * How does replication work in Weaviate?
  * Roadmap


* **[Use Cases](./motivation.md)**
  * Motivation
  * High Availability
  * Increased (Read) Throughput
  * Zero Downtime Upgrades
  * Regional Proximity


* **[Philosophy](./philosophy.md)**
  * Typical Weaviate use cases
  * Reasons for a leaderless architecture
  * Gradual rollout
  * Large-scale testing


* **[Cluster Architecture](./cluster-architecture.md)**
  * Leaderless design
  * Replication Factor
  * Write and Read operations


* **[Consistency](./consistency.md)**
  * Schema
  * Data objects
  * Repairs


* **[Multi-DataCenter](./multi-dc.md)**
  * Regional Proximity

<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-QUORUM.png" alt="Read consistency QUORUM" width="75%"/></p>

## What is replication?

Database replication refers to keeping a copy of the same data point on multiple nodes of a cluster, which in turn creates a distributed database. A distributed database consists of multiple nodes, all of which can contain a copy of the data. So if one node (server) goes down, users can still access data from another node. In addition, query throughput can be improved with replication. In short, a distributed database is more reliable and can achieve higher performance than a centralized system.

## CAP Theorem

The primary goal of introducing replication is to improve reliability. [Eric Brewer](https://en.wikipedia.org/wiki/Eric_Brewer_(scientist)) states that there are some limits on reliability for distributed databases, described by the [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem). The CAP theorem states that a distributed database can only provide two of the following three guarantees:
* **Consistency (C)** - Every database read receives the most recent write after creation or modification (or an error).
* **Availability (A)** - Every request receives a non-error response all the time, without the guarantee that it contains the most recent write.
* **Partition tolerance (P)** - The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

<p align="center"><img src="/img/docs/replication-architecture/repliction-cap.png" alt="CAP Theorem" width="60%"/></p>

Ideally you want a database, like Weaviate, to have the highest reliability as possible, but this is limited by the tradeoff between consistency, availability and partition tolerance. Only two out of three concepts can be guaranteed. Since by definition a cluster is a distributed system in which network partitions are present, only two options are left for designing the system: **consistency (C)** or **availability (A)**. When you prioritize **consistency** over availability, the database will return an error or timeout when it cannot be guaranteed that the data is up to date due to network partitioning. When prioritizing **availability** over consistency, the database will always process the query and try to return the most recent version of data even if it cannot guarantee it is up to date due to network partitioning.

C over A is preferred when the database contains critical data, such as transactional bank account data. For transactional data, you want the data to always be consistent (otherwise your bank balance is not guaranteed to be correct if you make transactions while some nodes (e.g. ATMs) are down).
When a database involves less critical data, A over C can be preferred. An example can be a messaging service, where you can tolerate showing some old data but the application should be highly available and handle large amounts of writes with minimal latency. Weaviate follows this latter design, since Weaviate typically deals with less critical data and  is used for approximate search as a secondary database in use cases with more critical data. More about this design decision in [Philosophy](./philosophy.md).

## Why replication for Weaviate?

Weaviate is a database which must provide reliable answers to users' requests. As discussed above, database reliability consists of various parts. Below are Weaviate use cases in which replication is desired. For detailed information, visit the [Replication Use Cases (Motivation) page](./motivation.md).

1. **High availability (redundancy)**<br/>
  With a distributed (replicated) database structure, service will not be interrupted if one server node goes down. The database can still be available, read queries will just be (unnoticeably) redirected to an available node.
2. **Increased (read) throughput**<br/>
  Adding extra server nodes to your database setup means that the throughput scales with it. The more server nodes, the more users (read operations) the system will be able to handle. When reading is set to a low consistency level, then scaling the replication factor (i.e. how many database server nodes) increases the throughput linearly.
3. **Zero downtime upgrades**<br/>
  Without replication, there is a window of downtime when you update a Weaviate instance. This is because the single node needs to stop, update and restart before it's ready to serve again. With replication, upgrades are done using a rolling update, in which at most one node is unavailable at any point in time while the other nodes can still serve traffic.
4. **Regional proximity**<br/>
  When users are located in different regional areas (e.g. Iceland and Australia as extreme examples), you cannot ensure low latency for all users due to the physical distance between the database server and the users. With a distributed database, you can place nodes in different local regions to decrease this latency. This depends on the Multi-Datacenter feature of replication.


## Replication vs. Sharding

Replication is not the same as [sharding](../cluster.md). Sharding refers to horizontal scaling, and was introduced to Weaviate in v1.8.

* **Replication** copies the data to different server nodes. For Weaviate, this increases data availability and provides redundancy in case a single node fails. Query throughput can be improved with replication.
* **Sharding** handles horizontal scaling across servers by dividing the data and sending the pieces of data (shards) to multiple replica sets. The data is thus divided, and all shards together form the entire set of data. You can use sharding with Weaviate to run larger datasets and speed up imports.

<p align="center"><img src="/img/docs/replication-architecture/replication-replication-vs-sharding.png" alt="Replication vs Sharding" width="60%"/></p>

Replication and sharding can be combined in a setup, to improve throughput and availability as well as import speed and support for large datasets. For example, you can have 3 replicas of the database and shards set to 3, which means you have 9 shards in total, where each server node holds 3 different shards.

## How does replication work in Weaviate?

### Schema replication

Weaviate’s data schema changes are strongly consistent, since this is rarely changed, but critical.

Prior to Weaviate `v1.25`, each schema change was recorded via a distributed transaction with a two-phase commit. This is a synchronous process, which means that the schema change is only committed when all nodes have acknowledged the change.

From Weaviate `v1.25`, schema changes are committed using the Raft consensus algorithm. This is a leader-based consensus algorithm, where an `elected` leader node is responsible for committing and replicating schema changes. This has two key advantages. One is robustness to individual node downtime, as a schema change can still be committed when a minority of nodes are down. The other is that concurrent schema changes can be handled, which was not possible with the two-phase commit architecture.

### Data replication

Weaviate’s implementation of data replication is inspired by other databases like Cassandra. Availability is favored over Consistency. Weaviate's data replication uses a leaderless design, which means there are no primary and secondary nodes. When writing and reading data, the client contacts one or more nodes. A load balancer exists between the user and the nodes, so the user doesn't know which node they are talking to (Weaviate will forward internally if a user is requesting a wrong node).

The number of nodes that need to acknowledge the read or write (from v1.18) operation is tunable, to `ONE`, `QUORUM` (n/2+1) or `ALL`. When write operations are configured to `ALL`, the database works synchronously. If write is not set to `ALL` (possible from v1.18), writing data is asynchronous from the user's perspective.

The number of replicas doesn't have to match the number of nodes (cluster size). It is possible to split data in Weaviate based on collections. Note that this is [different from Sharding](#replication-vs-sharding).

Read more about how replication works in Weaviate in [Philosophy](./philosophy.md), [Cluster Architecture](./cluster-architecture.md) and [Consistency](./consistency.md).

## How do I enable replication in Weaviate?

See the [Replication Usage page](/developers/weaviate/configuration/replication.md). You can enable replication at the collection level in the data schema of your Weaviate instance. During querying, you can specify the desired consistency level.

## Roadmap

* Not scheduled yet
  * Multi-Datacenter replication (you can upvote this feature [here](https://github.com/weaviate/weaviate/issues/2436))


## Related pages
- [Configuration: Replication](../../configuration/replication.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
