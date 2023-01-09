---
title: Consistency
sidebar_position: 4
# layout: layout-documentation
# solution: weaviate
# sub-menu: Architecture
# title: Architecture
# description: Architecture Overview
# tags: ['architecture']
# sidebar_position: 0
# open-graph-type: article
# toc: false
---
import Badges from '/_includes/badges.mdx';

<Badges/>

Data consistency is a property of a database that refers to whether data in different nodes do or do not match. In Weaviate, availability is generally preferred over strong consistency. This doesn't mean that we don't pay attention to consistency at all. Schema and data consistency is important to keep as high as possible. As captured by the CAP Theorem, consistency and availability are a trade-off. In Weaviate, data consistency is tunable, so it's up to you how you make the trade-off between A and C. 

Schema consistency is not tunable, but set to a strong consistency protocol. 

The strength of consistency can be determined by applying the following conditions:
* If r + w > n, then the system is strongly consistent.
    * r is the consistency level of read operations
    * w is the consistency level of write operations
    * n is the replication factor (number of replicas)
* If r + w <= n, then eventual consistency is the best that can be reached in this scenario. 


## Schema

The data schema in Weaviate is **strongly consistent**. Once you use Weaviate, the data schema is rarely changed. From a user's perspective, it is acceptable that the latency for updating a schema is a bit higher than querying and updating data. By a 'slow' schema update, Weaviate can ensure consistency because it disallows multiple schema changes at the same time. 

A schema update is done via a [Distributed Transaction](https://en.wikipedia.org/wiki/Distributed_transaction) algorithm**.** This is a set of operations that is done across databases on different nodes in the distributed network. Weaviate uses a [two-phase commit (2PC)](https://en.wikipedia.org/wiki/Two-phase_commit_protocol) protocol, which updates schema in a short period of time (milliseconds). 

A clean (without fails) execution has two phases:
1. The commit-request phase (or voting phase), in which a coordinator node asks each node whether they are able to receive and process the update.
2. The commit phase, in which the coordinator commits the changes to the nodes.


## Data objects 

Data objects in Weaviate have **eventual consistency**, which means that all nodes will eventually contain the most updated data if the data is not updated for a while. It might happen that after a data update, not all nodes are updated yet, but there is a guarantee that all nodes will be up to date after some time. Eventual consistency provides BASE semantics: 

* **Basically available**: reading and writing operations are as available as possible
* **Soft-state**: there are no consistency guarantees since updates might not yet have converged
* **Eventually consistent**: if the system functions long enough after some writes, all nodes will be consistent. 

Eventual consistency is chosen over strong consistency, to ensure high availability. Nevertheless, write and read consistency are tunable, so you have some influence on the tradeoff between availability and consistency. 

*The GIF below is an example of how a write or a read is performed with Weaviate with a replication factor of 3 and 8 nodes. The blue node acts as coordinator node. The consistency level is set to QUORUM, so the coordinator node only waits for two out of three responses before sending the result back to the client.*

<p align="center"><img src="/img/docs/replication-architecture/replication-quorum-animation.gif" alt="Write consistency QUORUM" width="75%"/></p>

### Tunable Write Consistency

Adding or changing data objects are **write** operations.  

> 💡 Write operations are tunable from Weaviate v1.18, to ONE, QUORUM or ALL. In v1.17, write operations are always set to ALL (highest consistency). 

The main reason for introducing configurable write consistency in v1.18 is because that is also when automatic repairs are introduced. A write will always be written to n (replication factor) nodes, regardless of the chosen consistency level. The coordinator node however waits for acknowledgements from ONE, QUORUM or ALL nodes before it returns. To guarantee that a write is applied everywhere without the availability of repairs on read requests, write consistency is set to ALL for now. Possible settings from v1.18 are:
* **ONE** - a write must receive an acknowledgement from at least one replica node. This is the fastest (most available), but least consistent option. 
* **QUORUM** - a write must receive an acknowledgement from at least QUORUM replica nodes. QUORUM is calculated by _n / 2 + 1_, where _n_ is the number of replicas (replication factor). For example, using a replication factor of 6, the quorum is 4, which means the cluster can tolerate 2 replicas down.
* **ALL** - a write must receive an acknowledgement from all replica nodes. This is the most consistent, but 'slowest' (least available) option.


*Figure below: A replicated Weaviate setup with Write Consistency of ONE, there are 8 nodes in total out of which 3 replicas.*

<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ONE.png" alt="Write consistency ONE" width="60%"/></p>

*Figure below: A replicated Weaviate setup with Write Consistency of QUORUM (n/2+1), there are 8 nodes in total out of which 3 replicas.*


<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-QUORUM.png" alt="Write consistency QUORUM" width="60%"/></p>

*Figure below: A replicated Weaviate setup with Write Consistency of ALL, there are 8 nodes in total out of which 3 replicas.*

<p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ALL.png" alt="Write consistency ALL" width="60%"/></p>


### Tunable Read Consistency

Read operations are GET queries to data objects in Weaviate. Like write, read consistency is tunable, to ONE, QUORUM or ALL.

> 💡With v1.17, read consistency is tunable only for Get-Objects-By-ID type requests. All read requests (including searches) will be added in v1.18. Read requests other than Get-Objects-By-ID has a read consistency of ALL.

Possible Read Consistency levels are:
* **ONE** - a read response must be returned by at least one replica. This is the fastest (most available), but least consistent option. 
* **QUORUM** - a response must be returned by QUORUM amount of replica nodes. QUORUM is calculated by _n / 2 + 1_, where _n_ is the number of replicas (replication factor). For example, using a replication factor of 6, the quorum is 4, which means the cluster can tolerate 2 replicas down.
* **ALL** - a read response must be returned by all replicas. The read operation will fail if at least one replica fails to respond. This is the most consistent, but 'slowest' (least available) option.

Examples:
* **ONE** \
  In a single datacenter with a replication factor of 3 and a read consistency level of ONE, the coordinator node will wait for a response from one replica node.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ONE.png" alt="Write consistency ONE" width="60%"/></p>

* **QUORUM** \
  In a single datacenter with a replication factor of 3 and a read consistency level of QUORUM, the coordinator node will wait for n / 2 + 1 = 3 / 2 + 1 = 2 replicas nodes to return a response.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-QUORUM.png" alt="Write consistency QUORUM" width="60%"/></p>


* **ALL** \
  In a single datacenter with a replication factor of 3 and a read consistency level of level of ALL, the coordinator node will wait for all 3 replicas nodes to return a response.

  <p align="center"><img src="/img/docs/replication-architecture/replication-rf3-c-ALL.png" alt="Write consistency ALL" width="60%"/></p>

  
## Repairs

Repairs can be executed by Weaviate in case of a discovered inconsistency. A scenario where a repair could be necessary is the following: The user writes with a consistency level of ONE. The node dies before it can contact some of the other nodes. The node comes back up with the latest data. Some other nodes may now be out of sync and need to be repaired.

Repairs can happen in the background, for example when a read operation is done. Repairs (and more information about them) will be available from v1.18 (Q1 2023).




## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
