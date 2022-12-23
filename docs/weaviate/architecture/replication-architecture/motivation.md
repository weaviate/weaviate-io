---
title: Use Cases (Motivation)
sidebar_position: 1
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

On this page you will find four use cases which motivate replication for Weaviate. Each of them serve a different purpose and, as a result, may require different configuration.

## High Availability (Redundancy)
High availability of a database means that the database is designed to operate continuously without service interruptions. That means that the database system should be tolerant to failures and errors, which should be handled automatically. This is solved by replication, where redundant nodes can handle requests when other nodes fail. Within a distributed database structure, read or write queries may still be available when a node goes down, so single point of failures are eliminated. Users' queries will be automatically (unnoticeably) redirected to an available replica node. 

Since Weaviate has a strongly consistent schema, all nodes are needed for a schema operation. When one or more nodes are down, schema operations are temporarily not possible.

Examples of applications where High Availability is desired are emergency services are enterprise IT systems, social media and website search. Nowadays, users are used to highly available applications, so they expect little to no downtime. For e.g. website search, service (read queries) should not be interrupted if a node goes down. In that case, if writing is temporarily unavailable, it is acceptable and in the worst case scenario the site search will be stale, but still available for read requests.

<p align="center"><img src="/img/docs/replication-architecture/replication-high-availability.png" alt="High Availability" width="75%"/></p>


High Availability can be illustrated by the following configuration examples:
1. Write ALL, Read ONE - There is no High Availability during writing because ALL nodes need to respond to write requests. There is High Availability on read requests, all nodes can go down except one while reading and the read operations are still available.
2. Write QUORUM, Read QUORUM (n/2+1) - A minority of nodes could go down, the majority of nodes should be up and running, and you can still do both reading and writing. 
3. Write ONE, Read ONE - This is the most available configuration. All but one node can go down and both read and write operations are still possible. Note that this super High Availability comes with a cost of Low Consistency guarantees. Due to eventual consistency, your application must be able to deal with temporarily showing out-of-date data.


## Increased (Read) Throughput
When you have many read requests on your Weaviate instance, for example because you're building an application for many users, the database setup should be able to support high throughput. Throughput is measured in Queries Per Second (QPS). Adding extra server nodes to your database setup means that the throughput scales with it. The more server nodes, the more users (read operations) the system will be able to handle. Thus, replicating your Weaviate instance increases throughput. 

When reading is set to a low consistency level (e.g. ONE), then scaling the replication factor (i.e. how many database server nodes) increases the throughput linearly. For example, when the read consistency level is ONE, if one node can reach 10.000 QPS, then a setup with 3 replica nodes can receive 30.000 QPS.

<p align="center"><img src="/img/docs/replication-architecture/replication-increased-throughput.png" alt="Increased Throughput" width="75%"/></p>


## Zero Downtime Upgrades

Without replication, there is a window of downtime when you update a Weaviate instance. The single node needs to stop, update and restart before it's ready to serve again. With replication, upgrades are done using a rolling update, in which at most one node is unavailable at the same time while the other nodes can still serve traffic.

As an example, consider you're updating the Weaviate version of instance from v1.19 to v1.20. Without replication there is a window of downtime:
1. Node is ready to serve traffic
2. Node is stopped, no requests can be served
3. Node image is replaced with newer version
4. Node is restarted
5. Node takes time to be ready
6. Node is ready to serve traffic. 

From step 2 until step 6 the Weaviate server cannot receive and respond to any requests. This leads to bad user experience. 

With replication (e.g. replication factor of 3), upgrades to the Weaviate version are done using a rolling update. At most one node will be unavailable at the same time, so all other nodes can still serve traffic.
1. 3 nodes ready to serve traffic
2. node 1 being replaced, nodes 2,3 can serve traffic
3. node 2 being replaced, nodes 1,3 can serve traffic
4. node 3 being replaced, nodes 1,2 can serve traffic

<p align="center"><img src="/img/docs/replication-architecture/replication-zero-downtime.gif" alt="Zero downtime upgrades" width="75%"/></p>


## Regional Proximity

When users are located in different regional areas (e.g. Iceland and Australia as extreme examples), you cannot ensure low latency for all users due to the physical distance between the database server and the users. You can only place the database server at one geographical location, so the question arises where you put the server:
1. Option 1 - Put the cluster in the middle (e.g. India). \
   All users will have relatively high latency, since data needs to travel between Iceland and India, and Australia and India.

    <p align="center"><img src="/img/docs/replication-architecture/replication-regional-proximity-1.png" alt="Cluster in the geographical middle" width="75%"/></p>

2. Option 2 - Put the cluster close to one user group (e.g. Iceland) \
   Users from Iceland have very low latency while users from Australia experience relatively high latency since data needs to travel a long distance.

   Another option arises when you have the option to replicate your data cluster to two different geographical locations. This is called Multi-Datacenter (Multi-DC) replication.
3. Option 3 - Multi-DC replication with server clusters in both Iceland and Australia. \
   Users from both Iceland and Australia now both experience low latency, because each user groups are served from local clusters. 

    <p align="center"><img src="/img/docs/replication-architecture/replication-regional-proximity-3.png" alt="Replication multi-dc" width="75%"/></p>

Multi-DC replication also comes with the additional benefit that data is redundant on more physical locations, which means that in the rare case of an entire datacenter going down, data can still be served from another location.

> 💡 Note, Regional Proximity depends on the Multi-Datacenter feature of replication, which is not implemented yet in Weaviate versions v1.17 and v1.18.




## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
