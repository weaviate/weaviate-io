---
title: Philosophy
sidebar_position: 2
image: og/docs/concepts.jpg
# tags: ['architecture']
---

## A design modeled after how our users use Weaviate

The architecture that guides the principles for Weaviate’s replication systems is modeled after how users typically use Weaviate. Weaviate powers site search, recommendation, knowledge extraction, and other information retrieval cases. These cases all have a few things in common:
* They are often **very-large-scale** (with datasets in the billions of objects and vectors)
* They often incur **large parallel usage with strict latency requirements** (i.e. high throughput with low p99 latencies)
* It is vital that the service is **highly-available** and resilient to unplanned outages or planned maintenance, such as version upgrades.
* It is often tolerable if data is temporarily out of sync, as long as **consistency is reached eventually**.
* Weaviate is sometimes used alongside strongly consistent, transactional databases if transactional data exists in a use case. In cases where Weaviate is used as the primary database, data is typically not transactional.
* Weaviate’s users have a lot of experience working with cloud-native technologies, including NoSQL databases, and know how an application needs to be structured to deal with eventually consistent systems correctly.

Based on the above usage patterns, and keeping the [CAP theorem](./index.md#cap-theorem) trade-offs in mind, Weaviate implements two different architectures for schema and data replication.

1. **Schema replication** is based on the [Raft consensus algorithm](https://raft.github.io/), which provides strong consistency. This means that schema changes are consistent across the cluster, even in the event of (a minority of) node failures. Schema operations are considered critical, so Weaviate has a strongly consistent schema.

2. **Data replication** is based on a leaderless design with tunable consistency. This means there is no central leader or primary node that will replicate to follower nodes. Weaviate’s data replication architecture **prefers availability over consistency**. Nevertheless, individual requests might have stricter consistency requirements than others. For those cases, Weaviate offers both [tunable read and write consistency](./consistency.md).

## Reasons for a leaderless architecture

Weaviate’s replication architecture is inspired by other modern, Internet-scale databases that serve similar goals; [Apache Cassandra](https://cassandra.apache.org/_/index.html) is a notable example. Weaviate’s [Replication Architecture](./cluster-architecture.md) has significant similarities to Cassandra's. Unsurprisingly, a leaderless pattern was chosen to achieve both availability and throughput goals. In a leaderful setup, leader nodes have two significant disadvantages: Firstly, leaders become a performance bottleneck, e.g., because every write request needs to pass through the leader. Secondly, a leader's failure involves the election of a new leader, which can be a complex and costly process that can lead to temporary unavailability. The main advantage of a leaderful system is that it may be easier to provide specific consistency guarantees. As outlined in the motivation above, Weaviate prefers large-scale use cases, linear scaling, and availability over strict consistency.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
