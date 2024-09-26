---
title: Manage resource costs
sidebar_position: 20
image: og/wcs/user_guides.jpg
---

Weaviate Cloud provides flexible resource management features that let you balance system performance and system resource costs. This page discusses configuration strategies to help you to get the most value from Weaviate Cloud.

## Indexes

Weaviate is a vector database. Its purpose is to manage collections of vectors, potentially very large collections of vectors. Most objects in Weaviate collections have one or more vectors; collections can have millions of objects; individual vectors can have thousands of dimensions. This adds up to a lot of storage.

Weaviate uses vector indexes to search collections efficiently. Indexes dramatically improve search, but they also increase storage requirements.

The default vector index in Weaviate Cloud is a [Hierarchical Navigable Small World (HNSW) index](/developers/weaviate/concepts/vector-index#hierarchical-navigable-small-world-hnsw-index). HNSW is an in memory index. The index is held in RAM memory along with the underlying vectors in the collection. The memory costs for a large collection can add up quickly.

### Vector index alternatives

Weaviate offers these vector index alternatives:

- [HNSW indexes](/developers/weaviate/starter-guides/managing-resources/indexing#hnsw-indexes). HNSW indexes are in-memory indexes that enable fast searching even with very large data sets.
- [Flat indexes](/developers/weaviate/starter-guides/managing-resources/indexing#flat-indexes). Flat indexes are disk-based indexes that work best with small data sets.
- [Dynamic indexes](/developers/weaviate/starter-guides/managing-resources/indexing#dynamic-indexes). Dynamic indexes are a configuration option that converts a flat index to an HNSW index at a threshold object count.

Weaviate Cloud costs are based on usage. More expensive resources, like RAM, incur more cost than cheaper resources, like disk or offline storage. If you don't need the precision and [control of an HNSW index](/developers/weaviate/config-refs/schema/vector-index#hnsw-indexes), consider using a flat index to shift resource costs.

If your application is multi-tenanted, consider [configuring a dynamic index](/developers/weaviate/manage-data/collections#set-vector-index-type) for your tenants. Smaller tenant indexes are flat, and stored on disk. Larger tenants are stored in RAM as HNSW indexes, but the overall cost is lower.

### Inverted indexes

Weaviate uses inverted indexes for filtering and keyword searches. Compared to vector indexes, inverted indexes aren't a major component of Cloud resource costs. However, inverted indexes do use some resources. [Turn off](/developers/weaviate/manage-data/collections#property-level-settings) unused indexes to save disk space.

- If you never search or filter on a property, turn off `invertedFilterable` and `invertedSearchable` indexing.
- If you only filter on a property occasionally, turn off `invertedFilterable` indexing. The property is still filterable, just less efficiently.

## Compression

Compression is the most effective way to reduce costs in Weaviate Cloud. Quantization algorithms are methods that make different trade-offs to reduce the size of vectors. Weaviate supports these methods:

- [PQ](/developers/weaviate/configuration/compression/pq-compression) is the most configurable method. It gives you the most control to adjust compression rates and recall. PQ compressed vectors typically use significantly less memory than uncompressed vectors.
- [SQ](/developers/weaviate/configuration/compression/sq-compression) uses a bucketing approach to normalize data. SQ compressed vectors use 75% less memory than uncompressed vectors.
- [BQ](/developers/weaviate/configuration/compression/bq-compression) reduces vector dimension float values to bits. BQ compressed vectors use 97% less memory than uncompressed vectors.

These compression algorithms have different functional tradeoffs, but they all help to control costs the same way. They reduce the size of the vectors so the indexes are smaller. Smaller indexes need less hosting resources so you spend less money.

HNSW indexes store vectors in RAM and on disk. Compressed indexes use much less RAM when they are loaded into memory. Weaviate stores the uncompressed vector and the compressed vector index on disk, so the cost of disk storage goes up slightly. However, since the cost of RAM is orders of magnitude higher than the cost of disk, the overall cost to use a compressed index is much lower than the cost of using an uncompressed index.

Flat indexes use an [in-memory cache](/developers/weaviate/config-refs/schema/vector-index#flat-indexes) to improve response time for common queries. Enable BQ to shrink the size of the objects in the cache and lower RAM usage.

### Price calculator

The Weaviate Cloud [pricing calculator](https://weaviate.io/pricing) demonstrates the savings with compressed indexes.

To use the calculator, enter the number of objects in your collection and the dimensionality of each object. Under `Storage Type`, select "Compression". Compare the costs for "Performance" and for "Compression."

## Tenant states

Multi-tenant applications often have active and inactive tenants. Inactive tenants continue to use system resources. If you are an enterprise customer, it is possible to offload inactive tenants to low-cost, Amazon S3 storage. For pricing and configuration details, [contact support](mailto:support@weaviate.io).

## High availability

Production systems have stringent uptime and resiliency requirements. [High availability (HA)](/developers/weaviate/concepts/replication-architecture/motivation#high-availability-redundancy) clusters help you meet these requirements.

In Weaviate Cloud highly available clusters are three times as expensive as standalone clusters. The extra cost is due to replication. HA clusters use more resources so they cost correspondingly more.

To lower the cost of an HA cluster, choose an appropriate index for your workload and enable compression. An HA system with compression enabled is about 1/3 the price of a similar standalone system that doesn't use compression.

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />

import CustomScriptLoader from '/src/components/scriptSwitch';

<CustomScriptLoader/>
