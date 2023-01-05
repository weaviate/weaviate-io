---
title: Philosophy
sidebar_position: 2
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

## A design modeled after how our users use Weaviate

The architecture that guides the principles for Weaviate’s replication systems is modeled after how users typically use Weaviate. Weaviate powers site-search, recommendation, knowledge extraction, and other information retrieval cases. These cases all have a few things in common:
* They are often **very-large-scale** (with datasets in the billions of objects and vectors)
* They often incur **large parallel usage with strict latency requirements** (i.e. high throughput with low p99 latencies)
* It is vital that the service is **highly-available** and resilient to unplanned outages or planned maintenance, such as version upgrades.
* It is often tolerable if data is temporarily out of sync, as long as **consistency is reached eventually**. 
* Weaviate is sometimes used alongside strongly consistent, transactional databases if transactional data exists in a use case. In cases where Weaviate is used as the primary database, data is typically not transactional.
* Weaviate’s users have a lot of experience working with cloud-native technologies, including NoSQL databases, and know how an application needs to be structured to deal with eventually consistent systems correctly.

Based on the above usage patterns, and keeping the [CAP theorem](./index.html#cap-theorem) trade-offs in mind, Weaviate’s replication architecture **prefers availability over consistency**. Nevertheless, individual requests might have stricter consistency requirements than others. For those cases, Weaviate offers both [tunable read and write consistency](./consistency.html).


## Reasons for a leaderless architecture

Weaviate’s replication architecture is inspired by other modern, internet-scale databases that serve similar goals; [Apache Cassandra](https://cassandra.apache.org/_/index.html) is a notable example. Weaviate’s [Replication Architecture](./cluster-architecture.html) has significant similarities to Cassandra's. Unsurprisingly, a leaderless pattern was chosen to achieve both availability and throughput goals. In a leaderful setup, leader nodes have two significant disadvantages: Firstly, leaders become a performance bottleneck, e.g., because every write request needs to pass through the leader. Secondly, a leader's failure involves the election of a new leader, which can be a complex and costly process that can lead to temporary unavailability. The main advantage of a leaderful system is that it may be easier to provide specific consistency guarantees. As outlined in the motivation above, Weaviate prefers large-scale use cases, linear scaling, and availability over strict consistency.

## Gradual rollout

As with many of Weaviate features, Replication is rolled out in multiple phases. This does not mean that the first release with replication is to be considered incomplete. But instead it means that Replication is an umbrella term that accompanies many features that work together to achieve the various goals of replication. The most significant of those are contained in the first release (v1.17), but some may only follow in subsequent releases, such as v1.18 and v1.19. 

The motivation behind this phased roll-out is two-fold; First, not everyone has the same requirements, and the feature set included in the first release is sufficient for many use cases. You can use the [Replication Roadmap](./index.html#roadmap) section to make an informed decision. Secondly, your feedback and learning about your needs are extremely valuable to guide the future releases of features. By releasing early and often, we can reduce the time to get valuable feedback.


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
