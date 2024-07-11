---
title: Consistency
sidebar_position: 4
image: og/docs/concepts.jpg
# tags: ['architecture']
---

Data consistency is a property of distributed databases. Data is consistent when the data that is distributed across multiple nodes is the same on all of the nodes. Data consistency is an important consideration for multi-node clusters.

In Weaviate data consistency has two components, schema consistency and data object consistency.

The schema defines the structure, or the blueprint, of the data. Weaviate uses a strong consistency protocol and the [Raft](https://raft.github.io/) consensus algorithm for schema replication.

Data objects, on the other hand, are eventually consistent. This means all nodes eventually contain the same data, but at a given point in time some nodes may be out of sync. Unlike Raft, Weaviate uses a leaderless design with eventual consistency guarantees for data replication.

The different designs reflect the trade-off between consistency and availability that is described in the [CAP Theorem](./index.md#cap-theorem). In Weaviate, data consistency is tunable, so it's up to you how you make the trade-off between A and C.

The strength of consistency can be determined by applying the following conditions:
* If r + w > n, then the system is strongly consistent.
    * r is the consistency level of read operations
    * w is the consistency level of write operations
    * n is the replication factor (number of replicas)
* If r + w <= n, then eventual consistency is the best that can be reached in this scenario.

## Schema

The data schema in Weaviate is **strongly consistent**. Once you use Weaviate, the data schema is rarely changed. From a user's perspective, it is acceptable that the latency for updating a schema is a bit higher than querying and updating data. By a 'slow' schema update, Weaviate can ensure consistency because it disallows multiple schema changes at the same time.

### Post-`v1.25` schema consensus algorithm

From `v1.25`, Weaviate uses the [Raft](https://raft.github.io/) consensus algorithm for schema replication. Raft is a consensus algorithm with a strong consistency model, and an elected leader node that coordinates replication across the cluster using a log-based approach.

As a result, each request that changes the schema will be sent to the leader node. The leader node will apply the change to its logs, then propagate the changes to the follower nodes. Once a quorum of nodes has acknowledged the schema change, the leader node will commit the change and confirm it to the client.

This architecture ensures that schema changes are consistent across the cluster, even in the event of (a minority of) node failures.

### Pre-`v1.25` schema consensus algorithm

A schema update is done via a [Distributed Transaction](https://en.wikipedia.org/wiki/Distributed_transaction) algorithm. This is a set of operations that is done across databases on different nodes in the distributed network. Weaviate uses a [two-phase commit (2PC)](https://en.wikipedia.org/wiki/Two-phase_commit_protocol) protocol, which replicates the schema updates in a short period of time (milliseconds).

A clean (without fails) execution has two phases:
1. The commit-request phase (or voting phase), in which a coordinator node asks each node whether they are able to receive and process the update.
2. The commit phase, in which the coordinator commits the changes to the nodes.

## Data objects

Data objects in Weaviate have **eventual consistency**, which means that all nodes will eventually contain the most updated data if the data is not updated for a while. It might happen that after a data update, not all nodes are updated yet, but there is a guarantee that all nodes will be up-to-date after some time. Weaviate uses two-phase commits for objects as well, adjusted for the consistency level. For example for a `QUORUM` write (see below), if there are 5 nodes, 3 requests will be sent out, each of them using a 2-phase commit under the hood.

Eventual consistency provides BASE semantics:

* **Basically available**: reading and writing operations are as available as possible
* **Soft-state**: there are no consistency guarantees since updates might not yet have converged
* **Eventually consistent**: if the system functions long enough, after some writes, all nodes will be consistent.

Weaviate uses eventual consistency to help ensure high availability. Read and write consistency are tunable, so you can tradeoff between availability and consistency to match your application needs.

*The animation below is an example of how a write or a read is performed with Weaviate with a replication factor of 3 and 8 nodes. The blue node acts as coordinator node. The consistency level is set to `QUORUM`, so the coordinator node only waits for two out of three responses before sending the result back to the client.*

<p align="center"><img src="/img/docs/replication-architecture/replication-quorum-animation.gif" alt="Write consistency QUORUM" width="75%"/></p>

### Tunable write consistency

Adding or changing data objects are **write** operations.

:::note
Write operations are tunable starting with Weaviate v1.18, to `ONE`, `QUORUM` (default) or `ALL`. In v1.17, write operations are always set to `ALL` (highest consistency).
:::

The main reason for introducing configurable write consistency in v1.18 is because that is also when automatic repairs are introduced. A write will always be written to n (replication factor) nodes, regardless of the chosen consistency level. The coordinator node however waits for acknowledgements from `ONE`, `QUORUM` or `ALL` nodes before it returns. To guarantee that a write is applied everywhere without the availability of repairs on read requests, write consistency is set to `ALL` for now. Possible settings in v1.18+ are:
* **ONE** - a write must receive an acknowledgement from at least one replica node. This is the fastest (most available), but least consistent option.
* **QUORUM** - a write must receive an acknowledgement from at least `QUORUM` replica nodes. `QUORUM` is calculated as _n / 2 + 1_, where _n_ is the number of replicas (replication factor). For example, using a replication factor of 6, the quorum is 4, which means the cluster can tolerate 2 replicas down.
* **ALL** - a write must receive an acknowledgement from all replica nodes. This is the most consistent, but 'slowest' (least available) option.


*Figure below: a replicated Weaviate setup with write consistency of ONE. There are 8 nodes in total out of which 3 replicas.*

<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ONE.png" alt="Write consistency ONE" width="60%"/></p>

*Figure below: a replicated Weaviate setup with Write Consistency of `QUORUM` (n/2+1). There are 8 nodes in total, out of which 3 replicas.*


<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-QUORUM.png" alt="Write consistency QUORUM" width="60%"/></p>

*Figure below: a replicated Weaviate setup with Write Consistency of `ALL`. There are 8 nodes in total, out of which 3 replicas.*

<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ALL.png" alt="Write consistency ALL" width="60%"/></p>


### Tunable read consistency

Read operations are GET requests to data objects in Weaviate. Like write, read consistency is tunable, to `ONE`, `QUORUM` (default) or `ALL`.

:::note
Prior to `v1.18`, read consistency was tunable only for [requests that obtained an object by id](../../manage-data/read.mdx#get-an-object-by-id), and all other read requests had a consistency of `ALL`.
:::

The following consistency levels are applicable to most read operations:

- Starting with `v1.18`, consistency levels are applicable to REST endpoint operations.
- Starting with `v1.19`, consistency levels are applicable to GraphQL `Get` requests.

* **ONE** - a read response must be returned by at least one replica. This is the fastest (most available), but least consistent option.
* **QUORUM** - a response must be returned by `QUORUM` amount of replica nodes. `QUORUM` is calculated as _n / 2 + 1_, where _n_ is the number of replicas (replication factor). For example, using a replication factor of 6, the quorum is 4, which means the cluster can tolerate 2 replicas down.
* **ALL** - a read response must be returned by all replicas. The read operation will fail if at least one replica fails to respond. This is the most consistent, but 'slowest' (least available) option.

Examples:
* **ONE**<br/>
  In a single datacenter with a replication factor of 3 and a read consistency level of ONE, the coordinator node will wait for a response from one replica node.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ONE.png" alt="Write consistency ONE" width="60%"/></p>

* **QUORUM**<br/>
  In a single datacenter with a replication factor of 3 and a read consistency level of `QUORUM`, the coordinator node will wait for n / 2 + 1 = 3 / 2 + 1 = 2 replicas nodes to return a response.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-QUORUM.png" alt="Write consistency QUORUM" width="60%"/></p>

* **ALL**<br/>
  In a single datacenter with a replication factor of 3 and a read consistency level of `ALL`, the coordinator node will wait for all 3 replicas nodes to return a response.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ALL.png" alt="Write consistency ALL" width="60%"/></p>

### Tunable consistency strategies

Depending on the desired tradeoff between consistency and speed, below are three common consistency level pairings for write / read operations. These are _minimum_ requirements that guarantee eventually consistent data:
* `QUORUM` / `QUORUM` => balanced write and read latency
* `ONE` / `ALL` => fast write and slow read (optimized for write)
* `ALL` / `ONE` => slow write and fast read (optimized for read)

## Repairs

import RepairIntro from '/_includes/configuration/consistency-repair-intro.mdx';

<RepairIntro />

### Repair-on-read

:::info Added in `v1.18`

:::

If your read consistency is set to `All` or `Quorum`, the read coordinator can detect if the nodes in your cluster return different responses. When the coordinator detects a difference, it can attempt to repair the inconsistency.

| Problem | Action |
| :- | :- |
| Object never existed on some node. | Propagate the object to the noes where it is missing. |
| Object is out of date. | Update the object on stale nodes. |
| Object was deleted on some replicas. | Returns an error. Deletion may have failed, or the object may have been partially recreated. |

When Weaviate resyncs data, the repair process depends on the collection's write consistency guarantees.

| Write consistency level | Read consistency level | Action |
| :- | :- |
| `ONE` | `ALL` | Weaviate has to verify all nodes to guarantee repair. |
| `QUORUM` | `QUORUM` or ALL` | Weaviate attempts to fix the sync issues. |
| `ALL` | - | This situation should not occur. The write should have failed. |

Repairs only happen on read, so they do not create a lot of background overhead. However, an inconsistent state may persist for a long time until the nodes are read. While nodes are in an inconsistent state, searches may be unreliable and consistency `ONE` reads may return stale data.

### Asynchronous repair

:::info Added in `v1.26`

:::

Asynchronous repair runs in the background. It uses a Merkle tree algorithm to monitor and compare the state of nodes within a cluster. If the algorithm identifies an inconsistency, it resyncs the data on the inconsistent node.

Repair-on-read works well with one or two isolated repairs. Asynchronous repair is more effective in situations where there are many inconsistencies. If an offline node misses updates, for example, asynchronous repair quickly restores consistency when the node returns to service.

Asynchronous repair supplements repair-on-read. If node goes out of sync between asynchronous repair checks, repair-on-read catches the problem when consistency is `QUORUM` or `ALL`.

To activate asynchronous repair, set the `asyncEnabled` value to true in the `replicationConfig` section of your collection definition.

## Related pages
- [API References | GraphQL | Get | Consistency Levels](../../api/graphql/get.md#consistency-levels)
- [API References | REST | Objects](/developers/weaviate/api/rest#tag/objects)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
