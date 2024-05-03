---
title: Consistency
sidebar_position: 4
image: og/docs/concepts.jpg
# tags: ['architecture']
---

Data consistency is a property of a database that refers to whether data in different nodes do or do not match.

Schema consistency is extremely important, as the schema defines the structure, or the blueprint, of the data. For this reason, Weaviate uses a strong consistency protocol and RAFT consensus algorithm for schema replication.

Data objects, on the other hand, are eventually consistent, which means that all nodes will eventually contain the most updated data if the data is not updated for a while. Weaviate uses a leaderless design with eventual consistency for data replication.

This difference reflects the trade-off inherent in consistency and availability, as described in the [CAP Theorem](./index.md#cap-theorem). In Weaviate, data consistency is tunable, so it's up to you how you make the trade-off between A and C.

The strength of consistency can be determined by applying the following conditions:
* If r + w > n, then the system is strongly consistent.
    * r is the consistency level of read operations
    * w is the consistency level of write operations
    * n is the replication factor (number of replicas)
* If r + w <= n, then eventual consistency is the best that can be reached in this scenario.


## Schema

The data schema in Weaviate is **strongly consistent**. Once you use Weaviate, the data schema is rarely changed. From a user's perspective, it is acceptable that the latency for updating a schema is a bit higher than querying and updating data. By a 'slow' schema update, Weaviate can ensure consistency because it disallows multiple schema changes at the same time.

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

Eventual consistency is chosen over strong consistency, to ensure high availability. Nevertheless, write and read consistency are tunable, so you have some influence on the tradeoff between availability and consistency.

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

Repairs can be executed by Weaviate in case of a discovered inconsistency. A scenario where a repair could be necessary is the following: The user writes with a consistency level of `ONE`. The node dies before it can contact some of the other nodes. The node comes back up with the latest data. Some other nodes may now be out of sync and need to be repaired.

Repairs happen in the background, for example when a read operation is done ("repair-on-read"), using a "last write wins" policy for conflict resolution.

When the replication coordinator node receives different versions of objects for a read request from the nodes in the replica set, that means that at least one node has old (stale) objects. The repair-on-read feature means that the coordinator node will update the affected node(s) with the latest version of the object(s). If a node was lacking an object entirely (e.g. because a create request was only handled by a subset of the nodes due to a network partition), the object will be replicated on that node.

Consider a scenario in which a request to delete objects was only handled by a subset of nodes in the replica set. On the next read that involves such a deleted object, the replication coordinator may determine that some nodes are missing that object - i.e. it doesn’t exist on all replicas. `v1.18` introduces changes that enable the replication coordinator to determine the reason why an object was not found (i.e. it was deleted, or it never existed), along with the object itself. Thus, the coordinator can determine if the object:
* never existed in the first place (so it should be propagated to the other nodes), or
* was deleted from some replicas but still exists on others. In this latter case, the coordinator returns an error because it doesn’t know if the object has been created again after it was deleted, which would lead to propagating the deletion to cause data loss.

An object that never existed will be propagated to the other nodes only if the object was queried with a _high enough_ consistency level, vs. the write consistency that was used to write the object:
* if write was `QUORUM`, the read consistency level can be >= `QUORUM`
* if the write was `ONE`, the object must be read with `ALL` to guarantee repair. This is because if only `ONE` node received the write request, then a `QUORUM` read request might only hit nodes that don't have the object, while an `ALL` request will reach that node as well.


## Related pages
- [API References | GraphQL | Get | Consistency Levels](../../api/graphql/get.md#consistency-levels)
- [API References | REST | Objects](/developers/weaviate/api/rest#tag/objects)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
